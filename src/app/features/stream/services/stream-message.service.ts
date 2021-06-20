import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {NewMessage} from '../../chat/models/new-message.model';
import {Message} from '../../chat/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class StreamMessageService {

  constructor(private readonly http: HttpClient) {
  }

  getAllMessages(streamId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/api/v1/streams/${streamId}/messages`);
  }

  addMessage(streamId: number, newMessage: NewMessage): Observable<Message> {
    return this.http.post<Message>(`${environment.apiUrl}/api/v1/streams/${streamId}/messages`, newMessage);
  }
}
