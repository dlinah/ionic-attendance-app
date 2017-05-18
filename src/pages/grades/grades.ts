import { Component } from '@angular/core';
import {  NavController, NavParams ,Loading,LoadingController } from 'ionic-angular';
import {UserService} from '../../providers/user';
//import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';



@Component({
  selector: 'page-grades',
  templateUrl: 'grades.html',
})
export class Grades {
	grade :number=0;
	max :number=0;
	list :any;

  constructor(public userSrv:UserService,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  	let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    
    userSrv.getmaxgrade().then((obs)=>{obs.subscribe(data=>{this.max=data})})
   	
    userSrv.getleavs().then((obs)=>{obs.subscribe(data=>{
      console.log(JSON.stringify(data));
      this.list=data.results.map((item)=>(item['date'].substring(0,10)+'  '+item['rule']['absence_status']));
      this.grade=data['$accAbsencePoints'];
      loading.dismiss();

    })})


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Grades');
  }
  
  

}
