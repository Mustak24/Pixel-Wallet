import { MMKV } from "react-native-mmkv";
import idCreator from "../idCreator";
import AccountModal from "./AccountModal";

const Storage = new MMKV({id: 'Transactions'});


export type createOnType = {
    year: number,
    month: number,
    date: number,
    hour: number,
    minute: number
}

type CreateProps = {
    mode: 'income' | 'expense' | 'transfer',
    fromAccountId: string,
    amount: number,
    title: string,
    description: string,
    createOn: createOnType,
    toAccountId: string,
    category: string
}

type TransactionModalProps = CreateProps & {id: string}

export default class TransactionModal{
    mode: 'income' | 'expense' | 'transfer';
    fromAccountId: string;
    amount: number;
    id: string;
    title: string;
    description: string;
    createOn: createOnType;
    toAccountId: string;
    category: string;

    constructor({mode, fromAccountId, amount, title, description, id, createOn, toAccountId, category}: TransactionModalProps) {
        this.id = id;
        this.mode = mode;
        this.fromAccountId = fromAccountId;
        this.amount = amount;
        this.title = title;
        this.description = description;
        this.createOn = createOn;
        this.toAccountId = toAccountId;
        this.category = category;
    }

    save(): boolean {
        let keys: string[] = Storage.getAllKeys();
        
        for(let key of keys) {
            if(key == this.id) {
                Storage.set(this.id, JSON.stringify(this));
                return true;
            }
        }
        return false;
    }   

    static createId(): string {
        let keys: string[] = Storage.getAllKeys();
        
        let id: string = idCreator();
        for(let key of keys) if(key == id) return TransactionModal.createId();

        return id;
    }

    static create({mode, fromAccountId, amount, title, description, createOn, toAccountId, category}: CreateProps): TransactionModal {

        let id: string = TransactionModal.createId();
        let transiton = new TransactionModal({mode, fromAccountId, amount, title, description, id, createOn, toAccountId, category});

        Storage.set(id, JSON.stringify(transiton));

        let account = AccountModal.findById(fromAccountId);
        if(!account) return transiton;

        if(mode == 'income') account?.addBalance(amount);
        else if (mode == 'expense') account?.subBalance(amount);
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

    static getAll(): TransactionModal[] {
        let keys: string[] = Storage.getAllKeys();
        let transactions: TransactionModal[] = [];
        for(let key of keys) {
            let transaction = Storage.getString(key);
            if(transaction) {
                transactions.push(new TransactionModal(JSON.parse(transaction)));
            }
        }
        return transactions;
    }
    
    static getAllId(): string[] {
        return Storage.getAllKeys();
    }

    static findById(id: string): TransactionModal | null {
        if(!Storage.contains(id)) return null;
        let transaction = Storage.getString(id);
        return transaction ? new TransactionModal(JSON.parse(transaction)) : null;
    }


    static findByDate(month: number, year?: number): TransactionModal[] {
        if(!month || !year) {
            let date = new Date();
            month ??= date.getMonth();
            year ??= date.getFullYear();
        }

        let transactions: TransactionModal[] = TransactionModal.getAll();
        transactions = transactions.filter(transaction => {
            return transaction.createOn.month == month && transaction.createOn.year == year;
        });

        return transactions.sort((a, b) => {
            let dateA: number = Number(a.createOn.date);
            let timea: number = a.createOn.hour * 60 + a.createOn.minute;

            let dateB: number = Number(b.createOn.date);
            let timeB: number = b.createOn.hour * 60 + b.createOn.minute;

            return (dateB - dateA) || (timeB - timea);
        });
    }

    static getRecordByDate(month: number, year?: number): {income: number, expense: number} {
        if(!month || !year) {
            let date: Date = new Date();
            month ??= date.getMonth();
            year ??= date.getFullYear();
        }

        let transactions: TransactionModal[] = TransactionModal.findByDate(month, year);
        let record: {income: number, expense: number} = {income: 0, expense: 0};

        for(let transaction of transactions) {
            if(transaction.mode == 'income') record.income += transaction.amount;
            else if(transaction.mode == 'expense') record.expense += transaction.amount;
        }

        return record;
    }

    static deleteById(id: string): TransactionModal | null {
        let transiton = TransactionModal.findById(id);
        if(!transiton) return null;

        Storage.delete(id);

        let fromAccount = AccountModal.findById(transiton.fromAccountId);
        if(!fromAccount) return transiton;

        if(transiton.mode == 'income') fromAccount?.subBalance(transiton.amount);
        else if (transiton.mode == 'expense') fromAccount?.addBalance(transiton.amount);
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