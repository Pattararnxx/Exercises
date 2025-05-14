import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    DecimalPipe,
    NgForOf,
    RouterLink,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
}
