import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { Cd } from '../../models/Cd';
import { BookCdService } from '../../services/book-cd.service';
import { LendCdPage } from './lend-cd/lend-cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdsList: Cd[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private bookCdService: BookCdService,
              private modalCtrl: ModalController) {
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  ionViewWillEnter() {
    this.cdsList = this.bookCdService.cdsList.slice();
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

}
