import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import PokemonItem from '../PokemonItem';
import { extractIDFromPokemonUrl } from '../../lib/utils';

class PokemonList extends React.Component {
  render() {
    const { pokemons, onItemClick } = this.props;

    return (
      <Grid container spacing={24}>
        {pokemons.map(pokemon => (
          <Grid key={pokemon.name} xs={12} sm={6} md={4} item>
            <PokemonItem
              id={extractIDFromPokemonUrl(pokemon.url)}
              onItemClick={onItemClick}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

PokemonList.propTypes = {
  pokemons: PropTypes.array,
  onItemClick: PropTypes.func,
};

export default PokemonList;
