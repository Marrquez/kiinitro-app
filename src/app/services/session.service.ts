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
    ],
    muscles: []
  };

  public muscles = [
    [
      {name: 'Pecho-Bíceps-Abdomen', id: 0},
      {name: 'Espalda-Tríceps-Abdomen', id: 1},
      {name: 'Muslos-Abdomen', id: 2},
      {name: 'Pantorilla-Abdomen', id: 3},
      {name: 'Hombro-Trapecio-Abdomen', id: 4}
    ],
    [
      {name: 'Pecho-Abdomen', id: 0},
      {name: 'Espalda-Abdomen', id: 1},
      {name: 'Biceps-Tríceps-Abdomen', id: 2},
      {name: 'Hombro-Trapecio-Abdomen', id: 3},
      {name: 'Muslo-Pantorrilla-Abdomen', id: 4}
    ],
    [
      {name: 'Muslos-Pantorrilla-Abdomen', id: 0},
      {name: 'Pecho-Tríceps-Bíceps-Abdomen', id: 0},
      {name: 'Espalda-Hombro-Abdomen', id: 0}
    ]
  ];

  public data = {
    gender: '',
    time: '',
    target: '',
    place: '',
    muscle: ''
  };

  constructor(private http: Http) { };

  public getEjercicio(id: string) {
    let url = this.baseUrl + '/getEjercicio';
    let params: URLSearchParams = new URLSearchParams();

    params.set('id', id);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public getEjercicesByMuscle(muscles: string) {
    let url = this.baseUrl + '/getEjercicesByMuscle';
    let params: URLSearchParams = new URLSearchParams();

    params.set('muscles', muscles);

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
