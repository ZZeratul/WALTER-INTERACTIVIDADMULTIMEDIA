import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Asegúrate de importar el servicio Http

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  getPokemonData() {
    return this.httpService.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .toPromise(); // Realizamos una petición GET a la API de Pokémon
  }
}
