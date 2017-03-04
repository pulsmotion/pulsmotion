import { Component, OnInit, OnDestroy } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SocketService } from '../../services/socket.service';

import * as io from 'socket.io-client';

@Component({
  selector: 'page-emotions',
  templateUrl: 'emotions.html',
  providers: [SocketService]
})
export class EmotionsPage implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  socket:any = null;
  stages = [
    {
      id: 1,
      strength: 0.3
    },
    {
      id: 2,
      strength: 0.4
    },
    {
      id: 3,
      strength: 0.3
    }
  ];

  constructor(public navCtrl: NavController, private socketService:SocketService) {
    this.socket = io('http://localhost:8080');
    this.socket.on('connected', (data) => {
      console.log(data);
    });
    this.socket.on('new-moment', (data) => {
      console.log(data);
      for (var i = 0; i < this.stages.length; i++) {
        if (data.moment.stage === this.stages[i].id) {
          this.stages[i].strength = data.moment.strength;
        }
      }
    });
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
  //   // this.connection = this.socketService.getMessages().subscribe(message => {
  //   //   console.log('message', message);
  //   //   this.messages.push(message);
  //   // })
  //   this.socket = io.connect(this.socketUrl);
  //   this.socket.on("connect", (data) => console.log(typeof data));
  //
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
