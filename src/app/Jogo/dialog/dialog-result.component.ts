import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameSharedService } from 'src/app/service/game-shared.service';

  @Component({
    selector: 'dialog-result',
    templateUrl: './dialog-result.component.html'
  })
  
  export class DialogComponent implements OnInit {

    winner: string;
    
    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data, public gameSharedService: GameSharedService) {}
    
     ngOnInit() {}
    
     onNoClick(): void {
      this.dialogRef.close();
     }

    close(){
      this.dialogRef.close(true);
    }

     newGame(){
      document.location.reload(true);
     }

  }
