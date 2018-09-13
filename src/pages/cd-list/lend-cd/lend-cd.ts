import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Cd } from '../../../models/Cd';
import { BookCdService } from '../../../services/book-cd.service';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: Cd;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private bookCdService: BookCdService) {
  }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.bookCdService.cdsList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onLendCd() {
    this.bookCdService.lendOrReturnCd(this.index);
  }

  onReturnCd() {
    this.bookCdService.lendOrReturnCd(this.index);
  }
}
