import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon/pokemon.service'; // Asegúrate de que no esté duplicado
import { PokemonController } from './pokemon/pokemon.controller'; // Asegúrate de que no esté duplicado

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class AppModule {}

