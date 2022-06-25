import {Injectable} from "@angular/core";
import { io, Socket } from "socket.io-client";
import endpoints from "../../environments/endpoints";

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socketIo: any

  constructor() {
  }

  public connect(query: Record<string, string>): void {
    this.socketIo = io(endpoints.socket.url, {
      transports: ["websocket"],
      query
    })
  }

  public emit<T>(event: string, data: T): void {
    this.socketIo.emit(event, data);
  }

  public subscribe<T>(event: string, callback: (data: T) => void): void {
    this.socketIo.on(event, callback)
  }

  public disconnect(): void {
    this.socketIo.disconnect();
  }
}
