import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, observable } from 'rxjs';
import { ApiService } from '../service/api-marvel.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from '../alert';
import { Router } from '@angular/router';
import { GameSharedService } from './../service/game-shared.service';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})

export class PersonagemComponent implements OnInit {

  // API
  allCharacters: any;
  personagens = []

  // Player 1
  personagemEscolhido: any;
  thumbnail: string;

  // Player 2
  personagemEscolhido2: any;
  thumbnail2: string;

  // Alert
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  // Form
  visible = true;
  selected = true;
  removable = true;
  addOnBlur = true;
  myForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private router:Router, private apiService: ApiService, public fb: FormBuilder, public alertService: AlertService, public gameSharedService: GameSharedService) {}

  ngOnInit(): void {
    this.getCharacters();
    this.reactiveForm();
  }

  // API
  getCharacters() {
    this.allCharacters = this.apiService.getAllCharacters().subscribe(character => {
      this.personagens.push(character);
   });
  }

  /* Reactive form */
  reactiveForm() {
    this.myForm = this.fb.group({
      namePlayer1: ['', [Validators.required]],
      namePlayer2: ['', [Validators.required]]
    })
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm1() {
    // player 1
    this.personagemEscolhido = this.personagens[0].filter(p => p.name === this.myForm.value.namePlayer1 && p.name !== this.myForm.value.namePlayer2 )

    if(this.personagemEscolhido[0] != undefined) {
      this.thumbnail = this.personagemEscolhido[0].thumbnail.path + '.' + this.personagemEscolhido[0].thumbnail.extension

      // console.log(this.personagemEscolhido[0])
      // console.log(this.id)
      // console.log(this.thumbnail)

    } else {
      this.alertService.error('Erro teste', this.options);

    }
  }

  submitForm2() {
    // player 2
    this.personagemEscolhido2 = this.personagens[0].filter(p => p.name !== this.myForm.value.namePlayer1 && p.name === this.myForm.value.namePlayer2 )

    if(this.personagemEscolhido2[0] != undefined) {
      this.thumbnail = this.personagemEscolhido2[0].thumbnail.path + '.' + this.personagemEscolhido2[0].thumbnail.extension

      // console.log(this.personagemEscolhido2[0])
      // console.log(this.id)
      // console.log(this.thumbnail)
      // console.log(this.id + " " + this.id2)

    } else if (this.myForm.value.namePlayer1 === this.myForm.value.namePlayer2) {
      this.alertService.error('Personagem já escolhido, tente novamente!', this.options);
    } else {
      this.alertService.error('Personagem indisponível, tente novamente!', this.options);
    }
  }
    // rota
  navigateTojogo():void{
    var selectedCharacters = []

    if (this.personagemEscolhido != undefined) {
      selectedCharacters.push(this.personagemEscolhido[0].name);
    }
    if (this.personagemEscolhido2 != undefined) {
      selectedCharacters.push(this.personagemEscolhido2[0].name);
    }
    
    this.gameSharedService.setSelectedCharacters(selectedCharacters);

    if (selectedCharacters.length == 2) {
      this.router.navigate( ['/jogo'] );
    } else {
      this.alertService.error('Personagens ainda não escolhidos!', this.options);
    }
  }

}