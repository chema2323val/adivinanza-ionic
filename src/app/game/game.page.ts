import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  numero: number = 0;
  mensaje: string = '';

  constructor(private api: GameApiService) {}

  ngOnInit() {}

  async onClickAdivinar() {
    if (this.numero < 1 || this.numero > 100) {
      this.mensaje = 'Por favor, ingresa un número entre 1 y 100.';
      return;
    }

    try {
      const response = await this.api.guess(this.numero);
      this.mensaje = response.message;
    } catch (error) {
      const err = error as { error?: { message?: string } }; // Hacemos un type assertion
      this.mensaje = err.error?.message || 'Ocurrió un error al intentar adivinar.';
    }
  }

  async onClickReiniciar() {
    try {
      await this.api.restart();
      this.mensaje = 'Juego reiniciado. ¡Intenta nuevamente!';
      this.numero = 0;
    } catch (error) {
      const err = error as { error?: { message?: string } }; // Hacemos un type assertion
      this.mensaje = err.error?.message || 'Ocurrió un error al intentar reiniciar el juego.';
    }
  }
}


