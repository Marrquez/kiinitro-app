import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { UserService } from './user.service';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor(public user: UserService) {};

  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  initFirebase(){
    if(!firebase.apps.length){
      firebase.initializeApp({
        apiKey: "AIzaSyCQLJM4RBmvPWaghoKjkTjUI60HKdx3KtA",
        authDomain: "kiinitro-5eb0b.firebaseapp.com",
        databaseURL: "https://kiinitro-5eb0b.firebaseio.com",
        projectId: "kiinitro-5eb0b",
        storageBucket: "kiinitro-5eb0b.appspot.com",
        messagingSenderId: "871776241739"
      });
    }
  };

  logByGoogle(){
    var self = this;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  getGoogleUser(){
    var self = this;

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        self.user.data = result.user;
        self.user.isLogged = true;
        if (!self.user.getUserInternalData(result.user.uid)) {
          self.user.createUser(result.user.uid, result.user.displayName, 0);
          self.user.getUserInternalData(result.user.uid);
        }
      }
    }).catch(function(error) {
    });
  };

  logByFacebook(){
    var self = this;
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithRedirect(provider);
  };

  getFacebookUser(){
    var self = this;

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        self.user.data = result.user;
        self.user.isLogged = true;
        if (!self.user.getUserInternalData(result.user.uid)) {
          self.user.createUser(result.user.uid, result.user.displayName, 0);
          self.user.getUserInternalData(result.user.uid);
        }
      }
    }).catch(function(error) {
    });
  };

  signupUser(email: string, password: string, username: string): firebase.Promise<any> {
    var self = this;

    return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      let uid = newUser.uid;
      firebase.database().ref('/userProfile').child(uid).set({ email: email });
      self.user.createUser(uid, username, 0);
    });
  };

  resetPassword(email: string): firebase.Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  logoutUser() {
    //return firebase.auth().signOut();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

  isAuth() {
    var self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.user.data = user;
        self.user.isLogged = true;
        self.user.getUserInternalData(self.user.data.uid);
        return true;
      } else {
        // No user is signed in.
        self.user.data = {uid: '', displayName: ''};
        self.user.internalData = {
          iPoints: 0,
          iUserId: '',
          vchUsername: '',
          dtLastSession: '',
          dtBegin: '',
          dtEnd: '',
          height: 0,
          weight: 0,
          imc: 0
        };
        self.user.isLogged = false;
        console.warn("The user isn't logged in");
        return false;
      }
    });
  }
}
