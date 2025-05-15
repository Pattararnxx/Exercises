import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {ApiService} from '../../shared/services/api/api.service';
import {Pokemon} from '../../shared/models/pokemon.model';

@Component({
  selector: 'app-about',
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  pokemonList = signal<Pokemon[]>([]);
  pokemon = signal<any>(null);

  constructor() {
    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id') || 0);
      if (id) {
        if (this.pokemonList().length === 0) {
          this.loadPokemon(id);
        } else {
          this.setPokemonById(id);
        }
      }
    });
  }

  loadPokemon(showId: number) {
    this.apiService.getPokemon().subscribe({
      next: response => {
        const pokemon = response.results.map((p, index) => {
          return {
            id: index + 1,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
            type: []
          };
        });
        this.pokemonList.set(pokemon);

        pokemon.forEach((p, index) => {
          this.apiService.getPokemonById(p.id).subscribe({
            next: (detail: any) => {
              const typeUpdate = [...this.pokemonList()];
              typeUpdate[index].type = detail.types.map((t: { type: { name: string } }) => t.type.name);
              this.pokemonList.set(typeUpdate);

              if (p.id === showId) {
                this.setPokemonById(showId);
              }
            }
          });
        });
        this.setPokemonById(showId);
      },
      error: (err) => {
        console.log('failed to load pokemon', err);
      }
    });
  }

  setPokemonById(id: number) {
    const poke = this.pokemonList().find(p => p.id === id);
    this.pokemon.set(poke || null);
  }
}
