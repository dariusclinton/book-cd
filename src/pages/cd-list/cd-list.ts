import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Cd } from '../../models/Cd';
import { BookCdService } from '../../services/book-cd.service';
import { LendCdPage } from './lend-cd/lend-cd';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy {

  cdsList: Cd[];
  cdsListSubscription: Subscription;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private bookCdService: BookCdService,
              private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.cdsListSubscription = this.bookCdService.cdsListSubject$.subscribe(
      (cds: Cd[]) => {
        if (cds) {
          this.cdsList = cds;
        }
      }
    );
    this.bookCdService.emitCds();
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  ngOnDestroy() {
    this.cdsListSubscription.unsubscribe();
  }

}
