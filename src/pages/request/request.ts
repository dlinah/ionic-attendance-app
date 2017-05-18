import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {DatePicker} from '@ionic-native/date-picker';
import {UserService} from '../../providers/user'
import {Grades} from '../grades/grades'
import {Observable} from 'rxjs/Rx';



@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
  providers:[DatePicker,UserService]
})
export class Request {

	req={permissonStatus:'',permissionDate:''}
	error:any=null
  edit:any=false
  id:any=null

  constructor(public userSrv:UserService,public date:DatePicker,public navCtrl: NavController, public navParams: NavParams) {
  	
    if(navParams.get('edit')){
      this.req=navParams.get('edit');
      this.edit=true;
    }
    if(navParams.get('id'))
      this.id=navParams.get('id');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Request');
  }
  onSubmit(){
    
  	if(this.req.permissionDate == '')
  		this.error='please select date'
  	else{
      if(this.edit){
        this.userSrv.editleave(this.req,this.id).then((obs)=>{
        obs.catch((error:any)=>{ console.log(JSON.stringify(error.json()));this.error=error.json()['message'];return Observable.throw(error|| 'Server error')})
           .subscribe(data=>{console.log(data);this.navCtrl.push(Grades)})})
      }
      else{
        this.userSrv.reqleave(this.req).then((obs)=>{
        obs.catch((error:any)=>{ console.log(error.json());this.error=error.json()['message'];return Observable.throw(error|| 'Server error')})
           .subscribe(data=>{console.log(data);this.navCtrl.push(Grades)})})
      }
  		
	   }  

  }
  get_date(){
        this.date.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.date.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => this.req.permissionDate=JSON.stringify(date).substring(1, 11),
          err => console.log('Error occurred while getting date: '+ err)
        );
    }

}

