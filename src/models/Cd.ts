export class Cd {
    name: string;
    description?: string;
    isLend: boolean;
    borrower?: string;

    constructor(name: string) {
        this.name = name;
        this.isLend = false;
    }
}