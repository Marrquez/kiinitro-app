import {Injectable, Inject, EventEmitter} from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token

@Injectable()
export class TranslateService {
  private _currentLang: string;
  public translatedText: string;
  private PLACEHOLDER = '%'; // our placeholder
  public onLangChanged: EventEmitter<string> = new EventEmitter<string>();
  private _defaultLang: string;
  private _fallback: boolean;
  public langs = [
    {name: 'English', key: 'en'},
    {name: 'Español', key: 'es'}
  ];

  public get currentLang() {
    return this._currentLang || this._defaultLang;
  }

  // inject our translations
  constructor(@Inject(TRANSLATIONS) private _translations: any) {
  }

  public setDefaultLang(lang: string) {
    this._defaultLang = lang; // set default lang
  }

  public enableFallback(enable: boolean) {
    this._fallback = enable; // enable or disable fallback language
  }

  public replace(word = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
    });

    return translation;
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;

    this.onLangChanged.emit(lang); // publish changes
  }

  private translate(key: string): string {
    let translation = key;

    // found in current language
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    // fallback disabled
    if (!this._fallback) {
      return translation;
    }

    // found in default language
    if (this._translations[this._defaultLang] && this._translations[this._defaultLang][key]) {
      return this._translations[this._defaultLang][key];
    }

    // not found
    return translation;
  }

  public instant(key: string, words?: string | string[]) { // add optional parameter
    const translation: string = this.translate(key);

    if (!words) {
      return translation;
    }
    return this.replace(translation, words); // call replace function
  }

  isCurrentLang(lang: string) {
    return lang === this.currentLang;
  }

  selectLang(lang: string) {
    // set default;
    this.use(lang);
    // this.refreshText(); // remove
  }

  refreshText() {
    this.translatedText = this.instant('hello world');
  }

  subscribeToLangChanged() {
    return this.onLangChanged.subscribe(x => this.refreshText());
  }
}
