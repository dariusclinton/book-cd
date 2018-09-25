import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, 
        LoadingController } from 'ionic-angular';
import { BookCdService } from '../../services/book-cd.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private bookCdService: BookCdService) { }

  onSaveBookList() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde...'
    });
    loader.present();

    this.bookCdService.saveBooks().then(
      (data) => {
        loader.dismiss();

        this.toastCtrl.create({
          message: 'Livres sauvegardés avec succès!',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onFetchBookList() {
    let loader = this.loadingCtrl.create({
      content: 'Récupération...'
    });
    loader.present();

    this.bookCdService.retreiveBooks().then(
      (data) => {
        loader.dismiss();
        
        this.toastCtrl.create({
          message: 'Livres récupérés avec succès!',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onSaveCdList() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde...'
    });
    loader.present();

    this.bookCdService.saveCds().then(
      (data) => {
        loader.dismiss();

        this.toastCtrl.create({
          message: 'CD sauvegardés avec succès!',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onFetchCdList() {
    let loader = this.loadingCtrl.create({
      content: 'Récupération...'
    });
    loader.present();

    this.bookCdService.retreiveCds().then(
      (data) => {
        loader.dismiss();
        
        this.toastCtrl.create({
          message: 'CD récupérés avec succès!',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }
            

}
