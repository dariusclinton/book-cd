import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {

  mode: string;
  authForm: FormGroup;
  errorMessage: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController) { }


  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    if (this.mode === 'new') {
      let signOutLoader = this.loadingCtrl.create({
        content: 'Création du compte...',
      });
      signOutLoader.present();

      this.authService.signUpUser(email, password).then(
        () => {
          signOutLoader.dismiss();
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          signOutLoader.dismiss();
          this.errorMessage = error;
        }
      );
    } else if (this.mode === 'connect') {
      let signIngLoader = this.loadingCtrl.create({
        content: 'Authentification...',
      });
      signIngLoader.present();

      this.authService.signInUser(email, password).then(
        () => {
          signIngLoader.dismiss();
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          signIngLoader.dismiss();
          this.errorMessage = error;
        }
      );
    }
  }

}
