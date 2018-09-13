import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { Cd } from '../models/Cd';


@Injectable()
export class BookCdService {

    booksList: Book[] = [
        {
            name: 'The impact of One',
            author: 'Roland Kwemain',
            description: 'lorem ipsum dolor sit amet sum',
            isLend: false
        },
        {
            name: 'La vie suspendue',
            author: 'Helene Cardona',
            description: 'lorem ipsum dolor sit amet sum',
            isLend: false,
        },
        {
            name: 'La Reine en jaune',
            author: 'Anders Fager',
            description: 'lorem ipsum dolor sit amet sum',
            isLend: true
        }
    ];

    cdsList: Cd[] = [
        {
            name: 'The Advengers',
            description: 'lorem ipsum dolor sit amet sum',
            isLend: true
        },
        {
            name: 'Spiderman',
            description: 'lorem ipsum dolor sit amet sum',
            isLend: false
        },
        {
            name: 'God of war',
            description: 'lorem ipsum dolor sit amet sum',
            isLend: false
        }
    ];


    lendOrReturnBook(index: number) {
        this.booksList[index].isLend = !this.booksList[index].isLend;
    }

    lendOrReturnCd(index: number) {
        this.cdsList[index].isLend = !this.cdsList[index].isLend;
    }


}