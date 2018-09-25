import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { Cd } from '../models/Cd';
import { Subject } from 'rxjs/Subject';
import *  as firebase from 'firebase';
import { Storage } from '@ionic/storage';


@Injectable()
export class BookCdService {

    booksList: Book[] = [];

    cdsList: Cd[] = [];

    booksListSubject$ = new Subject<Book[]>();
    cdsListSubject$ = new Subject<Cd[]>();

    constructor(private storage: Storage) {}

    emitBooks() {
        this.booksListSubject$.next(this.booksList.slice());
    }

    emitCds() {
        this.cdsListSubject$.next(this.cdsList.slice());
    }

    lendOrReturnBook(index: number, newBook: Book) {
        this.booksList[index] = newBook;
        this.storage.set('books', this.booksList);
    }

    lendOrReturnCd(index: number, newCd: Cd) {
        this.cdsList[index] = newCd;
        this.storage.set('cds', this.cdsList);
    }

    saveBooks() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('books').set(this.booksList).then(
                (data: any) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    retreiveBooks() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('books').once('value').then(
                (data: any) => {
                    this.booksList = data.val();
                    this.emitBooks();
                    resolve('Données récupéréé avec succès!');
                    this.storage.set('books', this.booksList);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    saveCds() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('cds').set(this.cdsList).then(
                (data: any) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    retreiveCds() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('cds').once('value').then(
                (data: any) => {
                    this.cdsList = data.val();
                    this.emitCds();
                    resolve('Données récupéréé avec succès!');
                    this.storage.set('cds', this.cdsList);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    fetchData() {
        this.storage.get('books').then(
            (data) => {
                if (data && data.length) {
                    this.booksList = data.slice();
                }
                this.emitBooks();
            }
        );

        this.storage.get('cds').then(
            (data) => {
                if (data && data.length) {
                    this.cdsList = data.slice();
                }
                this.emitCds();
            }
        );
    }
}