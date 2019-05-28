import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './styles.module.scss';

class PokemonSearch extends React.Component {
  state = {
    typeValue: '',
  };

  handleChange = event => {
    this.setState({
      typeValue: event.target.value
    });
  }

  render() {
    const { typeValue } = this.state;
    const { onClick, onDefaultClick } = this.props;

    return (
      <div className={styles.form}>
        <TextField
          id="outlined-search"
          type="search"
          className={styles.textField}
          margin="normal"
          variant="outlined"
          value={typeValue}
          onChange={this.handleChange}
        />

        <Button
          className={styles.button}
          variant="contained" 
          color="primary" 
          onClick={() => onClick(typeValue)}            
        >
          Search pokemons by type
        </Button>

        <Button
          className={styles.button}
          variant="outlined"
          color="primary"
          onClick={() => {
            this.setState({typeValue: ''});
            onDefaultClick();
          }}            
        >
          Default pokemons
        </Button>
      </div>
    );
  }
}

PokemonSearch.propTypes = {
  onClick: PropTypes.func, 
  onDefaultClick: PropTypes.func,
};

export default PokemonSearch;