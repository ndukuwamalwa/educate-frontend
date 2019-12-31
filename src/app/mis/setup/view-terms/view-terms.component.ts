import { Component, OnInit } from '@angular/core';
import { SetupService } from '../setup.service';
import { ToastrService } from 'src/app/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { TermDetailsComponent } from '../term-details/term-details.component';
import { ConfirmComponent } from 'src/app/custom-elements/confirm/confirm.component';

@Component({
  selector: 'app-view-terms',
  templateUrl: './view-terms.component.html',
  styleUrls: ['./view-terms.component.scss']
})
export class ViewTermsComponent implements OnInit {
  sorts: { label: string, key: string }[] = [
    {
      label: "Name",
      key: "label"
    },
    {
      label: "Start date",
      key: "startDate"
    },
    {
      label: "End date",
      key: "endDate"
    },
    {
      label: "Year",
      key: "year"
    }
  ];
  total: number;
  isLoading: boolean = false;
  terms: any[];

  constructor(
    private setupService: SetupService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTerms({ sortBy: 'id', sort: -1 });
  }

  onOptions(options) {
    this.getTerms(options);
  }

  getTerms(options) {
    this.isLoading = true;
    this.setupService.terms(options)
      .subscribe(res => {
        this.isLoading = false;
        this.total = res.total;
        this.terms = res.items;
      }, e => {
        this.toastr.error("Failed to load data.");
      });
  }

  viewTerm(node: string, term) {
    if (node.toLowerCase() !== "td") return;
    const dialog = this.dialog.open(TermDetailsComponent, {
      width: "50%",
      height: "60%",
      data: term
    });
    dialog.afterClosed()
      .subscribe(d => {
        if (d) {
          this.terms.splice(this.terms.indexOf(term), 1, d);
        }
      });
  }

  delete(id) {
    const confirm = this.dialog.open(ConfirmComponent, {
      width: "400px",
      height: "150px",
      data: "Delete term?"
    });
    confirm.afterClosed()
      .subscribe(r => {
        if (r) {
          this.setupService.deleteTerm(id)
            .subscribe(res => {
              this.toastr.success("Term deleted successfully.");
              this.terms.splice(this.terms.indexOf(this.terms.find(t => +t.id === +id)), 1);
            }, e => {
              this.toastr.error("Failed to deleted term.");
            });
        }
      });
  }

}
