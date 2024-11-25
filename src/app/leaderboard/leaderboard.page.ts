import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  players: leaderboardItem[] = [];

  constructor(private api: GameApiService) {}

  async ngOnInit() {
    try {
      // Asegúrate de que la API devuelva una lista de jugadores con la estructura correcta
      const data = await this.api.leaderboard();
      if (Array.isArray(data)) {
        this.players = data.map(player => ({
          usuario: player.usuario,
          puntos: player.puntos,
          partidas_jugadas: player.partidas_jugadas,
        }));
      } else {
        console.error('La respuesta de la API no es un arreglo');
      }
    } catch (error) {
      console.error('Error al obtener los datos del leaderboard:', error);
    }
  }
}

interface leaderboardItem {
  usuario: string;
  puntos: number;
  partidas_jugadas: number;
}
