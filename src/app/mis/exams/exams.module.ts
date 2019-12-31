import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsComponent } from './exams/exams.component';
import { PortalModule } from 'src/app/portal/portal.module';
import { CustomElementsModule } from 'src/app/custom-elements/custom-elements.module';
import { AddExamComponent } from './add-exam/add-exam.component';
import { ExamsViewComponent } from './exams-view/exams-view.component';
import { ExamService } from './exam.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ExamDetailsComponent } from './exam-details/exam-details.component';
import { ResultsAddComponent } from './results-add/results-add.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { ResultsPrintComponent } from './results-print/results-print.component';
import { ReportCardsComponent } from './report-cards/report-cards.component';

@NgModule({
  declarations: [
    ExamsComponent, 
    AddExamComponent, 
    ExamsViewComponent, 
    ExamDetailsComponent, ResultsAddComponent, ResultsViewComponent, ResultsPrintComponent, ReportCardsComponent
  ],
  imports: [
    CommonModule,
    PortalModule,
    CustomElementsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule  
  ],
  exports: [
    ExamsComponent
  ],
  providers: [
    ExamService
  ],
  entryComponents: [
    ExamDetailsComponent
  ]
})
export class ExamsModule { }
