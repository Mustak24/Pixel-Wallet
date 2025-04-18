import { MMKV } from "react-native-mmkv";
import idCreator from "../idCreator";
import AccountModal from "./AccountModal";

const Storage = new MMKV({id: 'app'});

type TransitionModalProps = {
    mode: 'income' | 'expenses' | 'transfer',
    accountId: string,
    amount: number,
    date: string,
    time: string,
    title?: string,
    description?: string
}

// const mounths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default class TransitionModal{
    mode: 'income' | 'expenses' | 'transfer';
    accountId: string;
    amount: number;
    date: string;
    time: string;
    id: string;
    title: string;
    description: string

    constructor({mode, accountId, amount, date, time, title='', description='', id}: TransitionModalProps & {id: string}) {
        this.id = id;
        this.mode = mode;
        this.accountId = accountId;
        this.amount = amount;
        this.date = date;
        this.time = time;
        this.title = title;
        this.description = description;
    }

    static createId(): string {
        let transitions: TransitionModal[] = JSON.parse(Storage.getString('Accounrs') || '[]');
        
        let transitionId: string = idCreator();

        for(let {id} of transitions) 
            if(transitionId == id) return TransitionModal.createId();

        return transitionId;
    }

    static create({mode, accountId, amount, date, time, title, description}: TransitionModalProps): TransitionModal | undefined {

        let id: string = TransitionModal.createId();
        let transiton = new TransitionModal({mode, accountId, amount, date, time, title, description, id});
        let transitions = JSON.parse(Storage.getString("Transitions") || '[]');
        transitions.push(transiton);

        Storage.set('Transitions', JSON.stringify(transitions));

        let account = AccountModal.findById(accountId);
        if(mode == 'income') account?.addBalance(amount);
        else if (mode == 'expenses') account?.subBalance(amount);
        account?.save();

        return transiton;
    }

    static getAll(): TransitionModal[] {
        return JSON.parse(Storage.getString("Transitions") || '[]');
    }
    
    static getAllId(): string[] {
        let transitions = TransitionModal.getAll();
        
        let res: string[] = [];
        for(let {id} of transitions) res.push(id);

        return res
    }

    static findeById(id: string) {
        let transitions: TransitionModal[] = JSON.parse(Storage.getString('Transitions') || '[]');
        for(let transition of transitions){
            if(transition.id == id){ 
                return new TransitionModal(transition);
            }
        }
    }
}