import { MMKV } from "react-native-mmkv";
import idCreator from "../idCreator";
import TransitionModal from "./TransitionModal";

const Storage = new MMKV({id: 'Accounts'});


type CreateProps = {
    name: string,
    balance: number,
    backgroundColor: string,
}

type AccountModalProps = CreateProps & {
    id: string,
    createOn: number
}

class AccountModal {
    name: string;
    balance: number;
    backgroundColor: string;
    id: string;
    createOn: number;

    constructor({name, balance, backgroundColor, id, createOn}: AccountModalProps){
        this.name = name;
        this.balance = balance;
        this.backgroundColor = backgroundColor;
        this.id = id;
        this.createOn = createOn;
    }

    getIncomeThisMonth(): number {
        let transitons: TransitionModal[] = TransitionModal.findByDate(new Date().getMonth());
        let income: number = 0;
        for(let transiton of transitons) {
            if(transiton.accountId == this.id && transiton.mode == 'income') 
                income += transiton.amount;
        }
        return income;
    }

    getExpensesThisMonth(): number {
        let transitons: TransitionModal[] = TransitionModal.findByDate(new Date().getMonth());
        let expenses: number = 0;
        for(let transiton of transitons) {
            if(transiton.accountId == this.id && transiton.mode == 'expenses') 
                expenses += transiton.amount;
        }
        return expenses;
    }

    addBalance(amount: number): AccountModal {
        this.balance += amount;
        return this;
    }

    subBalance(amount: number): AccountModal {
        this.balance -= amount;
        return this;
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

    static createId(): string{
        let keys: string[] = Storage.getAllKeys();

        let id: string = idCreator();
        for(let key of keys)  if(key == id) return AccountModal.createId();

        return id;
    }

    static create({name, balance, backgroundColor}: CreateProps): AccountModal {
        let id: string = AccountModal.createId();
        let createOn = Date.now();
        let acc: AccountModal = new AccountModal({name, balance, backgroundColor, id, createOn});

        Storage.set(id, JSON.stringify(acc));
        return acc;
    }

    static getAll(): AccountModal[] {
        let keys: string[] = Storage.getAllKeys();
        return keys.map( key => {
           return new AccountModal(JSON.parse(Storage.getString(key) || '{}'));
        }).sort((a, b) => a.createOn - b.createOn);
    }

    static getAllId(): string[] {
        return Storage.getAllKeys();
    }

    static findById(id: string): AccountModal | null {
        let acc = JSON.parse(Storage.getString(id) || '{}') ?? null;
        return acc ? new AccountModal(acc) : null;
    }

    static deleteById(id: string): AccountModalProps | null {
        if(!Storage.contains(id)) return null;

        let account: AccountModalProps = JSON.parse(Storage.getString(id) || '{}');
        Storage.delete(id);
        return account;
    }

    static getTotalBalance(): number {
        let accounts: AccountModal[] = AccountModal.getAll();
        let total: number = 0;
        for(let account of accounts) total += account.balance;
        return total;
    }

}

export default AccountModal