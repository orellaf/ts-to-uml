
import * as uuid from 'uuid';

export class Person {
    private _id: string;
    private name: string;
    private addressMail: string;

    constructor(name: string = "John Doe") {
        this._id = uuid.v4();
        this.name = name;
    }
    public getName(): string {
        return this.name;
    }


    public getId(): string {
        return this._id;
    }


    public getAddressMail(): string {
        return this.addressMail;
    }
    public setAddressMail(addressMail: string) {
        this.addressMail = addressMail;
    }


    public static build(name: string): Person {
        return new Person(name);
    }
}