import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

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
  pokemons = [
    { id: 1, name: 'Bulbasaur', type: ['Grass','Poison'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
    { id: 2, name: 'Ivysaur', type: ['Grass','Poison'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png' },
    { id: 3, name: 'Venusaur', type: ['Grass','Poison'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png' },
    { id: 4, name: 'Charmander', type: ['Fire'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' },
    { id: 5, name: 'Charmeleon', type: ['Fire'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png' },
    { id: 6, name: 'Charizard', type: ['Fire','Flying'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    { id: 7, name: 'Squirtle', type: ['Water'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png' },
    { id: 8, name: 'Wartortle', type: ['Water'], image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png' }
  ];

  pokemon: any;
  constructor(private route:ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.pokemon = this.pokemons.find(p => p.id === id);
  }
}
