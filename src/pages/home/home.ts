import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Loading,LoadingController,MenuController	} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {UserService} from '../../providers/user'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [BarcodeScanner,UserService]
})
export class HomePage {

  token:any
  constructor(public storage: Storage,private barcodeScanner: BarcodeScanner,public userSrv:UserService,public menuCtrl:MenuController,public nav: NavController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	menuCtrl.enable(true);
  	//this.storage.set('token',null)
  	//this.token=JSON.stringify(this.storage.get('token'))
  }

  scan(){
  	this.barcodeScanner.scan().then((barcodeData) => {
 		alert(JSON.stringify(barcodeData))
	}, (err) => {
	    alert(err)
	});
	  }

}
