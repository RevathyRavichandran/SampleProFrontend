import { Injectable, EventEmitter } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as bcrypt from 'bcryptjs';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private subject: WebSocketSubject<any>;
  public receiveMessage = new EventEmitter();
  private USERNAME = "ravicme";
  private PASSWORD = "lam123";

  constructor(private cookieService:CookieService) {}

  connect(sessionId) {
    // let token = bcrypt.hashSync("Basic " + btoa(this.USERNAME + ":" + this.PASSWORD), 10);
    let token = "Authorization: Basic " + btoa(bcrypt.hashSync(this.USERNAME + ":" + this.PASSWORD, 10));
    console.log('token <<< ', token);
    this.cookieService.put("token", token);
    this.subject = webSocket({
      url: `ws://localhost:8080/v1/eim/analytics/traceplot/${sessionId}`,
      openObserver: {
        next: () => {
            console.log('connexion ok');
        }
      },
      closeObserver: {
        next: () => {
            console.log('disconnect ok');
        }
      },
    });
    this.subject.subscribe(
      msg => {
        console.log('msg <<<< ', msg);
        this.receiveMessage.emit(msg)
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  public send(msg: string) {
    this.subject.next(msg);
  }

  public disconnect() {
    this.subject.complete();
  }
}
