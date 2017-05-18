import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController } from 'ionic-angular';
import { Request } from '../request/request';
import {UserService} from '../../providers/user';
import {Observable} from 'rxjs/Rx';





@Component({
  selector: 'page-permission',
  templateUrl: 'permission.html',
  providers:[UserService]
})
export class Permission {
  
  permissions:any;
  empty:any =false;
  error:any =null;
  msg:any =null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public userSrv:UserService) {
  	let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  	loading.present();
  	userSrv.getpermissions().then((obs)=>{obs.subscribe(data=>{
  		this.permissions=data.map((item)=>({id:item['id'],date:item['date'].substring(0,10),status:item['rule']['absence_status'].split(' ')[0]}));
  		if(data['Message']) this.empty=data['Message'];
  		loading.dismiss();

  	})});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Permission');
  }
  
  newp(){
  	this.navCtrl.push(Request,{error:'error while sending request'})
  }
  editp(data,){
  	console.log(JSON.stringify(data))
  	this.navCtrl.push(Request,{edit:{permissonStatus:data.status,permissionDate:data.date},id:data.id})
  }
  deletep(id){
  	this.userSrv.delleave(id).then((obs)=>{
        obs.catch((error:any)=>{ console.log(error.json());this.navCtrl.push(Permission,{error:'cant delete permission'});return Observable.throw(error|| 'Server error')})
           .subscribe(data=>{console.log(data);this.msg ='permission deleted'})})
  }


}
