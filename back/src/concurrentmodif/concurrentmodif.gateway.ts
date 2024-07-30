import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

@WebSocketGateway({ namespace: 'concurrentmodif' })
export class ConcurrentmodifGateway {

  joinBid: string;

  @WebSocketServer() server: Server;

  constructor() {
    this.joinBid = "";
  }


  @SubscribeMessage('boardId')
  handleFirstMessage(
    @MessageBody() boardId: string,
    @ConnectedSocket() client
  ) {
    this.joinBid = boardId;
    client.join(this.joinBid);
  }

  @SubscribeMessage('somebodyElseModifies')
  handleStartModification(
    @MessageBody() taskId: string
  ) {
    this.server.to(this.joinBid).emit('somebodyElseModifies', taskId);
  }

  @SubscribeMessage('somebodyElseStopsModification')
  handleStopModification(
    @MessageBody() taskId: string
  ) {
    this.server.to(this.joinBid).emit('somebodyElseStopsModification', taskId);
  }
}
