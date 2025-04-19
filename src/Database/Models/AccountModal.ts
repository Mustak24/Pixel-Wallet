import { MMKV } from "react-native-mmkv";
import idCreator from "../idCreator";

const Storage = new MMKV({id: 'Accounts'});


type CreateProps = {
    name: string,
    balance: number,
    backgroundColor: string,
}

type AccountModalProps = CreateProps & {
    id: string,
}

class AccountModal {
    name: string;
    balance: number;
    backgroundColor: string;
    id: string;

    constructor({name, balance, backgroundColor, id}: AccountModalProps){
        this.name = name;
        this.balance = balance;
        this.backgroundColor = backgroundColor;
        this.id = id;
    }

    getIncomeThisMounth(): number {
        return 120
    }

    getExpensesThisMounth(): number {
        return 120
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
        let acc: AccountModal = new AccountModal({name, balance, backgroundColor, id});

        Storage.set(id, JSON.stringify(acc));
        return acc;
    }

    static getAll(): AccountModal[] {
        let keys: string[] = Storage.getAllKeys();
        return keys.map( key => {
           return new AccountModal(JSON.parse(Storage.getString(key) || '{}'));
        });
    }

    static getAllId(): string[] {
        return Storage.getAllKeys();
    }

    static findById(id: string): AccountModal | null {
        let acc = JSON.parse(Storage.getString(id) || '{}') ?? null;
        return acc ? new AccountModal(acc) : null;
    }

    static delete(id: string): AccountModalProps | null {
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