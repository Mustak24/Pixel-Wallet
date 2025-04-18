import { MMKV } from "react-native-mmkv";
import idCreator from "../idCreator";

const Storage = new MMKV({id: 'app'});


type AccountModalProps = {
    name: string,
    balance: number,
    backgroundColor: string,
}

class AccountModal{
    name: string;
    balance: number;
    backgroundColor: string;
    id: string;

    constructor({name, balance, backgroundColor, id}: AccountModalProps & {id: string}){
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
        let accounts: AccountModal[] = JSON.parse(Storage.getString('Accounrs') || '[]');
        for(let i=0; i<accounts.length; i++) {
            if(accounts[i].id == this.id) {
                accounts[i] = this;
                Storage.set('Accounts', JSON.stringify(accounts));
                return true;
            }
        }
        return false
    }

    static createId(): string{
        let accounts: AccountModal[] = JSON.parse(Storage.getString('Accounrs') || '[]');
        
        let id: string = idCreator();

        for(let acc of accounts) 
            if(acc.id == id) return AccountModal.createId();

        return id;
    }

    static create({name, balance, backgroundColor}: AccountModalProps): AccountModal | undefined {
        let id: string = AccountModal.createId();
        let acc: AccountModal = new AccountModal({name, balance, backgroundColor, id});
        let accounts: AccountModal[] = JSON.parse(Storage.getString('Accounts') || '[]');
        accounts.push(acc);

        Storage.set('Accounts', JSON.stringify(accounts));
        return acc;
    }

    static getAll(): AccountModal[] {
        return JSON.parse(Storage.getString('Accounts') || '[]');
    }

    static getAllId(): string[] {
        let accounts: AccountModal[] = AccountModal.getAll();
        
        let res: string[] = [];
        for(let {id} of accounts) res.push(id);
       
        return res
    }

    static findById(id: string): AccountModal | undefined {
        let accounts: AccountModal[] = JSON.parse(Storage.getString('Accounts') || '[]');
        for(let acc of accounts){
            if(acc.id == id){ 
                return new AccountModal(acc);
            }
        }
    }
}

export default AccountModal