import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIResponse} from '../../interfaces/api-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: []
})
export class HomeComponent implements OnInit {
  constructor(private m_http: HttpClient) {}

  ngOnInit() {
    this.m_http.get('/api/test').subscribe(
      (data: APIResponse) => {
        console.log(data);
      }, err => {
        console.error(err);
      }
    );
  }
}
