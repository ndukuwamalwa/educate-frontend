import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as xlsx from "xlsx";
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-students-import',
  templateUrl: './students-import.component.html',
  styleUrls: ['./students-import.component.scss']
})
export class StudentsImportComponent implements OnInit {
  @Input('isLoading') isLoading: boolean = false;
  @Output("onImported") onImported: EventEmitter<Student[]> = new EventEmitter();
  processingFile: boolean = false;
  students: Student[];
  columns: { key: string, label: string }[] = [
    {
      label: "Adm",
      key: "adm"
    },
    {
      label: "First name",
      key: "fname"
    },
    {
      label: "Middle name",
      key: "mname"
    },
    {
      label: "Last name",
      key: "lname"
    },
    {
      label: "Admitted",
      key: "admitted"
    },
    {
      label: "Gender",
      key: "gender"
    },
    {
      label: "County",
      key: "county"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  processUploadedTemplate(inp: HTMLInputElement) {
    const template = inp.files[0];
    if (!template) return;
    this.processingFile = true;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = xlsx.read(e.target['result'], { type: "buffer" });
      const sheet = data.Sheets.Sheet1;
      if (!sheet) return alert("The file was not filled appropriately or is corrupt.");
      const students: any[] = [];
      let count = 1;
      while (sheet[`A${count}`] !== undefined) {
        let admitted = sheet[`B${count}`].w.split('/');
        let dob = sheet[`F${count}`].w.split('/');
        let student: any = {
          adm: sheet[`A${count}`].w,
          admitted: `${admitted[2]}-${admitted[1]}-${admitted[0]}`,
          fname: sheet[`C${count}`].w,
          lname: sheet[`E${count}`].w,
          dob: `${dob[2]}-${dob[1]}-${dob[0]}`,
          gender: sheet[`G${count}`].w,
          county: sheet[`H${count}`].w,
        };
        if (sheet[`D${count}`] && sheet[`D${count}`].w) {
          student.mname = sheet[`D${count}`].w;
        } else {
          student.mname = "";
        }
        students.push(student);
        count++;
      }
      this.students = students;
      this.processingFile = false;
    };
    reader.readAsArrayBuffer(template);
  }

  onAdd() {
    this.onImported.emit(this.students);
  }
}
