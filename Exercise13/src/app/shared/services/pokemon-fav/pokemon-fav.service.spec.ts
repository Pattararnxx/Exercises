import { TestBed } from '@angular/core/testing';

import { PokemonFavService } from './pokemon-fav.service';

describe('PokemonFavService', () => {
  let service: PokemonFavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
