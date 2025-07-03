"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transaction_1 = require("./transaction");
var parser_1 = require("./parser");
var moment = require('moment');
var log4js = require("log4js");
var readlineSync = require('readline-sync');
var logger = log4js.getLogger('<filename>');
log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug' }
    }
});
function listAll(users) {
    console.log("Name       Money Ownwed    Money Owed");
    console.log("-------------------------------------");
    for (var index = 0; index < users.length; index++) {
        console.log(users[index].name + '           ' + users[index].moneyOwned + '         ' + users[index].moneyOwed);
    }
}
function listAccount(acc) {
    console.log('Name: ' + users[acc].name);
    console.log('Transactions');
    console.log("Date       From        To      Narrative        Amount");
    console.log("------------------------------------------------------");
    for (var index = 0; index < users[acc].transactions.length; index++) {
        var transaction = new transaction_1.Transaction();
        transaction = users[acc].transactions[index];
        console.log(transaction.date + '       ' + transaction.from + '        ' + transaction.to + '      ' + transaction.narrative + '        ' + transaction.amount);
    }
}
var users = [];
var usernames = [];
var transactions = [];
var file = 'Transactions2014.csv';
(0, parser_1.readFromFiles)(file, users, usernames, transactions);
file = 'DodgyTransactions2015.csv';
(0, parser_1.readFromFiles)(file, users, usernames, transactions);
var options = ['List All', 'List Account'];
var choice = readlineSync.keyInSelect(options, 'Which option would you like?');
choice += 1;
if (choice == 1) {
    listAll(users);
}
else if (choice == 2) {
    var q2 = readlineSync.keyInSelect(usernames, 'Which account would you like to list?');
    switch (q2) {
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
