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

  constructor(public navCtrl: NavController, private socketService:SocketService) {
    this.socket = io('http://localhost:5000');
    this.socket.on("connect", (data) => {
      console.log(data);
    });
  }

  sendMessage(){
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
