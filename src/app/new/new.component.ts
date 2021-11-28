import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AppService } from '../app.service';
import ImageCompressor from 'image-compressor.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  newForm = this.fb.group({
    uri: ['', Validators.required],
  });

  file: File = null;

  onSubmit() {
    console.log('file updated <<<< ', this.file);
    const fd = new FormData();
    console.log("file <<< ", localStorage.getItem("file"));
    fd.append('uri', this.file, this.file.name);
    let obs;
    if (this.data === 'xlsx') {
      obs = this.appService.uploadXls(fd);
    } else if (this.data === 'img') {
      obs = this.appService.uploadImg(fd);
    }
    obs.subscribe(
      (res) => {
        this.dialogRef.close(true);
      },
      (err) => {
        this.snackbar.open("File name already exists.", null, {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['.snackbar-style'],
        })
      }
    );
  }

  compressImage(fileVal) {
    new ImageCompressor(fileVal, {
      quality: 0,
      success(result) {
        console.log('compressed file', result);
        this.file = result;
      },
      error(e) {
        console.log("error << ", e);
      },
    });
  }

  onFilePicked(event) {
    let fileVal = <File>event.target.files[0];
    if (this.data === 'img' && fileVal.size > 50000) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '60%',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.compressImage(fileVal);
        } else {
          this.newForm.value.uri = "";
          this.snackbar.open("No compression is happened. Please upload a different file.", null, {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['.snackbar-style'],
          });
        }
      });
    } else {
      this.file = fileVal;
    }
    console.log('file', this.file);
  }

  get uri() {
    return this.newForm.get('uri');
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
