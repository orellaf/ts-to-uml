# Typescript to UML

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

see the file **Visualisateur UML.PDF** for the specification.

input file (src/assets/person.ts):

```typescript

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
```

output:

![Image of uml diagram](https://github.com/orellaf/ts-to-uml/blob/master/uml_capture.PNG)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
