import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service'; // Asegúrate de importar el servicio correctamente

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getAllPokemon() {
    return this.pokemonService.getPokemonData(); // Llamamos al servicio para obtener los datos
  }
}
