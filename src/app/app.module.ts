import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BookListPage } from '../pages/book-list/book-list';
import { CdListPage } from '../pages/cd-list/cd-list';
import { SettingsPage } from '../pages/settings/settings';
import { LendBookPage } from '../pages/book-list/lend-book/lend-book';
import { LendCdPage } from '../pages/cd-list/lend-cd/lend-cd';
import { BookCdService } from '../services/book-cd.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BookListPage,
    CdListPage,
    SettingsPage,
    LendBookPage,
    LendCdPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    BookListPage,
    CdListPage,
    SettingsPage,
    LendBookPage,
    LendCdPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BookCdService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
