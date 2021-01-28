import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Id: string = "3-DMan"
  PUBLIC_KEY = 'b26341561f6a43482557ceb9a883472a';
  HASH = 'f8a57b9a123c4567652bebf90a2ff3b8';
  URL_API = `https:gateway.marvel.com/v1/public//characters?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http: HttpClient) { }

  getAllCharacters (): Observable<any>{
    return this.http.get<any>(this.URL_API)
      .pipe(map((data: any) => data.data.results))
  }
}
