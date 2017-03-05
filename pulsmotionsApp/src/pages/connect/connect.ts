import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage {
  splashScreen = true;
  constructor(public navCtrl: NavController) {

  }

  hideSplashScreen() {
    this.splashScreen = false;
  }
}
