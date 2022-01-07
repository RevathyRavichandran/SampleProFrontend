import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    // this.socketService.listen().subscribe(
    //   (data) => {
    //     console.log("data <<< ", data);
    //   }
    // )
  }

}
