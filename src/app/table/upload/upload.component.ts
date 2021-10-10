import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UploadService} from "../../shared/services/upload.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Output() refreshTable = new EventEmitter<boolean>();

  selectedFiles: FileList;
  message: string = '';

  constructor(private readonly uploadService: UploadService) {
  }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.uploadService.upload(this.selectedFiles[0]).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.refreshTable.emit(true);
        }
      },
      err => {
        this.message = err.body.message;
      });
    this.selectedFiles = undefined;
  }
}
