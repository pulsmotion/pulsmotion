import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP} from 'ionic-native';
//import {Shake} from 'ionic-native'
import {Observable} from "rxjs";
//import { ScreenOrientation } from 'ionic-native';
import * as io from 'socket.io-client';

@Component({
  selector: 'page-moments',
  templateUrl: 'moments.html',
})
export class MomentsPage {
  moments = [
    { id: 7, active: true, createdAt: 'Samstag, 14:52', stage: 1, people: 1223, image: 'moment-3.png', artist: 'Tua', song: 'Moment', emotionScore: 76 },
    { id: 6, active: true, createdAt: 'Samstag, 17:11', stage: 2, people: 923, image: 'moment-6.png', artist: 'Roosevelt', song: 'Fever', emotionScore: 93 },
    { id: 5, active: true, createdAt: 'Samstag, 16:32', stage: 1, people: 922, image: 'moment-7.png', artist: 'Bonapart', song: 'Anti Anti', emotionScore: 88 },
    { id: 4, active: true, createdAt: 'Samstag, 16:11', stage: 1, people: 933, image: 'moment-5.png', artist: 'Bonapart', song: 'Too much', emotionScore: 82 },
    { id: 3, active: true, createdAt: 'Samstag, 15:23', stage: 1, people: 861, image: 'moment-4.png', artist: 'Milky Chance', song: 'Stolen Dance', emotionScore: 76 },
    { id: 2, active: true, createdAt: 'Samstag, 12:35', stage: 2, people: 463, image: 'moment-1.png', artist: 'The XX', song: 'VCR', emotionScore: 76 },
    { id: 1, active: true, createdAt: 'Samstag, 5:45', stage: 2, people: 82, image: 'moment-2.png', artist: '', song: '', emotionScore: 65 }
  ];
  socket:any = null;
  momentIterator:number = this.moments.length;

  constructor(public navCtrl: NavController) {
    console.log('Try construct shake service');
    var intensity: number = 0;

   // let watch = Shake.startWatch(1);
   // watch.subscribe(() => {
      console.log('Shake detected');
      intensity += 0.15;
   // } );

    let intervalScheduler = Observable.interval(5000);

    intervalScheduler.subscribe(() => {
      this.postShake(intensity);
      intensity = 0;
    });

    this.socket = io('http://172.17.101.242:8080');
    this.socket.on('connected', (data) => {
      console.log(data);
    });
    this.socket.on('new-moment', (data) => {
      console.log(data, parseFloat(data.moment.strength));
      if (parseFloat(data.moment.strength) > 0.7) {
        let now = new Date();
        let newMoment = {
          stage: data.moment.stages,
          strength: data.moment.strength,
          createdAt: 'Sonntag, ' + now.getHours() + ':' + now.getMinutes(),
          people: this.randomIntFromInterval(30, 50),
          image: 'moment-' + this.randomIntFromInterval(1, 7) +  '.png',
          artist: 'Bilderbuch',
          song: 'Bungalow',
          active: false,
          id: this.momentIterator,
          emotionScore: this.randomIntFromInterval(70, 100)

        }
        this.moments.unshift(newMoment);
        this.momentIterator++;
        setTimeout(() => {
          this.setItemActive();
        }, 500);
      }
    });
  }

  setItemActive() {
    for (var i = 0; i < this.moments.length; i++) {
      console.log(this.momentIterator -1 , this.moments[i].id);
      if (this.momentIterator - 1 == this.moments[i].id) {
        this.moments[i].active = true;
      }
    }
  }

  randomIntFromInterval(min: number, max:number) {
    return Math.floor(Math.random()*(max-min+1)+min);
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
