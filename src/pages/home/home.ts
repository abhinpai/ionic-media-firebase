import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import firebase from 'firebase';
import { Platform, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  alertCtrl: AlertController;
  flag= 0;
  // Added components
  public base64Image: string;
  public photos: any;
  public captureDataUrl: string;

  constructor(public navCtrl: NavController, 
      private camera: Camera, 
      alertCtrl: AlertController,
      public platform: Platform,
    public actionCtrl: ActionSheetController)
     {
       this.alertCtrl= alertCtrl;
     }

  ngOnInit() {
    this.photos = [];
  }
  

      changePicture() {
    const actionsheet = this.actionCtrl.create({
      title: 'Select Option',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.getPhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionsheet.present();
  }


  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }


  takePhoto() {
    console.log("Capture Snaps");
    
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  getPhoto() {
    console.log("Capture Snaps");
    
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }


  upload() {
    let storageRef = firebase.storage().ref();
    const fileName = Math.floor(Date.now() / 1000);
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${fileName}.jpg`);
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      console.log("Uploding..");
      this.showSuccesfulUploadAlert();
    });
  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
    this.captureDataUrl = "";
    console.log("Loading..");
  }


}
