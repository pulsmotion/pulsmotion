import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//import { Shake } from 'ionic-native';
import { HTTP } from 'ionic-native';


@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage {

  constructor(public navCtrl: NavController) {
   // let watch = Shake.startWatch(60).subscribe(() => {
  //    this.postVoid()

   // });
    //
    // watch.unsubscribe();


  }

  postVoid() {

    HTTP.post('http://www.mocky.io/v2/58bad1300f0000d50ee16860', {
      id: 12,
        message: "test"
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
