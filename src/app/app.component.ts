import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      var firebaseConfig  = {
        apiKey: "AIzaSyAYPguay5K96f4zlPspU7zvv2Kymu4kMWA",
        authDomain: "ionic-camera-37857.firebaseapp.com",
        databaseURL: "https://ionic-camera-37857.firebaseio.com",
        projectId: "ionic-camera-37857",
        storageBucket: "ionic-camera-37857.appspot.com",
        messagingSenderId: "531749323650"
      };
      firebase.initializeApp(firebaseConfig );

    });
  }
}

