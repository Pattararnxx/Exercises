import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {ApiService} from '../../shared/services/api/api.service';
import {Pokemon} from '../../shared/models/pokemon.model';

@Component({
  selector: 'app-about',
  imports: [
    NgIf,
    NgForOf,
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
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id') || 0);
      if (id) {
        if (this.pokemonList().length === 0) {
          this.loadPokemon(id);
        }
      }
    });
  }

  loadPokemon(showId: number) {
    this.apiService.getPokemonById(showId).subscribe({
      next: (detail: any) => {
        const pokemon = {
          id: detail.id,
          name: detail.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`,
          type: detail.types.map((t: { type: { name: string } }) => t.type.name)
        };

        this.pokemon.set(pokemon);
      },
      error: (err) => {
        console.log('failed to load pokemon', err);
        this.pokemon.set(null);
      }
    });
  }
}
