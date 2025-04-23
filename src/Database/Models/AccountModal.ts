import { MMKV } from "react-native-mmkv";
import idCreator from "../idCreator";
import TransitionModal from "./TransitionModal";
import { TransitionsStorage } from "../Storage";

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
            if(transiton.fromAccountId == this.id && transiton.mode == 'income') 
                income += transiton.amount;
        }
        return income;
    }

    getExpenseThisMonth(): number {
        let transitons: TransitionModal[] = TransitionModal.findByDate(new Date().getMonth());
        let expense: number = 0;
        for(let transiton of transitons) {
            if(transiton.fromAccountId == this.id && transiton.mode == 'expense') 
                expense += transiton.amount;
        }
        return expense;
    }

    getTransitionsRecord(): {income: TransitionModal[], expense: TransitionModal[]} {
        let transitons: TransitionModal[] = TransitionModal.getAll();
        let record: {income: TransitionModal[], expense: TransitionModal[]} = {income: [], expense: []};
        for(let transiton of transitons) {
            if(transiton.fromAccountId == this.id || transiton.toAccountId == this.id){
                if(transiton.mode == 'income') {
                    record.income.push(transiton);
                } else if(transiton.mode == 'expense') {
                    record.expense.push(transiton);
                } else if(transiton.mode == 'transfer') {
                    if(transiton.fromAccountId == this.id) {
                        record.expense.push(transiton)
                    } else if(transiton.toAccountId == this.id) {
                        record.income.push(transiton);
                    }
                }
            }
        }
        return record;
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
        let transitions: TransitionModal[] = TransitionModal.getAll().filter(tra => tra.fromAccountId == id || tra.toAccountId == id);
        
        for(let transition of transitions) {
            if(transition.mode == 'transfer') {
                let fromAccount = AccountModal.findById(transition.fromAccountId);
                let toAccount = AccountModal.findById(transition.toAccountId);

                if(fromAccount && fromAccount.id != id) {
                    fromAccount.addBalance(transition.amount);
                    fromAccount.save();
                }

                if(toAccount && toAccount.id != id){
                    toAccount.subBalance(transition.amount);
                    toAccount.save();
                }
            }
            
            TransitionsStorage.delete(transition.id)
        }

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