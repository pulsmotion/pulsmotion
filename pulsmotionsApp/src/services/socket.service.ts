import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SocketService {
  private url = 'http://localhost:5000';
  private socket;

  // Get items observable
  get(): Observable<any> {
      let socketUrl = this.url;
      this.socket = io.connect(socketUrl);
      this.socket.on("connect", () => this.connect());
      this.socket.on("disconnect", () => this.disconnect());
      this.socket.on("error", (error: string) => {
          console.log(`ERROR: "${error}" (${socketUrl})`);
      });

      // Return observable which follows "create" and "remove" signals from socket stream
      return Observable.create((observer: any) => {
          this.socket.on("create", (item: any) => observer.next({ action: "create", item: item }) );
          this.socket.on("remove", (item: any) => observer.next({ action: "remove", item: item }) );
          return () => this.socket.close();
      });
  }

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('startup', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  private connect() {
        console.log(`Connected to `);

        // Request initial list when connected
        this.socket.emit("list");
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from `);
    }
}
