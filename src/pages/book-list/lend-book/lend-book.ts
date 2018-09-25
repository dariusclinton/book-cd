import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Book } from '../../../models/Book';
import { BookCdService } from '../../../services/book-cd.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {

  index: number;
  book: Book;
  lendForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bookCdService: BookCdService,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.bookCdService.booksList[this.index];

    this.initForm();
  }

  initForm() {
    this.lendForm = this.formBuilder.group({
      borrower: [this.book.borrower, Validators.required]
    });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onReturnBook() {
    this.book.isLend = false;
    this.lendForm.controls['borrower'].disable();
  }

  onLendBook() {
    this.book.isLend = true;
    this.lendForm.controls['borrower'].enable();
  }

  onSubmitLendBook() {
    if (this.book.isLend) {
      let borrower = this.lendForm.get('borrower').value;
      this.book.borrower = borrower;
    } else {
      this.book.borrower = null;
    }

    this.bookCdService.lendOrReturnBook(this.index, this.book);
    
    this.viewCtrl.dismiss();
  }
}
