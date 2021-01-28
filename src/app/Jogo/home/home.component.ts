import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog-result.component';
import { GameSharedService } from './../../service/game-shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  // Get from 'game-shared.service'
  selectedCharacters: any;

  squares: string[];
  xIsNext: boolean;
  winner: string;

  // Placar
  placar: Map<string, number> = new Map<string, number>();

  // Jogador atual
  jogadorAtual: string;

  constructor(private router:Router, public dialog: MatDialog, public gameSharedService: GameSharedService) {}

  ngOnInit() {
    this.gameSharedService.currentMessage.subscribe(message => this.selectedCharacters = message)
    this.selectedCharacters = this.selectedCharacters.toString().split(',');
    
    // inicializando placar
    this.placar.set(this.selectedCharacters[0], 0);
    this.placar.set(this.selectedCharacters[1], 0);
    
    // inicializar jogador atual
    this.xIsNext = true;
    this.jogadorAtual = this.xIsNext ? this.selectedCharacters[0] : this.selectedCharacters[1];

    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  // cada jogada
  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    // setando nome do jogador atual
    this.jogadorAtual = this.xIsNext ? this.selectedCharacters[0] : this.selectedCharacters[1];

    this.winner = this.calculateWinner();
    if (this.winner != null) {
      if (this.winner === "X") {
        this.placar.set(this.selectedCharacters[0], this.placar.get(this.selectedCharacters[0]) + 1);
      } else {
        this.placar.set(this.selectedCharacters[1], this.placar.get(this.selectedCharacters[1]) + 1);
      }
     
      console.log(this.placar)
      
      this.openDialog();
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  // dialog/modal de vitoria 
  openDialog() {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

      // setando vencedor para usar no dialog/modal
      if (this.winner === "X") {
        dialogConfig.data = {
          winner:this.selectedCharacters[0]
        };
      } else {
        dialogConfig.data = {
          winner:this.selectedCharacters[1]
        };
      }

        const dialogRef = this.dialog.open(DialogComponent,
            dialogConfig);


        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
        );
  }
  // rota
  navigateTojogo():void{
    this.router.navigate( [''] );
  }

}