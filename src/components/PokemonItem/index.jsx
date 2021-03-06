import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import Spinner from '../Spinner';
import PokemonAPIClient from '../../lib/PokemonAPIClient';
import { upperCaseFirstLetter } from '../../lib/utils';

import styles from './styles.module.scss';

import pokeball from '../../images/pokeball.png'

class PokemonItem extends React.Component {
  state = {
    avatar: '',
    name: '',
    types: [],
    isLoading: true
  };

  componentDidMount() {
    PokemonAPIClient.getPokemonByID(this.props.id)
      .then(response => (
        this.setState({
          avatar: response.data.sprites.front_default,
          name: response.data.name,
          types: response.data.types,
          isLoading: false,
        })
      ));
  }

  render() {
    const { avatar, name, types, isLoading } = this.state;
    const { id, onItemClick } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    return (
        <Card
          className={styles.card} 
          onClick={() => onItemClick(id)}
        >
          <Avatar
            className={styles.avatar}
            src={avatar ? avatar : pokeball} 
          />

          <h3 className={styles.name}>
            {upperCaseFirstLetter(name)}
          </h3>
          
          {types.map((typeObj, index) => (
            <Chip 
              key={index} 
              className={styles.chip} 
              label={upperCaseFirstLetter(typeObj.type.name)} 
              color='primary'
              variant='outlined'
            />
          ))}
        </Card>
    );
  }
}

PokemonItem.propTypes = {
  id: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default PokemonItem;
