import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../models/response.model';
import {Pokemon, ResourceList} from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient);

  getPokemon(limit:number = 20, offset:number = 0){
    return this.httpClient.get<ApiResponse<ResourceList>>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }
  getPokemonById(id: number) {
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
