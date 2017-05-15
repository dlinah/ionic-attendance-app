import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Loading,LoadingController,MenuController	} from 'ionic-angular';
import {HomePage} from '../home/home'
import {UserService} from '../../providers/user'
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'login.html',
  providers: [UserService]
})
export class Login {
	loading: Loading;
	loginCredentials = { _username: '', _password: '' };
	error:any=null

  constructor(public storage: Storage,public userSrv:UserService,public menuCtrl:MenuController,public nav: NavController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	menuCtrl.enable(false)
  	if(navParams.get('error'))
  		this.error=navParams.get('error');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  public login() {
    this.showLoading()
   //this.nav.setRoot(HomePage);
    //http authinticate
    this.nav.setRoot(HomePage);
   this.userSrv.login(this.loginCredentials)
    .subscribe((data)=>{
    	this.loading.dismiss()
    	alert(data)
    	if(data){

	    	this.storage.set('token','JWT'+data);
	    	this.userSrv.token='JWT'+data;
	    	this.nav.setRoot(HomePage);
	    }else{
			this.nav.setRoot(Login,{error:'*wrong username or password'})
    	}
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
