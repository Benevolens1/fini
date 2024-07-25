import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PeopleService } from './people.service';
import { ClientPersonDto } from './clientPersonDto.dto';

@WebSocketGateway({namespace: 'people'})
export class PeopleGateway {

  joinBid: string;

  @WebSocketServer() server: Server;

  constructor(
    private peopleService: PeopleService
  ) {
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

  @SubscribeMessage('createPerson')
  async handleCreatePerson(
    @MessageBody() clientPersonDto : ClientPersonDto
  ) {
    let person = await this.peopleService.createPerson(clientPersonDto, this.joinBid);
    this.server.to(this.joinBid).emit('createPerson', person);
  }

  @SubscribeMessage('deletePerson')
  async handleDeletePerson(
    @MessageBody() personId: string
  ) {
    await this.peopleService.removePerson(personId, this.joinBid);
    this.server.to(this.joinBid).emit('deletePerson', personId);
  }

}
