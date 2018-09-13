import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { Book } from '../../models/Book';
import { BookCdService } from '../../services/book-cd.service';
import { LendBookPage } from './lend-book/lend-book';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  booksList: Book[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private bookCdService: BookCdService,
              private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.booksList = this.bookCdService.booksList.slice();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }


  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

}
