import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
declare let gapi: any;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  loginProviderObj = {};
  auth2;
  constructor(public navCtrl: NavController) {
    this.loginProviderObj = {
      name: "google",
      url: "https://apis.google.com/js/platform.js"
    };
  }

  gsuiteAuth() {
    console.log("hi");

    this.loadScript(this.loginProviderObj, () => {
      console.log("script loaded");
      console.log("gapi ", gapi);
      gapi.load("auth2", () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            "852792885400-v960fh3akkt9f07pd02u2fagfjdbmi93.apps.googleusercontent.com"
            // '852792885400-akmbv2bbm2k9dnshgd061gh6bah9qddh.apps.googleusercontent.com'

        });


        // this.auth2.then((val) => {
        //   console.log('returned obj ', val)
        //   let result = this.auth2.isSignedIn.get();
        //   console.log("result is ", result);
        // });
        

        // let signInOptions = new gapi.auth2.SigninOptionsBuilder();
        // signInOptions.setScope('https://www.googleapis.com/auth/calendar');
        // console.log('sigin in options ', signInOptions);
        // this.auth2.signIn().then((val) => {
        //   console.log('signin result is ', val);
          
        //   // if(this.auth2.isSignedIn.get()) {
        //   //  let user = this.auth2.currentUser.get();
        //   //  console.log('current user ', user);
        //   //  let authResponse = user.getAuthResponse(true);
        //   //  console.log('auth response ', authResponse);
        //   // }
        // })

        this.auth2.grantOfflineAccess().then((code)=> {
            console.log('offline code ', code);
          }).catch((err) => {
            console.log('error is ', err);
          })
      });
    });
  }

  onSignin(param) {
    console.log(param);
  }
  loadScript(obj, onload: any): void {
    if (document.getElementById(obj.name)) {
      return;
    }
    let signInJS = document.createElement("script");
    signInJS.async = true;
    signInJS.src = obj.url;
    signInJS.onload = onload;
    document.head.appendChild(signInJS);
  }
}
