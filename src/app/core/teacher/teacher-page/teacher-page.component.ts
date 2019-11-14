import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../teacher.service';
import { ToastrService } from 'src/app/toastr.service';
import { BatchService } from '../../batch/batch.service';
import { NgForm } from '@angular/forms';
import { back } from 'src/app/utilities';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent implements OnInit {
  id: string | number;
  teacher: any;
  batches: any[];
  roles: any[];
  isGettingDetails: boolean = false;
  isGettingBatches: boolean = false;
  isAddingRole: boolean = false;
  isGettingRoles: boolean = false;
  isRemovingRole: boolean = false;
  back = back;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private toastr: ToastrService,
    private batchService: BatchService
  ) { }

  ngOnInit() {
    this.isGettingDetails = true;
    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.teacherService.getTeacher(this.id)
          .subscribe(res => {
            this.teacher = res;
            this.isGettingDetails = false;
          }, err => {
            this.toastr.error('Failed to fetch teacher details.');
            this.isGettingDetails = false;
          });
      });
  }

  getBatches() {
    if (this.batches) return;
    this.isGettingBatches = true;
    this.batchService.getBatches()
      .subscribe(res => {
        this.batches = res.items;
        this.isGettingBatches = false;
      }, err => {
        this.toastr.error('Failed to load batches.');
        this.isGettingBatches = false;
      });
  }

  getRoles(force: boolean = false) {
    if (this.roles && !force) return;
    this.isGettingRoles = true;
    this.teacherService.getTeacherRoles(this.id)
      .subscribe(res => {
        this.roles = res;
        this.isGettingRoles = false;
      }, err => {
        this.toastr.error('Failed to get errors');
        this.isGettingRoles = false;
      });
  }

  addRole(form: NgForm) {
    this.isAddingRole = true;
    form.value.teacher = this.id;
    this.teacherService.addRole(form.value)
      .subscribe(res => {
        this.isAddingRole = false;
        this.toastr.success('Role added successfully.');
        this.getRoles(true);
        form.reset();
      }, err => {
        this.toastr.error('Failed to add role');
        this.isAddingRole = false;
      });
  }

  removeRole(id) {
    if (!window.confirm('Are ou sure you want to delete role?')) return;
    this.isRemovingRole = true;
    this.teacherService.removeRole(id)
    .subscribe(res => {
      this.toastr.success('Role removed.');
      const role = this.roles.find(val => +val.id === +id);
      const index = this.roles.indexOf(role);
      this.roles.splice(index, 1);
      this.isRemovingRole = false;
    }, err => {
      this.toastr.error('Failed to remove role.');
      this.isRemovingRole = false;
    });
  }

}
