import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class SessionService {
  private baseUrl = 'http://localhost:8080';
  //private baseUrl = 'http://ec2-35-162-194-240.us-west-2.compute.amazonaws.com:8080';
  public dataItems = {
    genders: [
      {name: 'Hombre', id: 0},
      {name: 'Mujer', id: 1}
    ],
    times: [
      {name: '0 - 5 meses', id: 0},
      {name: '6 - 11 meses', id: 1},
      {name: '12 o más', id: 2}
    ],
    targets: [
      {name: 'Aumentar masa', id: 0},
      {name: 'Tonificar', id: 1},
      {name: 'Bajar de peso', id: 2}
    ],
    places: [
      {name: 'Casa', id: 0},
      {name: 'Gimnasio', id: 1}
    ]
  };

  public data = {
    gender: '',
    time: '',
    target: '',
    place: ''
  };

  constructor(private http: Http) { };

  private getUser(id: string) {
    let url = this.baseUrl + '/getUser';
    let params: URLSearchParams = new URLSearchParams();

    params.set('id', id);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  };
}
