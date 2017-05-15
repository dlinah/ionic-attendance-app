import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Storage } from '@ionic/storage';




@Injectable()
export class UserService {
  headers:Headers =null
  public token:string =null
  domain='192.168.43.67:8000'
  constructor(public http: Http,public storage: Storage) {
    console.log('Hello User Provider');
  }
  login(data){
    return this.http.post("http://"+this.domain+"/api/login",JSON.stringify(data))
    .map(res=>res.json())
    .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))

  }
  sendcode(data){
    if(!this.headers)
      this.setheader();
    return this.http.post("http://"+this.domain+"/qrcode",JSON.stringify(data),{headers:this.headers})
      .map(res=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
  }
  reqleave(data){
    if(!this.headers)
      this.setheader();
    return this.http.post("http://"+this.domain+"/??",JSON.stringify(data),{headers:this.headers})
      .map(res=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
  }
  getgrade(){
    if(!this.headers)
      this.setheader();
    return this.http.get("http://"+this.domain+"/???",{headers:this.headers})
      .map(res=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
  }
  getleavs(){
    if(!this.headers)
      this.setheader();
    return this.http.get("http://"+this.domain+"/???",{headers:this.headers})
      .map(res=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
  }


  setheader(){
    let token=this.storage.get('token')
    this.headers=new Headers ({ 'authentication': token });
  }


}
