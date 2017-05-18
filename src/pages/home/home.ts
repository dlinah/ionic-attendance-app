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


  constructor(public storage: Storage,private barcodeScanner: BarcodeScanner,public userSrv:UserService,public menuCtrl:MenuController,public nav: NavController,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	menuCtrl.enable(true);
  	if(navParams.get('msg'))
  		this.msg=navParams.get('msg');
  }

  scan(){
  	this.barcodeScanner.scan().then((barcodeData) => {
      console.log(JSON.stringify(barcodeData))
     		if(!barcodeData.cancelled){
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loading.present();
     			this.userSrv.sendcode(barcodeData.text)
          .then(obs=>{
              obs.catch((error:any)=>{loading.dismiss();console.log(JSON.stringify(error.json()));this.nav.setRoot(HomePage,{msg:error.json()['message']});return  Observable.throw(error.json().error || 'Server error')})
                 .subscribe( data=>{loading.dismiss();console.log(data);this.nav.setRoot(HomePage,{msg:'attendance saved'})})
            })
          
     		}
    	}, (err) => {
    	    console.log(err)
  	});
  }

}
