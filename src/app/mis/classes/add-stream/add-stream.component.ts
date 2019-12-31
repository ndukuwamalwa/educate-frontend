import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Stream } from 'src/app/models/stream.model';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.scss']
})
export class AddStreamComponent implements OnChanges {
  @Input('isLoading') isLoading: boolean = false;
  @Input('data') data: Stream;
  @Input('title') title: string = "Add stream";
  @Output('submitted') submitted: EventEmitter<Stream> = new EventEmitter();
  streamForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-z ]+$/i)]],
    description: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.streamForm.setValue({
        name: this.data.name,
        description: this.data.description
      });
    }
  }

  save(stream: Stream) {
    this.submitted.emit(stream);
  }

}
