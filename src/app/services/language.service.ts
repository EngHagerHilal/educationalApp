import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class LanguageService {
    selected ='';

    constructor(private translate: TranslateService ,
        @Inject(DOCUMENT) private document: Document) {
        console.log('constr',localStorage.getItem('LANGSTORAGE'))   
    }

    setInitialAppLanguage(){
        let language = this.translate.getBrowserLang();
        if(language == 'en' || language =='ar'){
        }else{
            language = 'en'
        }
        this.translate.setDefaultLang(language);
        this.selected = language;
        console.log('language defulte: ',language);
        if(localStorage.getItem('LANGSTORAGE')){
            this.setLanguage(localStorage.getItem('LANGSTORAGE'))
        }
    }

    setLanguage(lng){
        this.translate.use(lng);
        this.selected = lng;
        if(this.selected == 'en'){
            this.document.documentElement.dir = 'ltr'
        }else if (this.selected == 'ar'){
            this.document.documentElement.dir = 'rtl'
        }
        localStorage.setItem('LANGSTORAGE',lng)
        console.log('localStorage updated: ',localStorage.getItem('LANGSTORAGE'))
    }
}