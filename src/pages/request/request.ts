import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatePicker} from '@ionic-native/date-picker';
import {UserService} from '../../providers/user'
import {Grades} from '../grades/grades'


@Component({
  templateUrl: 'request.html',
  providers:[DatePicker,UserService]
})
export class Request {

	req={reason:'',date:''}
	error:any=null

  constructor(public userSrv:UserService,public date:DatePicker,public navCtrl: NavController, public navParams: NavParams) {
  	if(navParams.get('error'))
  		this.error=navParams.get('error');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Request');
  }
  onSubmit(){
  	if(this.req.date == '')
		this.navCtrl.setRoot(Request,{error:'please select date'})
	else{
		this.userSrv.reqleave(this.req).subscribe(data=>{})
		this.navCtrl.push(Grades)
	}

  }
  get_date(){
        this.date.show({
          date: new Date(),
          mode: 'date',
          androidTheme: this.date.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
          date => this.req.date=JSON.stringify(date),
          err => console.log('Error occurred while getting date: '+ err)
        );
    }

}

