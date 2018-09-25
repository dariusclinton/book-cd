import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Cd } from '../../../models/Cd';
import { BookCdService } from '../../../services/book-cd.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: Cd;
  lendForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private bookCdService: BookCdService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.bookCdService.cdsList[this.index];

    this.initForm();
  }

  initForm() {
    this.lendForm = this.formBuilder.group({
      borrower: [this.cd.borrower, Validators.required]
    });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onReturnCd() {
    this.cd.isLend = false;
    this.lendForm.controls['borrower'].disable();
  }

  onLendCd() {
    this.cd.isLend = true;
    this.lendForm.controls['borrower'].enable();
  }

  onSubmitLendCd() {
    if (this.cd.isLend) {
      let borrower = this.lendForm.get('borrower').value;
      this.cd.borrower = borrower;
    } else {
      this.cd.borrower = null;
    }

    this.bookCdService.lendOrReturnCd(this.index, this.cd);
    
    this.viewCtrl.dismiss();
  }
}
