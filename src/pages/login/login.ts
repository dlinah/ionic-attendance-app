import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Loading,LoadingController} from 'ionic-angular';
import {HomePage} from '../home/home'
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'login.html',
})
export class Login {
	loading: Loading;
	loginCredentials = { email: '', password: '' };

  constructor(public nav: NavController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  public login() {
    this.showLoading()
    //http authinticate
    setTimeout(()=> { this.nav.setRoot(HomePage);}, 3000);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
