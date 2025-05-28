import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonFavService {
  #http = inject(HttpClient);

  getFavoritePokemon() {
   return this.#http.get<any[]>('http://localhost:3000/pokemon-fav').pipe(
     map(response => response.map(item => item.pokemon_id))
   );
  }

  toggleFavorite(pokemon_id: number) {
    return this.#http.post<{isFavorite: boolean}> (
      `http://localhost:3000/pokemon-fav`,
      {pokemon_id}
    );
  }
}
