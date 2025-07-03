import * as fs from 'fs';
import * as Papa from 'papaparse';
const moment = require('moment');
import { User } from "./user"
import { Transaction } from "./transaction"


type csvData = {
    date: Date;
    from: string;
    to: string;
    narrative:string;
    amount: number;
}

function hasEntry(array, newEntry, comparator) {
  return array.find(existingEntry => comparator(existingEntry, newEntry)) !== undefined;
}

export function readFromFiles(file:string, users:User[], usernames:string[], transactions:Transaction[]){
    file = fs.readFileSync(file, 'utf8');
     
    const parsed = Papa.parse<csvData>(file, {
      delimiter: ',',
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
    });

    const { data } = parsed;

    for (let index = 0; index < data.length; index++) {
        let userFrom = new User();
        userFrom.name = data[index]?.['From'];
        const itContains = hasEntry(users, userFrom, (a, b) => a.name === b.name);
        if(!itContains){
            users.push(userFrom);
            usernames.push(userFrom.name);
        }
    
        let userTo = new User();
        userTo.name = data[index]?.['From'];
        const itContains2 = hasEntry(users, userTo, (a, b) => a.name === b.name);
        if(!itContains2){
            users.push(userTo);
            usernames.push(userTo.name);
        }
    }
    
    for (let index = 0; index < data.length; index++) {
        let transaction = new Transaction();
        transaction.date = data[index]?.['Date'];
        transaction.from = data[index]?.['From'];
        transaction.to = data[index]?.['To'];
        transaction.narrative = data[index]?.['Narrative'];
        transaction.amount = data[index]?.['Amount'];
        transactions.push(transaction);
    
        let toIndex: number = users.findIndex(
            (user: User) => user.name === transaction.to
        );
        users[toIndex].moneyOwned += transaction.amount;
        users[toIndex].transactions.push(transaction);
        
        let fromIndex: number = users.findIndex(
            (user: User) => user.name === transaction.from
        );
        users[fromIndex].moneyOwed += transaction.amount;
        users[fromIndex].transactions.push(transaction);
    }

}