import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserService} from '../../providers/user'


@Component({
  templateUrl: 'grades.html',
})
export class Grades {
	grade :number=10;
	max :number=100;
	list :any

  constructor(public userSrv:UserService,public navCtrl: NavController, public navParams: NavParams) {
  	userSrv.getgrade().subscribe(data=>{})//set max &grade
   	userSrv.getleavs().subscribe(data=>{})//fill list

  	let dummylist=['14/15/2014 absent permitted','13/12/2015 absent not permitted']
  	this.list=dummylist

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Grades');
  }
  

}
