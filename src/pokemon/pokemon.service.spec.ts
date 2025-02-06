import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios'; // Importamos el módulo HTTP si lo usamos

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule], // Importamos el HttpModule si lo necesitamos en las pruebas
      providers: [PokemonService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Aseguramos que el servicio esté definido
  });
});
