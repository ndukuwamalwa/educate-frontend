import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SmsService } from '../sms.service';
import { ToastrService } from 'src/app/toastr.service';
import { isValidKePhone } from 'src/app/utilities';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  isSending: boolean = false;
  @Input('type') type: string;

  constructor(
    private smsService: SmsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  send(f: NgForm) {
    this.isSending = true;
    let recipients: string[];
    if (this.type === "single") {
      recipients = [f.value.recipient];
    } else {
      recipients = f.value.recipient.split(",");
      recipients = recipients.map(v => v.trim());
    }
    for (let r of recipients) {
      if (!isValidKePhone(r)) {
        this.isSending = false;
        return this.toastr.error(`Invalid phone number: ${r}`)
      }
    }
    this.smsService.send(f.value.message, recipients)
      .subscribe(res => {
        this.isSending = false;
        this.toastr.success("Message sent successfully.");
        f.reset();
      }, e => {
        this.isSending = false;
        if (e.status === 422) return this.toastr.error(e.error.message);
        this.toastr.error("Error while sending message.");
      });
  }

}
