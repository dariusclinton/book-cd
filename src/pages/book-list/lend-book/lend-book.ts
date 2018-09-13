import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Book } from '../../../models/Book';
import { BookCdService } from '../../../services/book-cd.service';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {

  index: number;
  book: Book;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bookCdService: BookCdService,
              private viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.bookCdService.booksList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
  
  onLendBook() {
    this.bookCdService.lendOrReturnBook(this.index);
  }

  onReturnBook() {
    this.bookCdService.lendOrReturnBook(this.index);
  }
}
