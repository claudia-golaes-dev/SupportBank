import * as fs from 'fs';
import * as Papa from 'papaparse';
import { User } from "./user"
import { Transaction } from "./transaction"
import { readFromFiles as readFiles } from "./parser"
const moment = require('moment');
var log4js = require("log4js");
var readlineSync = require('readline-sync');


const logger = log4js.getLogger('<filename>');


log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

function listAll(users: User[]){
    console.log("Name       Money Ownwed    Money Owed");
    console.log("-------------------------------------");
    for (let index = 0; index < users.length; index++) {
        console.log(users[index].name + '           ' + users[index].moneyOwned + '         ' + users[index].moneyOwed);
    }
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

let users: User[] = [];
let usernames: string[] = [];
let transactions: Transaction[] = [];
let file:string = 'Transactions2014.csv';
readFiles(file, users, usernames, transactions);
file = 'DodgyTransactions2015.csv';
readFiles(file, users, usernames, transactions);


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
