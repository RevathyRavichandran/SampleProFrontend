import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SocketComponent } from './socket/socket.component';
import { WebsocketComponent } from './websocket/websocket.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'xlsx',
    component: ListComponent,
  },
  {
    path: 'img',
    component: ListComponent,
  },
  {
    path: 'socket',
    component: SocketComponent
  },
  {
    path: 'websocket',
    component: WebsocketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
