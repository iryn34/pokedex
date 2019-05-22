import React from 'react';

import styles from './styles.module.scss';

import CircularProgress from '@material-ui/core/CircularProgress';

class PokemonItem extends React.Component {
  render() {
    return (
      <div className={styles.spinner}>
        <CircularProgress />
      </div>
    );
  }
}

export default PokemonItem;
