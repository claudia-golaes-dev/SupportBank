const moment = require('moment');

export class Transaction{
    date: Date;
    from: string;
    to: string;
    narrative: string;
    amount: number;
}