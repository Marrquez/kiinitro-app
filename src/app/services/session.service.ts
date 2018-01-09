import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class SessionService {
  //private baseUrl = 'http://localhost:8080';
  private baseUrl = 'http://ec2-18-218-139-95.us-east-2.compute.amazonaws.com:4500';
  public filterCriteria = 'All';
  public homeExc = [];
  public dataItems = {
    genders:[{name:'Hombre',id:0},{name:'Mujer',id:1}],
    times:[{name:'0 - 5 meses',id:0},{name:'6 - 11 meses',id:1},{name:'12 o más',id:2}],
    targets:[{name:'Aumentar masa',id:0},{name:'Tonificar',id:1},{name:'Bajar de peso',id:2}],
    places:[{name:'Casa',id:0},{name:'Gimnasio',id:1}],
    muscles:[],
    bodyParts: [{ name: 'Tren superior', id: 1 }, { name: 'Tren inferior', id: 2 }, { name: 'Cuerpo completo', id: 3 }, { name: 'Abdominales', id: 4 },]
  };
  public bodyParts = [
    { name: 'Tren superior', id: 6 },
    { name: 'Tren inferior', id: 6 },
    { name: 'Cuerpo completo', id: 6 },
    { name: 'Abdominales', id: 6 },
  ];
  public muscles = [
    { name: 'Pecho', id: 6 },
    { name: 'Espalda', id: 2 },
    { name: 'Muslos', id: 4 },
    { name: 'Hombros', id: 3 },
    { name: 'Trapecio', id: 7 },
    { name: 'Bíceps', id: 1 },
    { name: 'Tríceps', id: 8 },
    { name: 'Pantorrillas', id: 5 },
    { name: 'Abdomen', id: 0 }
  ];
  public catalogItem = {place:'Gym', id:'', nombre: '', desc:'', int:'', img:'', pasos: []};
  public data = {gender:'',time:'',target:'',place:'',muscles:[],warm:false, bodyParts:[], bodyPart:''};
  public stretchData = {allMuscles: [
    { name: 'Abdomen', id: 0, valueName: 'Abdomen' },
    { name: 'Bíceps', id: 1, valueName: 'Biceps' },
    { name: 'Espalda', id: 2, valueName: 'Espalda' },
    { name: 'Hombros', id: 3, valueName: 'Hombros' },
    { name: 'Muslos', id: 4, valueName: 'Muslos' },
    { name: 'Pantorrillas', id: 5, valueName: 'Pantorrillas' },
    { name: 'Pecho', id: 6, valueName: 'Pecho' },
    { name: 'Trapecio', id: 7, valueName: 'Trapecio' },
    { name: 'Tríceps', id: 8, valueName: 'Triceps' }
  ], muscles: [], stretchSession: []};
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
  public currentIndex = -1;
  public currentCicle = 0;
  public warmExercises = [];
  public dictionary = [
    {
      type: 'Abdomen',
      excercises: [
        {id:35,name:'crunches_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/642x361_Sit-Ups_vs._Crunches_0.jpg'},
        {id:36,name:'planchas_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/plank.jpg'},
        {id:37,name:'crunches_invertidos_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Crunches+invertidos1.jpg'},
        {id:88,name:'bicicletas_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/BicicletasHombre.JPG'},
        {id:89,name:'tijeras_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/TijerasHombre.JPG'},
        {id:90,name:'sit_ups_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/sit-ups.JPG'},
        {id:91,name:'elevacion_de_piernas_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/ElevacionPiernas_Hombre.jpg'},
        {id:92,name:'elevacion_de_piernas_cadera_acostado_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Elevaci%C3%B3nCrunchesInvertidos_Hombre.JPG'},
        {id:93,name:'crunches_con_pies_juntos_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesPiesJuntos_Hombre.JPG'},
        {id:94,name:'crunches_con_elevacion_de_piernas_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesPiesElevados_Hombre.JPG'},
        {id:95,name:'crunches_laterales_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesLaterales_Hombre.JPG'},
        {id:96,name:'crunches_en_maquina_nombre',machines:[{"S":"maquina_especifica_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesEnMaquina_Hombre.jpg'},
        {id:97,name:'crunches_en_balon_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/CrunchesEnBalon_Hombre.JPG'},
        {id:98,name:'crunches_en_v_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Crunches+V_Hombre.JPG'},
        {id:99,name:'crunches_invertidos_en_banco_inclinado_nombre',machines:[{"S":"colchonera_banco_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Abs/Crunches+invertidos+inclinado_Hombre_GIF.jpg'},
        {id:35,name:'abdominales_basicas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/sit-ups.JPG'},
        {id:36,name:'abdominales_en_v_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/Crunches+V_Hombre.JPG'},
        {id:37,name:'abdominales_invertidas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/abs+invertidas.JPG'},
        {id:38,name:'bicicletas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/BicicletasHombre.JPG'},
        {id:39,name:'abdominales_laterales_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/CrunchesLaterales_Hombre.JPG'},
        {id:40,name:'abdominales_mariposa_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/CrunchesPiesJuntos_Hombre.JPG'},
        {id:41,name:'giro_ruso_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/GIro+Ruso.jpg'},
        {id:42,name:'planchas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/Planchas.JPG'},
        {id:43,name:'puentes_laterales_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/Puentes+laterales.JPG'},
        {id:44,name:'superman_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Abs/superman+en+cuadrupedia.JPG'}
      ]
    },
    {
      type: 'Bíceps',
      excercises: [
        {id:6,name:'flexion_codo_curl_nombre',machines:[{"S":"barra_z_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+barra+z.jpg'},
        {id:7,name:'predicador_nombre',machines:[{"S":"barra_recta_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/predicador.jpg'},
        {id:8,name:'concentrado_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl_biceps_concentrado_apoyo_muslo.jpg'},
        {id:9,name:'flexion_codo_martillo_nombre',machines:[{"S":"barra_romana_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/martillo+romana+variante.jpg'},
        {id:42,name:'flexion_codo_curl_nombre',machines:[{"S":"barra_recta_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/Curl+barra1.jpg'},
        {id:43,name:'flexion_codo_curl_nombre',machines:[{"S":"polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/polea+pie.jpg'},
        {id:44,name:'flexion_codo_curl_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+mancuernas+2+manos.png'},
        {id:45,name:'predicador_nombre',machines:[{"S":"barra_z_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/predicador.jpg'},
        {id:46,name:'predicador_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+banco+predicador+maquina.jpg'},
        {id:47,name:'predicador_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/curl+banco+predicador+mancuerna.gif'},
        {id:48,name:'flexion_codo_martillo_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/martillo.png'},
        {id:49,name:'flexion_codo_martillo_nombre',machines:[{"S":"polea_lazo_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Biceps/martillo+polea.jpg'},
      ]
    },
    {
      type: 'Calentamiento',
      excercises: [
        {id:45,name:'pies_rapidos_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Cardio/Pies+rapidos.JPG'},
        {id:46,name:'jumping_jacks_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Cardio/Jumping+Jacks.JPG'},
        {id:47,name:'elevacion_de_rodillas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Cardio/Elevacion+de+rodillas.JPG'},
        {id:48,name:'rotacion_de_brazos_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Cardio/rotacion+de+brazos.JPG'},
        {id:49,name:'rotacion_de_piernas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Cardio/RotacionPiernas.png'},
        {id:50,name:'saltos_alternos_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Cardio/SaltosAlternos.png'},
        {id:51,name:'trote_en_sitio_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Cardio/JogInPlace.JPG'},
        {id:1,name:'tren_inferior_caminadora_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Gym/treadmill.jpg'},
        {id:2,name:'tren_inferior_eliptica_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Gym/eliptica.jpg'},
        {id:3,name:'tren_inferior_escaladora_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Gym/escaleras.png'},
        {id:4,name:'tren_inferior_bicicleta_estatica_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Gym/Bici-est%C3%A1tica_uni.jpg'}
      ]
    },
    {
      type: 'Cuerpo completo',
      excercises: [
        {id:25,name:'burpee_sin_flexion_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/Burpee.JPG'},
        {id:26,name:'saltos_laterales_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/saltos+laterales.JPG'},
        {id:27,name:'cuatro_en_uno_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/CuatroenUno.png'},
        {id:28,name:'escaladores_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/escaladores.JPG'},
        {id:29,name:'guerrero_a_una_pierna_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/GuerreroUnaPierna.png'},
        {id:30,name:'paso_de_oso_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/Paso+de+oso.JPG'},
        {id:31,name:'saltos_con_pausa_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/Saltos+con+pausa.JPG'},
        {id:32,name:'paso_isometrico_lateral_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/Sentadilla+isometrica+lateral.JPG'},
        {id:33,name:'burpee_con_flexion_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/burpee+flexion.JPG'},
        {id:34,name:'orugas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Full+Body/Orugas.png'},
      ]
    },
    {
      type: 'Espalda',
      excercises: [
        {id:10,name:'dominadas_nombre',machines:[{"S":"barra_fija_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/dominadas.jpg'},
        {id:11,name:'jalon_frontal_abierto_nombre',machines:[{"S":"maquina_de_polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/espalda_jalones-frente_01.jpg'},
        {id:12,name:'jalon_frontal_cerrado_agarre_neutro_nombre',machines:[{"S":"maquina_de_polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/jalon+frontal+cerrado.png'},
        {id:13,name:'remo_mancuerna_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+barra.png'},
        {id:14,name:'remo_polea_bajo_barra_v_nombre',machines:[{"S":"maquina_de_polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+bajo+polea.jpg'},
        {id:50,name:'dominadas_asistidas_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/DominadasAsistidasHombre.jpg'},
        {id:51,name:'jalon_frontal_abierto_nombre',machines:[{"S":"maquina_hammer_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/Jalon+Frontal+Abierto+Hammer.jpg'},
        {id:52,name:'jalon_frontal_cerrado_supino_nombre',machines:[{"S":"maquina_de_polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/JalonFrontalCerradoSupinoHombre.jpg'},
        {id:53,name:'remo_barra_supino_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+barra.png'},
        {id:54,name:'remo_barra_prono_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/remo+barra.png'},
        {id:55,name:'remo_polea_bajo_supino_nombre',machines:[{"S":"maquina_de_polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBajoPoleaSupinoHombre.jpg'},
        {id:56,name:'remo_polea_bajo_prono_nombre',machines:[{"S":"maquina_de_polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBajoPoleaPronoHombre.jpg'},
        {id:57,name:'remo_anclado_nombre',machines:[{"S":"maquina_de_polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoAncladoHombre.jpg'},
        {id:58,name:'remo_barra_t_neutro_nombre',machines:[{"S":"barra_recta_con_barra_v_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBarraTHombre.gif'},
        {id:59,name:'remo_barra_t_maquina_nombre',machines:[{"S":"maquina_t_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Back/RemoBarraTM%C3%A1quinaHombre.jpg'},
      ]
    },
    {
      type: 'Hombros',
      excercises: [
        {id:19,name:'press_frontal_nombre',machines:[{"S":"barra_equipamiento"}, {"S":"maquina_smith_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/press+frontal.jpg'},
        {id:20,name:'press_hombro_nombre',machines:[{"S":"mancuernas_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/press+mancuerna.jpg'},
        {id:21,name:'elevaciones_frontales_polea_nombre',machines:[{"S":"polea_lazo_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/elevacion+frontal.jpg'},
        {id:22,name:'elevaciones_laterales_mancuerna_nombre',machines:[{"S":"mancuernas_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/elevaciones+laterales.jpg'},
        {id:23,name:'peck_deck_invertido_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/peck+deck+invertido.jpg'},
        {id:24,name:'press_arnold_nombre',machines:[{"S":"mancuernas_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/press+arnold.jpg'},
        {id:66,name:'press_frontal_nombre',machines:[{"S":"maquina_smith_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/Smith_Machine_Shoulder_Press_Hombre.png'},
        {id:67,name:'elevaciones_frontales_mancuerna_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/Alternating-dumbbell-front-raise.jpg'},
        {id:68,name:'elevaciones_frontales_barra_nombre',machines:[{"S":"mancuernas_equipamiento"}, {"S":"polea_lazo_equipamiento"}, {"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/Barbell-front-raises-1_Hombre.png'},
        {id:69,name:'elevaciones_laterales_maquina_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/elevaciones+laterales+maquina+hombre.jpg'},
        {id:70,name:'elevaciones_posteriores_mancuerna_nombre',machines:[{"S":"mancuernas_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/standing-bent-over-rear-lateral.jpg'},
        {id:71,name:'elevaciones_laterales_unilateral_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/Elevacion+lateral+polea_hombre.jpg'},
        {id:72,name:'elevaciones_frontales_polea_unilateral_nombre',machines:[{"S":"mancuernas_equipamiento"}, {"S":"polea_lazo_equipamiento"}, {"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/Elevacion+frontal+unilateral+polea_hombre.jpg'},
        {id:100,name:'face_pull_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Shoulders/face-pull_GIF.jpg'},
      ]
    },
    {
      type: 'Muslos',
      excercises: [
        {id:27,name:'sentadilla_libre_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/1200px-Squats.svg.png'},
        {id:28,name:'prensa_inclinada_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/prensa+inclinada.jpg'},
        {id:29,name:'extension_de_rodilla_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/extension+de+rodilla.jpg'},
        {id:30,name:'flexion_de_rodilla_acostado_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/lying-leg-curl_Hombre.jpg'},
        {id:31,name:'peso_muerto_barra_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/romanian%2Bdeadlift.jpg'},
        {id:32,name:'zancadas_nombre',machines:[{"S":"barra_equipamiento"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/lunges-1.png'},
        {id:73,name:'sentadilla_smith_nombre',machines:[{"S":"maquina_smith_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/Squat_Smith_Hombre.png'},
        {id:74,name:'flexion_de_rodilla_sentado_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/lying-leg-curl_Hombre.jpg'},
        {id:75,name:'flexion_de_rodilla_unipodal_nombre',machines:[{"S":"maquina_unipodal_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/standing-leg-curl-1.png'},
        {id:76,name:'peso_muerto_mancuerna_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/dumbbell_romanian_deadlift_pos_b.jpg'},
        {id:77,name:'peso_muerto_mancuerna_unipodal_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/Dumbell-Deadlift_Single_Hombre.JPG'},
        {id:78,name:'zancadas_mancuerna_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/Dumbbell-Lunge-2.png'},
        {id:79,name:'zancadas_mancuerna_en_banco_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/zancada+una+pierna+en+banco_Hombre.JPG'},
        {id:80,name:'zancadas_barra_en_banco_nombre',machines:[{"S":"barra_equipamiento"},{"S":"banco_plano_step_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/zancada+una+pierna+en+banco+barra_Mujer.jpg'},
        {id:81,name:'zancadas_en_smith_nombre',machines:[{"S":"maquina_smith_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/zancada+una+pierna+Smith_Mujer1.jpg'},
        {id:82,name:'zancadas_en_smith_con_banco_nombre',machines:[{"S":"maquina_smith_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/zancada+una+pierna+Smith+en+banco_Mujer.jpg'},
        {id:83,name:'sentadilla_frontal_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/sentadillafrontalHombre.JPG'},
        {id:84,name:'prensa_horizontal_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/seated-leg-press-action.jpg'},
        {id:85,name:'sentadilla_hack_nombre',machines:[{"S":"maquina_hack"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/hack+squat+Hombre2.jpg'},
        {id:87,name:'elevacion_de_cadera_con_peso_nombre',machines:[{"S":"barra_equipamiento"},{"S":"maquina_smith_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Legs/ElevacionesCaderaPeso_Hombre.jpg'},
      ]
    },
    {
      type: 'Pantorrillas',
      excercises: [
        {id:33,name:'elevacion_talones_sentado_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Calves/elevacion+talones+sentado.jpg'},
        {id:34,name:'elevacion_talones_de_pie_nombre',machines:[{"S":"maquina_equipamiento"},{"S":"maquina_smith_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Calves/elevacion+talones+pie.jpg'},
      ]
    },
    {
      type: 'Pecho',
      excercises: [
        {id:1,name:'press_inclinado_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/Inclinado+mancuerna.jpg'},
        {id:2,name:'press_plano_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/plano+resized.jpeg'},
        {id:3,name:'press_declinado_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/press-declinado1.png'},
        {id:4,name:'pull_over_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/pull+over+resized.jpeg'},
        {id:5,name:'peck_deck_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/Butterfly_M_WorkoutLabs.png'},
        {id:38,name:'press_inclinado_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/Press+inclinado+barra.jpg'},
        {id:39,name:'press_plano_nombre',machines:[{"S":"mancuernas_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/press+plano+mancuerna.jpg'},
        {id:40,name:'press_declinado_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/Press+declinado+mancuerna.jpg'},
        {id:41,name:'aperturas_en_banco_inclinado_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/apertura+inclinada++mancuerna.jpg'},
        {id:86,name:'flexiones_de_pecho_nombre',machines:[{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Chest/Flexiones+de+Pecho_Hombre.JPG'},
      ]
    },
    {
      type: 'Trapecio',
      excercises: [
        {id:25,name:'encogimientos_nombre',machines:[{"S":"maquina_equipamiento"},{"S":"mancuernas_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Traps/encogimientos.jpg'},
        {id:26,name:'remo_erguido_nombre',machines:[{"S":"mancuernas_equipamiento"},{"S":"barra_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Traps/remo+erguido.jpg'},
      ]
    },
    {
      type: 'Tren superior',
      excercises: [
        {id:5,name:'flexiones_de_pecho_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/Flexiones+de+Pecho_Hombre.JPG'},
        {id:6,name:'remo_a_dos_manos_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/remo.jpg'},
        {id:7,name:'flexiones_diamante_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/Flexiones+Diamante_Hombre.JPG'},
        {id:8,name:'extensiones_en_base_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/Triceps+extension+mesa.jpg'},
        {id:9,name:'curl_biceps_con_peso_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/Curl+biceps.jpg'},
        {id:10,name:'press_hombro_con_peso_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/Press+hombro.jpg'},
        {id:11,name:'elevaciones_laterales_con_peso_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/Elevaciones+laterales.JPG'},
        {id:12,name:'extensiones_de_codo_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/ExtensionCodo.JPG'},
        {id:13,name:'dominadas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/dominadas.jpg'},
        {id:14,name:'escalado_de_pared_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Upper+Body/EscaladoPared.png'},
      ]
    },
    {
      type: 'Tren inferior',
      excercises: [
        {id:15,name:'sentadilla_con_salto_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/Sentadilla+con+salto.JPG'},
        {id:16,name:'sentadilla_isometrica_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/Sentadilla+isometrica.JPG'},
        {id:17,name:'elevaciones_de_cadera_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/elevaciones+de+cadera.JPG'},
        {id:18,name:'zancadas_alternas_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/Zaancadas+alternas.JPG'},
        {id:19,name:'sentadilla_sumo_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/sentadilla+sumo.JPG'},
        {id:20,name:'peso_muerto_a_una_pierna_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/Peso+muerto+una+pierna.JPG'},
        {id:21,name:'sentadilla_bulgara_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/sentadilla+bulgara.JPG'},
        {id:22,name:'zancadas_laterales_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/zancada+lateral.JPG'},
        {id:23,name:'patada_de_caballo_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/patada+de+caballo.JPG'},
        {id:24,name:'elevacion_de_talones_nombre',machines:[{"S":"body_height"}],place: 'casa_sitio', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Cardio/Home/Lower+Body/elevacion+talones.JPG'},
      ]
    },
    {
      type: 'Tríceps',
      excercises: [
        {id:15,name:'extension_codos_sentado_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/copa_mancuerna_hombre.png'},
        {id:16,name:'extension_codos_acostado_nombre',machines:[{"S":"mancuerna_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/Press+frances+mancuerna+hombre.jpg'},
        {id:17,name:'push_down_nombre',machines:[{"S":"polea_lazo_barra_recta_o_barra_v_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/cable-tricep-pushdowns.jpg'},
        {id:18,name:'extension_codo_nombre',machines:[{"S":"mancuerna_equipamiento"},{"S":"polea_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/extension+codo.jpg'},
        {id:60,name:'extension_codos_sentado_nombre',machines:[{"S":"barra_z_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/Copa_Barra_Hombre1.jpg'},
        {id:61,name:'extension_codos_acostado_nombre',machines:[{"S":"barra_z_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/press+frances+barra+hombre.jpg'},
        {id:62,name:'fondos_libres_nombre',machines:[{"S":"maquina_libre_barras_paralelas_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/fondos_libre_hombre.jpg'},
        {id:63,name:'fondos_asistidos_nombre',machines:[{"S":"maquina_asistida_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/fondos_asistidos_hombre.jpg'},
        {id:64,name:'fondos_en_bancos_nombre',machines:[{"S":"bancos_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/fondos_banco_hombre.jpg'},
        {id:65,name:'fondos_maquina_nombre',machines:[{"S":"maquina_equipamiento"}],place: 'Gym', img:'https://s3.us-east-2.amazonaws.com/otraprueba/Images/Men/Triceps/fondos_maquina_hombre.jpg'},
      ]
    },
  ];

  constructor(private http: Http) { };

  public getEjercicio(id: string, place:string) {
    let url = this.baseUrl + '/get-ejercicioById';
    let params: URLSearchParams = new URLSearchParams();

    params.set('id', id);
    params.set('place', place);

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

  public getHomeEjercices(place: string, trainingType: string, trainingZone: string) {
    let url = this.baseUrl + '/get-warmUpByPlaceTypeZone';
    let params: URLSearchParams = new URLSearchParams();

    params.set('place', place);
    params.set('trainingType', trainingType);
    params.set('corporalZone', trainingZone);

    return this.http.get(url, { params: params })
      .toPromise()
      .then(this.extractData)
      .then(response => response);
  };

  public getWarmByPlace(place: string, type: string) {
    let url = this.baseUrl + '/get-warmUpByPlaceType';
    let params: URLSearchParams = new URLSearchParams();

    params.set('place', place);
    params.set('trainingType', type);

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
