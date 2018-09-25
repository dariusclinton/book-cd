import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Book } from '../../models/Book';
import { BookCdService } from '../../services/book-cd.service';
import { LendBookPage } from './lend-book/lend-book';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy {

  booksList: Book[];
  booksListSubscription: Subscription;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bookCdService: BookCdService,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.booksListSubscription = this.bookCdService.booksListSubject$.subscribe(
      (books: Book[]) => {
        if (books) {
          this.booksList = books.slice();
        }
      }
    );
    this.bookCdService.emitBooks();
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  ngOnDestroy() {
    this.booksListSubscription.unsubscribe();
  }

}
