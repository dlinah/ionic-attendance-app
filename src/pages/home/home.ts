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
  msg:any
  constructor(public storage: Storage,private barcodeScanner: BarcodeScanner,public userSrv:UserService,public menuCtrl:MenuController,public nav: NavController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	menuCtrl.enable(true);
  	if(navParams.get('msg'))
  		this.msg=navParams.get('msg');
  }

  scan(){
  	this.barcodeScanner.scan().then((barcodeData) => {
 		alert(JSON.stringify(barcodeData))
 		if(!barcodeData.cancelled){
 			this.userSrv.sendcode(barcodeData.text).subscribe( data=>{
				if(data)
					this.nav.setRoot(HomePage,{msg:'attendance saved'})
				else
					this.nav.setRoot(HomePage,{msg:'error WHILE SAVING ATTENDANCE'})
 			})
 		}
	}, (err) => {
	    console.log(err)
	});
	  }

}
