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

  logByGoogle(){
    var self = this;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      self.user.data = result.user;
      self.user.isLogged = true;
      // ...
    }).catch(function(error) {
      console.log("error singing");
    });
  };

  signupUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      firebase.database().ref('/userProfile').child(newUser.uid)
        .set({ email: email });
    });
  };

  resetPassword(email: string): firebase.Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  logoutUser(): firebase.Promise<void> {
    return firebase.auth().signOut();
  }

  isAuth(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(true);
        console.log(firebase.auth().currentUser);
      } else {
        console.log(false);
        console.log(firebase.auth().currentUser);
      }
    });
  };
}
