import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private m_http: HttpClient) { }

  getTestEndpoint(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.m_http.get('/api/common/test').subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        err => {
          observer.error(err);
          observer.complete();
        }
      );
    });
  }
}
