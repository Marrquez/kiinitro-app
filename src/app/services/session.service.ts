import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class SessionService {
  private baseUrl = 'http://localhost:8080';
  //private baseUrl = 'http://ec2-52-42-164-164.us-west-2.compute.amazonaws.com:4500';
  public dataItems = {genders:[{name:'Hombre',id:0},{name:'Mujer',id:1}],times:[{name:'0 - 5 meses',id:0},{name:'6 - 11 meses',id:1},{name:'12 o más',id:2}],targets:[{name:'Aumentar masa',id:0},{name:'Tonificar',id:1},{name:'Bajar de peso',id:2}],places:[/*{name:'Casa',id:0},*/{name:'Gimnasio',id:1}],muscles:[]};
  public muscles = [
    [
      {name:'Pecho-Bíceps-Abdomen',id:0},
      {name:'Espalda-Tríceps-Abdomen',id:1},
      {name:'Muslos-Pantorrillas-Abdomen',id:2},
      //{name:'Pantorrillas-Abdomen',id:3},
      {name:'Hombros-Trapecio-Abdomen',id:4}
    ],[
      {name:'Pecho-Abdomen',id:0},
      {name:'Espalda-Abdomen',id:1},
      {name:'Bíceps-Tríceps-Abdomen',id:2},
      {name:'Hombros-Trapecio-Abdomen',id:3},
      {name:'Muslos-Pantorrillas-Abdomen',id:4}
    ],[
      {name:'Muslos-Pantorrillas-Abdomen',id:0},
      {name:'Pecho-Tríceps-Bíceps-Abdomen',id:0},
      {name:'Espalda-Hombros-Abdomen',id:0}
    ]
  ];
  public data = {gender:'',time:'',target:'',place:'',muscle:''};
  public groupA = '[ 3, 3, 4, 1, 2, 2, 4, 1, 2 ]';
  public groupB = '[ 4, 4, 4, 2, 3, 3, 4, 2, 2 ]';
  public groupC = '[ 5, 5, 5, 2, 4, 4, 5, 2, 2 ]';
  public groupD = '[ 3, 3, 4, 1, 2, 2, 3, 2 ]';
  public groupE = '[ 3, 3, 5, 1, 2, 2, 3, 2 ]';
  public index = ['Pecho','Espalda','Muslos','Pantorrillas','Bíceps','Tríceps','Hombros','Trapecio','Abdomen'];
  public group = [];
  public fullData = [];
  public pecho = [];
  public espalda = [];
  public muslo = [];
  public pantorrilla = [];
  public biceps = [];
  public triceps = [];
  public hombro = [];
  public trapecio = [];
  public abdomen = [];
  public list = [];
  public exercise = {gif: '', imagen: ''};
  public current = {id: '', tips: [], gif: ''};
  public currentIndex = 0;

  constructor(private http: Http) { };

  public getEjercicio(id: string) {
    let url = this.baseUrl + '/get-ejercicio';
    let params: URLSearchParams = new URLSearchParams();

    params.set('id', id);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public getEjercicesByMuscle(muscles: string) {
    let url = this.baseUrl + '/get-ejercicesByMuscle';
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
