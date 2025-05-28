import {Component, inject, signal} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from '@angular/router';
import {ApiService} from '../../shared/services/api/api.service';
import {Pokemon} from '../../shared/models/pokemon.model';
import {PokemonFavService} from '../../shared/services/pokemon-fav/pokemon-fav.service';

@Component({
  selector: 'app-pokemon',
  imports: [
    DecimalPipe,
    NgForOf,
    RouterLink,
    NgIf,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  private apiService = inject(ApiService);
  private favService = inject(PokemonFavService);

  pokemonList = signal<Pokemon[]>([]);
  favoritePokemons: Set<number> = new Set();

  constructor() {
    this.loadFavoritePokemon();
  }

  loadFavoritePokemon(){
    this.favService.getFavoritePokemon().subscribe({
      next: (pokemon:any[]) => {
        console.log('favorite from db', pokemon);
        if (pokemon.length > 0) {
            this.favoritePokemons = new Set(pokemon);
        }
        this.loadPokemon();
      }
    })
  }

  syncFavPokemon(){
    const updatePokemon = this.pokemonList().map(p => ({
      ...p,
      isFavorite: this.favoritePokemons.has(p.id)
    }));
    this.pokemonList.set(updatePokemon);
  }


  loadPokemon(){
    this.apiService.getPokemon().subscribe({
      next:response => {
      const pokemon = response.results.map((p,index) => {
        const id = index + 1;
        return {
          id: id,
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
          type: [],
          isFavorite: this.favoritePokemons.has(id)
        };
      });
      this.pokemonList.set(pokemon);

      pokemon.forEach((p,index) =>{
        this.apiService.getPokemonById(p.id).subscribe({
          next:(detail:any) =>{
            const typeUpdate = [...this.pokemonList()];
            typeUpdate[index].type = detail.types.map((t: { type: { name: string } })=> t.type.name);
            this.pokemonList.set(typeUpdate);
          }
        })
      })
    }, error: (err) => {
        console.log('failed to load pokemon', err);
      }
    });
  }

  loadGen(limit:number, offset:number){
    this.apiService.getPokemon(limit,offset).subscribe({
      next: response => {
        const pokemon = response.results.map((p,index) => {
          const id = offset + index + 1;
          return {
            id: id,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            type: [],
            isFavorite: this.favoritePokemons.has(id)
          };
        })
        this.pokemonList.set(pokemon);

        pokemon.forEach((p,index) =>{
          this.apiService.getPokemonById(p.id).subscribe({
            next:(detail:any) =>{
              const typeUpdate = [...this.pokemonList()];
              typeUpdate[index].type = detail.types.map((t: { type: { name: string } })=> t.type.name);
              this.pokemonList.set(typeUpdate);
            }
          })
        })
      },
      error: (err) => {
        console.log('failed to load pokemon', err);
      }
    })
  }

  toggleFavorite(pokemon: any) {
    this.favService.toggleFavorite(pokemon.id).subscribe({
      next:(result:{ isFavorite: boolean }) => {
        pokemon.isFavorite = result.isFavorite;
        if (pokemon.isFavorite) {
          this.favoritePokemons.add(pokemon.id);
        } else {
          this.favoritePokemons.delete(pokemon.id);
        }
        this.syncFavPokemon();
      }
    });


  }
}
