import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// export const APIURL = 'https://foryouappleen.herokuapp.com/api/';
// export const IMGURL = 'https://reyadah.leen.com.eg/';

export const CONTACTUS_EMAIL_TO = 'admin.re@reyada.com';
export const POST_EMAIL_subject : string = "About Your Post On Elrawad App";

// export const SIZEOFRELOADING : number = 10;

export function headers(accessToken ?: string) {
  if(accessToken) {
    return {
      headers: new HttpHeaders({
        "x-access-token": accessToken,
        "content-type": "application/json",
      })
    }
  }else{
    return {}
  }
}

@Injectable()

export class ApisConstService {

  constructor() { }
  
}
