import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'grades.html',
})
export class Grades {
	grade :number=10;
	max :number=100;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Grades');
  }
  

}
