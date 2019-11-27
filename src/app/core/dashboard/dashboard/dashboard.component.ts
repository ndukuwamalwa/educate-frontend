import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'src/app/toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isGettingStats: boolean = false;
  stats: {
    students: {
      active: {
        total: number,
        male: number,
        female: number
      },
      archived: {
        total: number,
        male: number,
        female: number
      },
      all: {
        total: number,
        male: number,
        female: number
      },
      expelled: {
        total: number,
        male: number,
        female: number
      }
    },
    teachers: {
      all: {
        total: number,
        male: number,
        female: number
      },
      transferred: {
        total: number,
        male: number,
        female: number
      },
      retired: {
        total: number,
        male: number,
        female: number
      }
    },
    hr: {
      all: {
        total: number,
        male: number,
        female: number
      },
      transferred: {
        total: number,
        male: number,
        female: number
      },
      retired: {
        total: number,
        male: number,
        female: number
      }
    },
    finance: {
      all: {
        expected: number,
        paid: number,
        balance: number
      },
      active: {
        expected: number,
        paid: number,
        balance: number
      },
      payments: {
        count: number,
        average: number,
        breakdown: {
          day: number,
          week: number,
          month: number,
          year: number
        }
      }
    },
    classes: {
      total: number,
      average: number
    },
    subjects: {
      total: number,
      mostEnrolled: string,
      leastEnrolled: string,
      means: { subject: string, mean: number }[],
      enrollment: { subject: string, count: number }[]
    },
    exams: {
      total: number,
      completed: number,
      pending: number
    },
    hostels: {
      category: {
        total: number,
        gents: number,
        ladies: number
      },
      capacity: {
        total: number,
        deficiency: number
      }
    },
    attendance: {
      daily: {
        total: number,
        expected: number,
        absent: number
      },
      out: {
        suspended: number,
        leave: number
      }
    }
  };

  constructor(
    private dashService: DashboardService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isGettingStats = true;
    this.dashService.getStatistics()
      .subscribe(res => {
        this.stats = res;
        this.isGettingStats = false;
      }, err => {
        this.toastr.error("Failed to load data");
        this.isGettingStats = false;
      });
  }

}
