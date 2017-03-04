import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

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

  }

}
