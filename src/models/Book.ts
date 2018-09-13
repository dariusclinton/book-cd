export class Book {
    name: string;
    author?: string;
    description?: string;
    isLend: boolean;

    constructor(name: string) {
        this.name = name;
        this.isLend = false;
    }
}