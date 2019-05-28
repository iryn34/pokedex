import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import styles from './styles.module.scss';

class LoadMoreButton extends React.Component {
  render() {
    const { disabled, onClick } = this.props;

    return (
      <Grid container>
        <Grid xs={12} item>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.button}
              disabled={disabled}
              variant="contained" 
              color="primary" 
              onClick={onClick}
            >
              Load More
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

LoadMoreButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LoadMoreButton;