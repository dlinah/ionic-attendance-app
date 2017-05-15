import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  public token:string =null
  domain='192.168.43.67:8000'
  constructor(public http: Http) {
    console.log('Hello User Provider');
  }
  login(data){
  	let headers = new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post("http://192.168.43/phpmyadmin",JSON.stringify(data))
    .map(res=>res.json())
    .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))

  }

}
