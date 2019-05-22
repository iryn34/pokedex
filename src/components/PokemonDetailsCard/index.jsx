import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Spinner from '../Spinner';
import PokemonAPIClient from '../../lib/PokemonAPIClient';
import { upperCaseFirstLetter } from '../../lib/utils';

import styles from './styles.module.scss';

class PokemonDetailsCard extends React.Component {
  state = {
    pokemon: {},
    isLoading: true,
  };

  componentDidMount() {
    PokemonAPIClient.getPokemonByID(this.props.id)
      .then(response => {
        this.setState({
          pokemon: response.data,
          isLoading: false,
        });
      });
  }

  componentDidUpdate() {
    PokemonAPIClient.getPokemonByID(this.props.id)
      .then(response => {
        this.setState({
          pokemon: response.data,
          isLoading: false,
        });
      });
  }

  renderTableHeader() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell align="right">Fire</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  renderTableBody() {
    const { pokemon } = this.state;

    return (
      <TableBody>
        {this.renderStats(pokemon)}
        {this.renderWeight(pokemon)}
        {this.renderTotalMoves(pokemon)}
      </TableBody>
    );
  }

  renderStats(pokemon) {
    return pokemon.stats.map(statObj => {
      return (
        <TableRow key={statObj.stat.url}>
          <TableCell component="th" scope="row">
            {upperCaseFirstLetter(statObj.stat.name)}
          </TableCell>
          <TableCell align="right">{statObj.base_stat}</TableCell>
        </TableRow>
      );
    });
  }

  renderWeight(pokemon) {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          Weight
        </TableCell>
        <TableCell align="right">{pokemon.weight}</TableCell>
      </TableRow>
    );
  }

  renderTotalMoves(pokemon) {
    return (
      <TableRow>
        <TableCell component="th" scope="row">
          Total moves
        </TableCell>
        <TableCell align="right">{pokemon.moves.length}</TableCell>
      </TableRow>
    );
  }

  render() {
    const { pokemon, isLoading } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <Grid container>
        {/* <Grid xs={0} sm={2} item /> */}

        <Grid sm={11} item>
          <Card className={styles.card}>
            <Avatar 
              className={styles.avatar}
              src={pokemon.sprites.front_default} 
            />

            <h3 className={styles.name}>
              {upperCaseFirstLetter(pokemon.name)}
            </h3>

            <Table>
              {this.renderTableHeader()}
              {this.renderTableBody()}
            </Table>
          </Card>
        </Grid>

        <Grid sm={1} item />
      </Grid>
    );
  }
}

export default PokemonDetailsCard;
