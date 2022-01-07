import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent implements OnInit {

  area = '';
  disabled = false;
  message = '';
  requestid = '';

  constructor(private ss: SocketService) { }

  ngOnInit(): void {
    this.ss.receiveMessage.subscribe(event => {
      this.area += event + "\n";
    });
  }

  onConnectClick() {
    this.ss.connect(this.requestid);
  }

  onDisconnectClick() {
    this.ss.disconnect();
  }

  onSendClick() {
    this.ss.send(this.message);
  }

}
