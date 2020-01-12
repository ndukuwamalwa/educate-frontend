import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsComponent } from './sms/sms.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { SendMessageComponent } from './send-message/send-message.component';
import { ViewMessagesComponent } from './view-messages/view-messages.component';
import { SmsService } from './sms.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SmsComponent, SendMessageComponent, ViewMessagesComponent],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    FormsModule
  ],
  exports: [
    SmsComponent
  ],
  providers: [
    SmsService
  ]
})
export class SmsModule { }
