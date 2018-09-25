import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';

import * as firebase from 'firebase';
import { AuthPage } from '../pages/auth/auth';
import { BookCdService } from '../services/book-cd.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  settingsPage:any = SettingsPage;
  isAuth = false;
  authPage = AuthPage;

  @ViewChild('content') content: NavController;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private bookCdService: BookCdService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Initialize Firebase
      const config = {
        apiKey: "AIzaSyD2GYeA8b5zZE9jxH_DgTkYgRhcQNfrSX4",
        authDomain: "proplistings-4494d.firebaseapp.com",
        databaseURL: "https://proplistings-4494d.firebaseio.com",
        projectId: "proplistings-4494d",
        storageBucket: "proplistings-4494d.appspot.com",
        messagingSenderId: "878896790169"
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage)
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, { mode: 'connect' });
          }
      });

      // Fetch data
      this.fetchData();
    });
  }


  fetchData() {
    this.bookCdService.fetchData();
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}

