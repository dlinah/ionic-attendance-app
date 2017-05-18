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
    let headers=new Headers ({ 'Content-Type': 'application/json' });
    return this.http.post(this.domain+"/api/login",data,{headers:headers}).map(res=>res.json());
    

  }
  async sendcode(data){
    let headers=await this.setheader();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.domain+"/api/students/"+data+"/attendances",'',{headers:headers}).map(res=>res.json());
      
  }
  async reqleave(data){
    let headers=await this.setheader();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.post(this.domain+"/api/permissions",JSON.stringify(data),{headers:headers}).map(res=>res.json());
  }
  async editleave(data,id){
    console.log('leave')
    let headers=await this.setheader();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.put(this.domain+"/api/permissions/"+id,JSON.stringify(data),{headers:headers}).map(res=>res.json());
  }
  async delleave(id){
    let headers=await this.setheader();
    headers.append( 'Content-Type', 'application/json' );
    return this.http.delete(this.domain+"/api/permissions/"+id,{headers:headers}).map(res=>res.json());
  }
  async getmaxgrade(){
    let headers=await this.setheader();
  
    return this.http.get(this.domain+"/api/max/absence/points",{headers:headers})
      .map(res=>res.json())
      .catch((error:any)=>{console.log(error);return Observable.throw(error || 'Server error')});
  }
  async getleavs(){
    let headers=await this.setheader();
    return this.http.get(this.domain+"/api/student/absence",{headers:headers})
      .map(res=>res.json())
      .catch((error:any)=>{console.log(error);return Observable.throw(error || 'Server error')})
  }

  async getpermissions(){
    let headers=await this.setheader();
    return this.http.get(this.domain+"/api/permissions",{headers:headers})
      .map(res=>res.json())
      .catch((error:any)=>{console.log(error);return Observable.throw(error || 'Server error')})
  }


  async setheader(){
    let token = await this.storage.get('token')
    return new Headers ({ 'Authorization': token });
  }


}
