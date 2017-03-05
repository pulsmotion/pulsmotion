import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP} from 'ionic-native';
import {Shake} from 'ionic-native'
import {Observable} from "rxjs";
//import { ScreenOrientation } from 'ionic-native';



@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html',

})
export class MomentsPage {
  moments = [
    { createdAt: 'Montag, 12:35', stage: 2, people: 263, image: 'moment-1.png', artist: 'Bryan Adams', song: 'Summer of 69', emotionScore: 56 },
    { createdAt: 'Montag, 12:51', stage: 2, people: 282, image: 'moment-2.png', artist: 'Bryan Adams', song: 'Summer of 69', emotionScore: 65 },
    { createdAt: 'Montag, 14:52', stage: 3, people: 563, image: 'moment-3.png', artist: 'Bryan Adams', song: 'Summer of 69', emotionScore: 76 },
    { createdAt: 'Montag, 15:23', stage: 1, people: 861, image: 'moment-4.png', artist: 'Bryan Adams', song: 'Summer of 69', emotionScore: 76 },
    { createdAt: 'Montag, 16:11', stage: 1, people: 933, image: 'moment-5.png', artist: 'Bryan Adams', song: 'Summer of 69', emotionScore: 82 },
    { createdAt: 'Montag, 16:32', stage: 1, people: 922, image: 'moment-6.png', artist: 'Bryan Adams', song: 'Summer of 69', emotionScore: 88 },
    { createdAt: 'Montag, 17:11', stage: 2, people: 1223, image: 'moment-7.png', artist: 'Bryan Adams', song: 'Summer of 69', emotionScore: 93 }
  ];

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
    //let orientation = ScreenOrientation.orientation
    //console.log(orientation)
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
