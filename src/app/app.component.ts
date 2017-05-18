import { Component ,ViewChild} from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Grades } from '../pages/grades/grades';
import { Request } from '../pages/request/request';
import { Permission } from '../pages/permission/permission';
import {UserService} from '../providers/user';

@Component({
  templateUrl: 'app.html',
  providers:[UserService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = '';
  pages: Array<{title: string, component: any}>;

  constructor(userSrv:UserService,public storage: Storage,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'grades & leaves', component: Grades },
      { title: 'request permission', component: Request },
      { title: 'permissions',component:Permission}
    ];
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    storage.get('token').then((val)=>{if(val){this.rootPage=HomePage}else{this.rootPage=Login}}).catch((err)=>{console.log(err)})
  }
  goto(page) {
    this.nav.push(page.component);
  }
  logout(){
    this.storage.remove('token')
    this.goto({component:Login})
  }
}

