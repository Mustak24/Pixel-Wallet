import { MMKV } from "react-native-mmkv";
import idCreator from "../idCreator";
import AccountModal from "./AccountModal";

const Storage = new MMKV({id: 'Transitions'});


export type createOnType = {
    year: number,
    month: number,
    date: number,
    hour: number,
    minute: number
}

type CreateProps = {
    mode: 'income' | 'expenses' | 'transfer',
    fromAccountId: string,
    amount: number,
    title?: string,
    description?: string,
    createOn: createOnType,
    toAccountId?: string,
}

type TransitionModalProps = CreateProps & {id: string}

export default class TransitionModal{
    mode: 'income' | 'expenses' | 'transfer';
    fromAccountId: string;
    amount: number;
    id: string;
    title: string;
    description: string;
    createOn: createOnType;
    toAccountId: string;

    constructor({mode, fromAccountId, amount, title='', description='', id, createOn, toAccountId=''}: TransitionModalProps) {
        this.id = id;
        this.mode = mode;
        this.fromAccountId = fromAccountId;
        this.amount = amount;
        this.title = title;
        this.description = description;
        this.createOn = createOn;
        this.toAccountId = toAccountId;
    }

    static createId(): string {
        let keys: string[] = Storage.getAllKeys();
        
        let id: string = idCreator();
        for(let key of keys) if(key == id) return TransitionModal.createId();

        return id;
    }

    static create({mode, fromAccountId, amount, title, description, createOn, toAccountId}: CreateProps): TransitionModal {

        let id: string = TransitionModal.createId();
        let transiton = new TransitionModal({mode, fromAccountId, amount, title, description, id, createOn, toAccountId});

        Storage.set(id, JSON.stringify(transiton));

        let account = AccountModal.findById(fromAccountId);
        if(!account) return transiton;

        if(mode == 'income') account?.addBalance(amount);
        else if (mode == 'expenses') account?.subBalance(amount);
        else if (mode == 'transfer' && toAccountId) {
            account?.subBalance(amount);
            let toAccount = AccountModal.findById(toAccountId);

            if(!toAccount) return transiton;
            toAccount.addBalance(amount);
            toAccount.save();
        }
        account?.save();

        return transiton;
    }

    static getAll(): TransitionModal[] {
        let keys: string[] = Storage.getAllKeys();
        let transitions: TransitionModal[] = [];
        for(let key of keys) {
            let transition = Storage.getString(key);
            if(transition) {
                transitions.push(new TransitionModal(JSON.parse(transition)));
            }
        }
        return transitions;
    }
    
    static getAllId(): string[] {
        return Storage.getAllKeys();
    }

    static findById(id: string): TransitionModal | null {
        if(!Storage.contains(id)) return null;
        let transition = Storage.getString(id);
        return transition ? new TransitionModal(JSON.parse(transition)) : null;
    }


    static findByDate(month: number, year?: number): TransitionModal[] {
        if(!month || !year) {
            let date = new Date();
            month ??= date.getMonth();
            year ??= date.getFullYear();
        }

        let transitions: TransitionModal[] = TransitionModal.getAll();
        transitions = transitions.filter(transition => {
            return transition.createOn.month == month && transition.createOn.year == year;
        });

        return transitions.sort((a, b) => {
            let dateA: number = Number(a.createOn.date);
            let timea: number = a.createOn.hour * 60 + a.createOn.minute;

            let dateB: number = Number(b.createOn.date);
            let timeB: number = b.createOn.hour * 60 + b.createOn.minute;

            return (dateB - dateA) || (timeB - timea);
        });
    }

    static getRecordByDate(month: number, year?: number): {income: number, expenses: number} {
        if(!month || !year) {
            let date: Date = new Date();
            month ??= date.getMonth();
            year ??= date.getFullYear();
        }

        let transitions: TransitionModal[] = TransitionModal.findByDate(month, year);
        let record: {income: number, expenses: number} = {income: 0, expenses: 0};

        for(let transition of transitions) {
            if(transition.mode == 'income') record.income += transition.amount;
            else if(transition.mode == 'expenses') record.expenses += transition.amount;
        }

        return record;
    }

    static deleteById(id: string): TransitionModal | null {
        let transiton = TransitionModal.findById(id);
        if(!transiton) return null;

        Storage.delete(id);

        let fromAccount = AccountModal.findById(transiton.fromAccountId);
        if(!fromAccount) return transiton;

        if(transiton.mode == 'income') fromAccount?.subBalance(transiton.amount);
        else if (transiton.mode == 'expenses') fromAccount?.addBalance(transiton.amount);
        else if (transiton.mode == 'transfer' && transiton.toAccountId) {
            let toAccount = AccountModal.findById(transiton.toAccountId);
            if(!toAccount) return transiton;

            fromAccount?.addBalance(transiton.amount);
            toAccount.subBalance(transiton.amount);
            toAccount?.save();
        }
        fromAccount?.save();

        return transiton;
    }
}