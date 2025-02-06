// src/pokemon/responsepokemons.ts

import { Pokemon } from './pokemon';

export class ResponsePokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
