import Storage from "../Storage";

class Account{
    constructor({name, balance, backgroundColor}){
        this.name = name;
        this.balance = balance;
        this.backgroundColor = backgroundColor;

        this.id = '';
        for(let i=0; i<25; i++){
            this.id += String.fromCharCode(Math.floor(Math.random() * 150) + 1);
        }

        this.incomeThisMounth = 0;
        this.expensesThisMounth = 0;
    }

    static create({name, balance, backgroundColor}){
        return new Account({name, balance, backgroundColor});
    }

    save(){
        let accounts = JSON.parse(Storage.getString('Accounts'));
        
        for(let i=0; i<accounts.length; i++){
            if(accounts[i].id == this.id) {
                accounts[i] = this;
                Storage.set('Accounts', JSON.stringify(accounts));
                return;
            }
        }

        accounts.push(this);
        Storage.set('Accounts', JSON.stringify(accounts));
    }

    static getAll(){
        return JSON.parse(Storage.getString('Accounts'));
    }

    static getById(id){
        let data = JSON.parse(Storage.getString('Accounts'));
       
        for(let transition of data){
            if(transition.id == id) return transition;
        }

        return {}
    }
}