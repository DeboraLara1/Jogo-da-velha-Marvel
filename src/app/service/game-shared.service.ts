import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameSharedService {

  messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();
  
  constructor() { }

  setSelectedCharacters(selectedCharacters: any) {
    this.messageSource.next(selectedCharacters);
  }
}
