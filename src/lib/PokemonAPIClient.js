import axios from 'axios';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/';

class PokemonAPIClient {
  static getPokemonList(limit, offset) {
    return axios.get(`${POKEMON_API_URL}pokemon/`, {
      params: {
        limit,
        offset,
      }
    });
  }

  static getPokemonByID(id) {
    return axios.get(`${POKEMON_API_URL}pokemon/${id}/`);
  }

  static getPokemonsByType(type) {
    return axios.get(`${POKEMON_API_URL}type/${type}/`);
  }
}

export default PokemonAPIClient;