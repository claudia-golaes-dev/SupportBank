"use strict";
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Papa = require("papaparse");
var moment = require('moment');
function listAll(users) {
    console.log("Name       Money Ownwed    Money Owed");
    console.log("-------------------------------------");
    for (var index = 0; index < users.length; index++) {
        console.log(users[index].name + '           ' + users[index].moneyOwned + '         ' + users[index].moneyOwed);
    }
}
function hasEntry(array, newEntry, comparator) {
    return array.find(function (existingEntry) { return comparator(existingEntry, newEntry); }) !== undefined;
}
function listAccount(acc) {
    console.log('Name: ' + users[acc].name);
    console.log('Transactions');
    console.log("Date       From        To      Narrative        Amount");
    console.log("------------------------------------------------------");
    for (var index = 0; index < users[acc].transactions.length; index++) {
        var transaction = new Transaction();
        transaction = users[acc].transactions[index];
        console.log(transaction.date + '       ' + transaction.from + '        ' + transaction.to + '      ' + transaction.narrative + '        ' + transaction.amount);
    }
}
var User = /** @class */ (function () {
    function User() {
        this.moneyOwned = 0;
        this.moneyOwed = 0;
        this.transactions = [];
    }
    return User;
}());
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    return Transaction;
}());
var file = fs.readFileSync('./Transactions2014.csv', 'utf8');
var parsed = Papa.parse(file, {
    delimiter: ',',
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true,
});
var data = parsed.data;
console.log(data.length);
console.log(data);
var readlineSync = require('readline-sync');
var users = [];
var usernames = [];
var transactions = [];
for (var index = 0; index < data.length; index++) {
    var userFrom = new User();
    userFrom.name = (_a = data[index]) === null || _a === void 0 ? void 0 : _a['From'];
    var itContains = hasEntry(users, userFrom, function (a, b) { return a.name === b.name; });
    if (!itContains) {
        users.push(userFrom);
        usernames.push(userFrom.name);
    }
    var userTo = new User();
    userTo.name = (_b = data[index]) === null || _b === void 0 ? void 0 : _b['From'];
    var itContains2 = hasEntry(users, userTo, function (a, b) { return a.name === b.name; });
    if (!itContains2) {
        users.push(userTo);
        usernames.push(userTo.name);
    }
}
var _loop_1 = function (index) {
    var transaction = new Transaction();
    transaction.date = (_c = data[index]) === null || _c === void 0 ? void 0 : _c['Date'];
    transaction.from = (_d = data[index]) === null || _d === void 0 ? void 0 : _d['From'];
    transaction.to = (_e = data[index]) === null || _e === void 0 ? void 0 : _e['To'];
    transaction.narrative = (_f = data[index]) === null || _f === void 0 ? void 0 : _f['Narrative'];
    transaction.amount = (_g = data[index]) === null || _g === void 0 ? void 0 : _g['Amount'];
    transactions.push(transaction);
    var toIndex = users.findIndex(function (user) { return user.name === transaction.to; });
    console.log('toIndex: ' + toIndex);
    users[toIndex].moneyOwned += transaction.amount;
    users[toIndex].transactions.push(transaction);
    var fromIndex = users.findIndex(function (user) { return user.name === transaction.from; });
    console.log('fromIndex: ' + fromIndex);
    users[fromIndex].moneyOwed += transaction.amount;
    users[fromIndex].transactions.push(transaction);
};
for (var index = 0; index < data.length; index++) {
    _loop_1(index);
}
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
