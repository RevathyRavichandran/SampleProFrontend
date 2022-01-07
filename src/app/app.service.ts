import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  dburl = '/api/';

  public listXls(): Observable<any> {
    return this.http.get<any>(this.dburl + 'xls/list');
  }

  public listImg(): Observable<any> {
    return this.http.get<any>(this.dburl + 'img/list');
  }

  public uploadXls(xls): Observable<any> {
    return this.http.post<any>(this.dburl + 'xls/upload', xls);
  }

  public uploadImg(img): Observable<any> {
    return this.http.post<any>(this.dburl + 'img/upload', img);
  }

  constructor(private http: HttpClient) {}
}
