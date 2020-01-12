import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { SmsService } from '../sms.service';

@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrls: ['./view-messages.component.scss']
})
export class ViewMessagesComponent implements OnInit {
  messages: any[];
  isLoading: boolean = false;
  total: number;
  sorts: { key: string, label: string }[] = [
    {
      key: "sent",
      label: "Time sent"
    },
    {
      key: "message",
      label: "Message"
    },
    {
      key: "recipient",
      label: "Recipients"
    }
  ];

  constructor(
    private toastr: ToastrService,
    private smsService: SmsService
  ) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(options = {}) {
    this.isLoading = true;
    this.smsService.messages(options)
      .subscribe(res => {
        this.total = res.total;
        this.messages = res.items;
        this.isLoading = false;
      }, e => {
        this.isLoading = false;
        this.toastr.error("Failed to load messages.");
      });
  }

  onOptions(options) {
    this.getMessages(options);
  }

}
