import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments/payments.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AddPayComponent } from './add-pay/add-pay.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { PrintPaymentComponent } from './print-payment/print-payment.component';
import { AddChequePaymentComponent } from './add-cheque-payment/add-cheque-payment.component';
import { ViewChequePaymentComponent } from './view-cheque-payment/view-cheque-payment.component';
import { PrintChequePaymentComponent } from './print-cheque-payment/print-cheque-payment.component';
import { ReverseMpesaPaymentComponent } from './reverse-mpesa-payment/reverse-mpesa-payment.component';
import { PaymentService } from './payment.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BankslipDetailComponent } from './bankslip-detail/bankslip-detail.component';
import { ChequeDetailComponent } from './cheque-detail/cheque-detail.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    PaymentsComponent, 
    AddPayComponent, 
    ViewPaymentComponent, 
    PrintPaymentComponent, 
    AddChequePaymentComponent, 
    ViewChequePaymentComponent, 
    PrintChequePaymentComponent,
    ReverseMpesaPaymentComponent, 
    BankslipDetailComponent, 
    ChequeDetailComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    PaymentsComponent
  ],
  providers: [
    PaymentService
  ],
  entryComponents: [
    BankslipDetailComponent,
    ChequeDetailComponent
  ]
})
export class PaymentsModule { }
