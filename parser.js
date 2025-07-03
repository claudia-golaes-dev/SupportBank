"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFromFiles = readFromFiles;
var fs = require("fs");
var Papa = require("papaparse");
var moment = require('moment');
var user_1 = require("./user");
var transaction_1 = require("./transaction");
function hasEntry(array, newEntry, comparator) {
    return array.find(function (existingEntry) { return comparator(existingEntry, newEntry); }) !== undefined;
}
function readFromFiles(file, users, usernames, transactions) {
    var _a, _b, _c, _d, _e, _f, _g;
    file = fs.readFileSync(file, 'utf8');
    var parsed = Papa.parse(file, {
        delimiter: ',',
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
    });
    var data = parsed.data;
    for (var index = 0; index < data.length; index++) {
        var userFrom = new user_1.User();
        userFrom.name = (_a = data[index]) === null || _a === void 0 ? void 0 : _a['From'];
        var itContains = hasEntry(users, userFrom, function (a, b) { return a.name === b.name; });
        if (!itContains) {
            users.push(userFrom);
            usernames.push(userFrom.name);
        }
        var userTo = new user_1.User();
        userTo.name = (_b = data[index]) === null || _b === void 0 ? void 0 : _b['From'];
        var itContains2 = hasEntry(users, userTo, function (a, b) { return a.name === b.name; });
        if (!itContains2) {
            users.push(userTo);
            usernames.push(userTo.name);
        }
    }
    var _loop_1 = function (index) {
        var transaction = new transaction_1.Transaction();
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
}
