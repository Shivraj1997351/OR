import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _evntsURL = "http://localhost:3000/api/events"
  private _specialEventsURL = "http://localhost:3000/api/special"
  constructor(private http:HttpClient) { }

  getEvents(){
    return this.http.get<any>(this._evntsURL)
  }
  getSpecialEvents(){
    return this.http.get<any>(this._specialEventsURL)
  }
}
