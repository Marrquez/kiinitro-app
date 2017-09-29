import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  //private baseUrl = 'http://localhost:8080';
  private baseUrl = 'http://ec2-52-42-164-164.us-west-2.compute.amazonaws.com:4500';
  public data = {uid: '', displayName: ''};
  public isLogged = false;
  public mainImg = './assets/img/kiinitro fitness 3.png';
  public internalData = {
    iPoints: 0,
    iUserId: '',
    vchUsername: '',
    dtBegin: '',
    dtEnd: '',
    dtLastSession: ''
  };
  constructor(private http: Http) { };

  public getUserInternalData(uid){
    var self = this;

    self.getUserInfoById(uid).then(response => {
      if (response.data && response.data.iUserId) {
        self.internalData.iPoints = response.data.iPoints;
        self.internalData.iUserId = response.data.iUserId;
        self.internalData.vchUsername = response.data.vchUsername;
        self.internalData.dtLastSession = response.data.dtLastSession;
        return true;
      } else {
        return false;
      }
    });
  };

  public getUserInfoById(uid: string){
    let url = this.baseUrl + '/get-userInfo';
    let params: URLSearchParams = new URLSearchParams();

    params.set('idUser', uid);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public createUser(uid: string, username: string, points: number){
    let url = this.baseUrl + '/ins-userInfo';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let params = {
      'idUser': uid,
      'username': username,
      'points': points
    };

    return this.http.post(url, params, options)
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public updatePoints(points: number){
    let url = this.baseUrl + '/upd-userPoints';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    let params = {
      'idUser': this.internalData.iUserId,
      'points': points.toString(),
      'dtBegin': this.internalData.dtBegin,
      'dtEnd': this.internalData.dtEnd
    };

    return this.http.put(url, params, options)
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  };
}
