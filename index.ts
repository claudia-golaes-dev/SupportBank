import * as fs from 'fs';
import * as Papa from 'papaparse';
const moment = require('moment');


function listAll(users: User[]){
    console.log("Name       Money Ownwed    Money Owed");
    console.log("-------------------------------------");
    for (let index = 0; index < users.length; index++) {
        console.log(users[index].name + '           ' + users[index].moneyOwned + '         ' + users[index].moneyOwed);
    }
}

function hasEntry(array, newEntry, comparator) {
  return array.find(existingEntry => comparator(existingEntry, newEntry)) !== undefined;
}

function listAccount(acc: number){
    console.log('Name: '+ users[acc].name);
    console.log('Transactions');
    console.log("Date       From        To      Narrative        Amount");
    console.log("------------------------------------------------------");
    for (let index = 0; index < users[acc].transactions.length; index++) {
        let transaction = new Transaction();
        transaction = users[acc].transactions[index];
        console.log(transaction.date+'       '+ transaction.from+'        '+transaction.to+'      '+transaction.narrative+'        '+transaction.amount);
    }
}

class User{
    name: string;
    moneyOwned: number = 0;
    moneyOwed: number = 0;
    transactions: Transaction[] = [];
}

class Transaction{
    date: Date;
    from: string;
    to: string;
    narrative: string;
    amount: number;
}

type csvData = {
    date: Date;
    from: string;
    to: string;
    narrative:string;
    amount: number;
}

const file = fs.readFileSync('./Transactions2014.csv', 'utf8');
 
const parsed = Papa.parse<csvData>(file, {
  delimiter: ',',
  dynamicTyping: true,
  header: true,
  skipEmptyLines: true,
});
 
const { data } = parsed;
console.log(data.length);
console.log(data);

var readlineSync = require('readline-sync');

let users: User[] = [];
let usernames: string[] = [];
let transactions: Transaction[] = [];
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

    console.log('toIndex: ' + toIndex);
    users[toIndex].moneyOwned += transaction.amount;
    users[toIndex].transactions.push(transaction);
    let fromIndex: number = users.findIndex(
        (user: User) => user.name === transaction.from
    );
    console.log('fromIndex: ' + fromIndex);
    users[fromIndex].moneyOwed += transaction.amount;
    users[fromIndex].transactions.push(transaction);
}


let options: string[] = ['List All', 'List Account'];

let choice: number = readlineSync.keyInSelect(options, 'Which option would you like?');
choice += 1;

if(choice == 1){
    listAll(users);
} else if(choice == 2){
    let q2: string = readlineSync.keyInSelect(usernames, 'Which account would you like to list?');
    switch(q2){
        case 'a':
            q2 = '10';
            break;
        case 'b':
            q2 = '11';
            break;
        case 'c':
            q2 = '12';
            break;
    }
    listAccount(Number(q2));
}
