import {Component, inject, signal} from '@angular/core';
import {DecimalPipe, NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from '@angular/router';
import {ApiService} from '../../shared/services/api/api.service';
import {Pokemon} from '../../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  imports: [
    DecimalPipe,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  private apiService = inject(ApiService);

  pokemonList = signal<Pokemon[]>([]);

  constructor() {
    this.loadPokemon();
  }

  loadPokemon(){
    this.apiService.getPokemon().subscribe({
      next:response => {
      const pokemon = response.results.map((p,index) => {
        return {
          id: index +1,
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
          type: []
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
}
