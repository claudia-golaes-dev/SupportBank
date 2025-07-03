import { Transaction } from "./transaction"
const moment = require('moment');

export class User{
    name: string;
    moneyOwned: number = 0;
    moneyOwed: number = 0;
    transactions: Transaction[] = [];
}