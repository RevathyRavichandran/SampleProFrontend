import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';
import { NewComponent } from '../new/new.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  upload = 'xlsx';
  displayedColumns: string[] = ['sno', 'name'];

  dataSource = new MatTableDataSource([]);

  uploadMethod() {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '80%',
      disableClose: true,
      data: this.upload,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.commonMethod();
      }
    });
  }

  commonMethod() {
    let obs;
    if (this.router.url === '/' || this.router.url === '/xlsx') {
      this.upload = 'xlsx';
      obs = this.appService.listXls();
    } else if (this.router.url === '/img') {
      this.upload = 'img';
      obs = this.appService.listImg();
    }
    obs.subscribe(
      (res) => {
        let data: any = res;
        data.forEach((_element, index) => {
          data[index].sno = index + 1;
        });
        this.dataSource = new MatTableDataSource(data);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.commonMethod();
  }
}
