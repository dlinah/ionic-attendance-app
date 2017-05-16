import { Component } from '@angular/core';
import {  NavController, NavParams , Loading,LoadingController,MenuController	} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {UserService} from '../../providers/user'
import { Storage } from '@ionic/storage';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BarcodeScanner,UserService]
})
export class HomePage {
  msg:any
  loading: Loading;


  constructor(public storage: Storage,private barcodeScanner: BarcodeScanner,public userSrv:UserService,public menuCtrl:MenuController,public nav: NavController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	menuCtrl.enable(true);
  	if(navParams.get('msg'))
  		this.msg=navParams.get('msg');
  }

  scan(){
  	this.barcodeScanner.scan().then((barcodeData) => {
     		if(!barcodeData.cancelled){
          this.showLoading()
     			this.userSrv.sendcode(barcodeData.text)
          .then(obs=>{
              obs.catch((error:any)=>{this.loading.dismiss();this.nav.setRoot(HomePage,{msg:'error WHILE SAVING ATTENDANCE'});return  Observable.throw(error.json().error || 'Server error')})
                 .subscribe( data=>{this.loading.dismiss();this.nav.setRoot(HomePage,{msg:'attendance saved'})})
            })
          
     		}
    	}, (err) => {
    	    console.log(err)
  	});
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
