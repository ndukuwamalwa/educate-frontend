import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/toastr.service';
import { SmsService } from '../sms.service';
import { ClassService } from '../../class/class.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {
  characters: number = 0;
  pages: number = 0;
  disableMessage: boolean = false;
  isSendingSMS: boolean = false;
  classes: Class[];
  isGettingSms: boolean = false;
  messages: any[];
  total: number;

  constructor(
    private toastr: ToastrService,
    private smsService: SmsService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.classService.getClasses()
      .subscribe(res => {
        this.classes = res.items;
      }, err => {
        this.toastr.error("Failed to load required resources. Module might not function as expected.");
      });
  }

  checkPressed(event: Event) {
    const keyCode = (event as any).which;
    if (((keyCode < 48) || (keyCode > 57))) {
      if (keyCode !== 44) {
        return event.preventDefault();
      }
    }
  }

  measureMessage(event: Event) {
    const text = (event.target as HTMLTextAreaElement).value;
    this.characters = text.length;
    this.pages = Math.ceil(this.characters / 60);
  }

  checkNumbers(tarea) {
    const numbers = (tarea.value as string).split(',');
    for (let num of numbers) {
      if (num.trim().length < 10) {
        this.disableMessage = true;
        return;
      }
    }
    this.disableMessage = false;
  }

  sendSMS(data) {
    const cat = data.cat.toLowerCase();
    const message = data.message;
    const onSuccess = () => {
      this.toastr.success("Message sent successfully.");
      this.isSendingSMS = false;
    };
    const onError = () => {
      this.toastr.error("Failed to send message.");
      this.isSendingSMS = false;
    };
    switch (cat) {
      case 'custom': {
        this.isSendingSMS = true;
        const recipients = data.recipients.split(',');
        this.smsService.sendCustom(message, recipients).subscribe(onSuccess, onError);
        break;
      }
      case 'teachers': {
        this.isSendingSMS = true;
        this.smsService.sendToTeachers(message).subscribe(onSuccess, onError);
        break;
      }
      case 'employees': {
        this.isSendingSMS = true;
        this.smsService.sendToEmployees(message).subscribe(onSuccess, onError);
        break;
      }
      case 'parents': {
        const group = data.group;
        this.isSendingSMS = true;
        this.smsService.sendToParents(message, group).subscribe(onSuccess, onError);
        break;
      }
      case 'students': {
        this.isSendingSMS = true;
        const group = data.group;
        this.smsService.sendToStudents(message, group).subscribe(onSuccess, onError);
        break;
      }
    }
    this.getMessages({}, true);
  }

  getMessages(options = {}, force: boolean = false) {
    if (this.messages && !force) return;
    this.isGettingSms = true;
    this.smsService.getPrevious(options)
      .subscribe(res => {
        this.total = res.total;
        this.messages = res.items;
        this.isGettingSms = false;
      }, err => {
        this.isSendingSMS = false;
        this.toastr.error("Failed to get previous messages.");
      });
  }

  onPaginationChange(options) {
    this.getMessages(options, true);
  }

}
