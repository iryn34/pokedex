import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import withSizes from 'react-sizes';

import Title from '../../components/Title';
import PokemonListSection from '../../components/PokemonListSection';
import PokemonDetailsCard from '../../components/PokemonDetailsCard';

class PokedexPage extends React.Component {
  state = {
    id: 1,
    open: false,
  };

  handleItemClick = id => {
    this.setState(state => ({ 
      id,
      open: !state.open
     }));
  };

  handleSearchClick = id => {
    this.setState({ id });
  };

  closeDrawer = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { id, open } = this.state;
    const { isMobile } = this.props;
    
    return (
      <>
        <Title />

        {isMobile && (
          <SwipeableDrawer
            open={open}
            onClick={this.closeDrawer}
            onOpen={() => {}}
            onClose={() => {}}
          >
            <PokemonDetailsCard 
              id={id} 
            />
          </SwipeableDrawer>
        )}

        <Grid container>
          <Grid xs={12} sm={8} item>
            <PokemonListSection 
              onSearchClick={this.handleSearchClick}
              onItemClick={this.handleItemClick} 
            />
          </Grid>

          {!isMobile && (
            <Grid sm={4} item>
              <PokemonDetailsCard id={id} />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

PokedexPage.propTypes = {
  isMobile: PropTypes.bool,
};

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
})

export default withSizes(mapSizesToProps)(PokedexPage);
