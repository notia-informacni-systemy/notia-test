import { Component } from '@angular/core';
import { CommonService } from 'client/app/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public m_title = 'Notia test';
  public m_author = 'Notia';

  constructor(private m_commonService: CommonService) { }

  onButtonClicked() {
    this.m_commonService.getTestEndpoint().subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.error(err);
      }
    );
  }
}
