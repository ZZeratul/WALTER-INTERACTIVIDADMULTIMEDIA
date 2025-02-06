// src/pokemon/data.ts

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponsePokemons } from './responsepokemons';

@Injectable()
export class DataService {
  constructor(private readonly httpService: HttpService) {}

  // Método para obtener los Pokémon de la API
  getAllPokemons(): Observable<ResponsePokemons> {
    return this.httpService
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .pipe(
        map((response) => response.data)
      );
  }
}
