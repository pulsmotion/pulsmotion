import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Shake, HTTP} from "ionic-native";
import {Observable} from "rxjs";
import { ScreenOrientation } from 'ionic-native';



@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html',

})
export class MomentsPage {

  constructor(public navCtrl: NavController) {



    console.log('Try construct shake service');
    var intensity: number = 0;

    let watch = Shake.startWatch(1);
    watch.subscribe(() => {
      console.log('Shake detected');
      intensity += 0.15;
    } );

    let intervalScheduler = Observable.interval(5000);

    intervalScheduler.subscribe(() => {
      this.postShake(intensity);
      intensity = 0;
    });
  }

  postShake(strength: number) {
    let orientation = ScreenOrientation.orientation
    console.log(orientation)
    console.log('Send shake');
    console.log(strength);
    HTTP.post('http://172.17.244.207:8080/moments', {
      stages: 1,
      strength: strength
    }, {})
      .then(response => {

        console.log(response.status);
        console.log(response.data); // data received by server
        console.log(response.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });

  }

}
