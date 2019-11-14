import { Injectable } from '@angular/core';

declare const toastr;

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  clear(e, t?) {
    toastr.clear(e, t);
  }

  error(e, t?, n?) {
    toastr.error(e, t, n);
  }

  getContainer(t, n?) {
    toastr.getContainer(t, n);
  }

  info(e, t?, n?) {
    toastr.info(e, t, n);
  }

  subscribe(e) {
    toastr.subscribe(e);
  }

  success(e, t?, n?) {
    toastr.success(e, t, n);
  }
  warning(e, t?, n?) {
    toastr.warning(e, t, n);
  }

}
