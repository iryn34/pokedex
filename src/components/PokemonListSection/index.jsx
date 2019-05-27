import React from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import PokemonList from '../PokemonList';
import LoadMoreButton from '../LoadMoreButton';
import PokemonSearch from '../PokemonSearch';
import PokemonAPIClient from '../../lib/PokemonAPIClient';
import { extractIDFromPokemonUrl } from '../../lib/utils';

const DEFAULT_LIMIT = 12;

class PokemonListSection extends React.Component {
  state = {
    pokemons: [],
    offset: 0,
    isButtonDisabled: false,
    openSnackbar: false,
  };

  filteredPokemons = undefined;

  componentDidMount() {
    PokemonAPIClient.getPokemonList(DEFAULT_LIMIT, this.state.offset)
      .then(response => (
        this.setState(state => ({
          pokemons: response.data.results,
          offset: state.offset + DEFAULT_LIMIT,
        }))
      ));
  }

  handleLoadMoreClick = () => {
    if (this.filteredPokemons) {
      this.setState(state => ({
        pokemons: [
          ...state.pokemons, 
          ...this.filteredPokemons.slice(state.offset, state.offset + DEFAULT_LIMIT)
        ],
        offset: state.offset + DEFAULT_LIMIT,
        isButtonDisabled: state.offset + DEFAULT_LIMIT > this.filteredPokemons.length,
      }));
    } else {
      PokemonAPIClient.getPokemonList(DEFAULT_LIMIT, this.state.offset)
      .then(response => (
        this.setState(state => ({
          pokemons: [...state.pokemons, ...response.data.results],
          offset: state.offset + DEFAULT_LIMIT,
          isButtonDisabled: state.offset + DEFAULT_LIMIT > response.data.count,
        }))
      ));
    }
  }

  handleSearchClick = type => {
    PokemonAPIClient.getPokemonsByType(type.toLowerCase())
      .then(response => {
        this.filteredPokemons = response.data.pokemon.map(pokemon => pokemon.pokemon);
        this.setState({
          pokemons: this.filteredPokemons.slice(0, DEFAULT_LIMIT),
          offset: DEFAULT_LIMIT,
        }, () => {
          this.props.onSearchClick(extractIDFromPokemonUrl(this.state.pokemons[0].url));
        });
      })
      .catch(error => {
        this.setState({
          openSnackbar: true,
        });
      });
  };

  handleDefaultClick = type => {
    PokemonAPIClient.getPokemonList(DEFAULT_LIMIT, 0)
      .then(response => (
        this.setState({
          pokemons: response.data.results,
          offset: DEFAULT_LIMIT,
        }, () => {
          this.props.onSearchClick(extractIDFromPokemonUrl(this.state.pokemons[0].url));
        })
      ));
  }; 

  toggleSnackbarClick = () => {
    this.setState(state => ({
      openSnackbar: !state.openSnackbar,
    }));
  };

  renderSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={this.state.openSnackbar}
        autoHideDuration={6000}
        onClose={this.toggleSnackbarClick}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">
            Oops! There are no pokemons with such type.
          </span>
        }
      />
    );
  };

  render() {
    const { pokemons, offset, isButtonDisabled } = this.state;
    const { onItemClick } = this.props;

    return (
      <>
        <Grid container>
          <Grid xs={2} sm={1} item />

          <Grid xs={8} sm={10} item>
            <PokemonSearch 
              onClick={this.handleSearchClick}
              onDefaultClick={this.handleDefaultClick}
            />

            <PokemonList 
              pokemons={pokemons}
              onItemClick={onItemClick}
            />

            <LoadMoreButton
              offset={offset}
              disabled={isButtonDisabled}
              onClick={this.handleLoadMoreClick}
            />
          </Grid>

          <Grid xs={2} sm={1} item />
        </Grid>
        {this.renderSnackbar()}
      </>
    );
  }
}

export default PokemonListSection;
