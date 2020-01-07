import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../classes/class.service';
import { ToastrService } from 'src/app/toastr.service';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-assign-class',
  templateUrl: './assign-class.component.html',
  styleUrls: ['./assign-class.component.scss']
})
export class AssignClassComponent implements OnInit {
  streams: any[];
  currentYear: number = new Date().getFullYear();
  teachers: any[];
  classteachers: { stream: number, teacher: number }[] = [];
  assistants: { stream: number, teacher: number }[] = [];
  isGettingStreams: boolean = false;
  isGettingTeachers: boolean = false;
  isSaving: boolean = false;

  constructor(
    private classService: ClassService,
    private toastr: ToastrService,
    private teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.isGettingStreams = true;
    this.isGettingTeachers = true;
    this.classService.streams()
      .subscribe(res => {
        this.isGettingStreams = false;
        this.streams = res;
      }, e => {
        this.isGettingStreams = false;
        this.toastr.error("Failed to load streams");
      });
    this.teacherService.allActive()
      .subscribe(res => {
        this.teachers = res.map(t => {
          t.name = `${t.fname} ${t.lname}`;
          return t;
        });
        this.isGettingTeachers = false;
      }, e => {
        this.toastr.error("Failed to load teachers.");
        this.isGettingTeachers = false;
      });
  }

  checkClassTeacher(inp: HTMLSelectElement) {
    const stream = +inp.id.replace('teacher_', '');
    const teacher = +inp.value;
    if (this.assistants.find(s => s.teacher === teacher)) {
      this.toastr.warning("Assistant cannot be classteacher for another stream.");
      inp.value = "";
      return;
    }
    let index = this.classteachers.indexOf(this.classteachers.find(s => s.stream === stream));
    if (index >= 0) {
      this.classteachers.splice(index, 1);
    }
    if (this.classteachers.find(s => s.teacher === teacher)) {
      this.toastr.warning("Same teacher cannot be assigned to different classes.");
      inp.value = "";
      return;
    }
    this.classteachers.push({ stream, teacher });
  }

  checkAssistant(inp: HTMLSelectElement) {
    const stream = +inp.id.replace('assist_', '');
    let index = this.assistants.indexOf(this.assistants.find(s => s.stream === stream));
    if (index >= 0) {
      this.assistants.splice(index, 1);
    }
    if (inp.value === 'none') return;
    const teacher = +inp.value;
    if (this.classteachers.find(s => s.teacher === teacher)) {
      this.toastr.warning("Classteacher cannot be assistant for another stream.");
      inp.value = "";
      return;
    }
    if (this.assistants.find(s => s.teacher === teacher)) {
      this.toastr.warning("Same teacher cannot be assigned to different classes.");
      inp.value = "";
      return;
    }
    this.assistants.push({ stream, teacher });
  }

  save(year: number) {
    if (this.classteachers.length === 0 && this.assistants.length === 0) return;
    this.isSaving = true;
    const pack: { teacher: number, stream: number, role: string, year: number }[] = [];
    this.classteachers.forEach(t => {
      pack.push({
        teacher: t.teacher,
        stream: t.stream,
        role: 'CLASS TEACHER',
        year: +year
      });
    });
    this.assistants.forEach(t => {
      pack.push({
        teacher: t.teacher,
        stream: t.stream,
        role: 'ASSISTANT',
        year: +year
      });
    });
    this.teacherService.saveClassTeachers(pack)
      .subscribe(res => {
        this.isSaving = false;
        this.toastr.success("Saved successfully.");
      }, e => {
        this.isSaving = false;
        this.toastr.error("Failed to save class teachers.");
      });
  }

}
