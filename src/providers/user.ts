import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserService {
  headers:Headers
  domain='https://itiattendance.herokuapp.com'
  constructor(public http: Http,public storage: Storage) {
    console.log('Hello User Provider');
  }
  login(data){
    let headers=new Headers ({ 'Content-Type': 'application/json' })
    return this.http.post(this.domain+"/api/login",data,{headers:headers})
    .map(res=>res.json())
    

  }
  async sendcode(data){
    let headers=await this.setheader();
    headers.append( 'Content-Type', 'application/json' )
    return this.http.post(this.domain+"/api/students/attendances",JSON.stringify({code:data}),{headers:headers})
      
  }
  async reqleave(data){
    let headers=await this.setheader();
    return this.http.post(this.domain+"/??",JSON.stringify(data),{headers:headers})
      .map(res=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
  }
  async getgrade(){
    let headers=await this.setheader();
    return this.http.get(this.domain+"/???",{headers:headers})
      .map(res=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
  }
  async getleavs(){
    let headers=await this.setheader();
    return this.http.get(this.domain+"/???",{headers:headers})
      .map(res=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
  }


  async setheader(){
    let token = await this.storage.get('token')
    return new Headers ({ 'Authorization': token });
  }


}
