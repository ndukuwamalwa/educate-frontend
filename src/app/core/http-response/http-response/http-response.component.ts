import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-http-response',
  templateUrl: './http-response.component.html',
  styleUrls: ['./http-response.component.scss']
})
export class HttpResponseComponent implements OnChanges {
  @Input('error') error: HttpResponse<any>;
  http_422: boolean = false;
  http_409: boolean = false;
  http_400: boolean = false;
  http_200: boolean = false;
  http_201: boolean = false;
  http_500: boolean = false;
  http_501: boolean = false;

  constructor() { }

  ngOnChanges() {
    if (!this.error) {
      return;
    }
    const status = this.error.status;
    switch(status) {
      case 422: {
        this.http_422 = true;
        break;
      }
      case 409: {
        this.http_409 = true;
        break;
      }
      case 400: {
        this.http_400 = true;
        break;
      }
      case 200: {
        this.http_200 = true;
        break;
      }
      case 201: {
        this.http_201 = true;
        break;
      }
      case 500: {
        this.http_500 = true;
        break;
      }
      case 501: {
        this.http_501 = true;
        break;
      }
      default: {
        this.http_200 = true;
        this.error = null;
      }
    }
  }

}
