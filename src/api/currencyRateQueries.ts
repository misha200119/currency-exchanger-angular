import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// this adresses of API that i found, so difficult find smth free
// everywhere requires key that i take after registration and i have
// only 100 requests
const basePath = 'https://openexchangerates.org/api/latest.json?app_id=';
const APIKey = 'bc7251f168c2401d97e9f4201e162005';

// unlim queries from that api
const altFreeBaseURL = 'https://api.exchangerate.host/latest';

export const getLatestCourseBasedOnUSD = async () =>{
  const response = await fetch(altFreeBaseURL + '?base=USD');
  return response.json();
}


@Injectable({
  providedIn: 'root'
})
export class CurrencyRateQueries {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(altFreeBaseURL);
  }
}

