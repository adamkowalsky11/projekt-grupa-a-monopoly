import React, { Component } from "react";
import PlayerService from "../services/PlayerService";

class GameBoard extends Component {
  state = {
    squares: [],
    rolledNumber: null
  };

  componentDidMount() {
    const squares = this.createSquares();
    this.setState({
      squares
    });
  }

  createSquares = () => {
    const { players: [player_1, player_2, player_3, player_4] } = this.props;

    const squares = [{
      row: 1,
      col: 1,
      type: 'start'
    }];

    let i = 1;
    let row = 1;
    let col = 2;
    while (squares.length < (9 * 2 + ((9 - 2) * 2))) {
      const square = {
        row,
        col
      };

      if (row === 1 && col === 9) {
        square.type = 'szpital'
      } else if (row === 9 && col === 9) {
        square.type = 'parking'
      } else if (row === 9 && col === 1) {
        square.type = 'więzienie'
      } else if ((row === 1 && col === 5) || (row === 5 && col === 9) || (row === 9 && col === 5) || (row === 5 && col === 1)) {
        square.type = 'dworzec'
      }
      else {
        square.type = 'pole'
      }

      squares.push(square);
      i++;

      if (i < 9) {
        col++;
      } else if (i < 18 - 1) {
        row++;
      } else if (i < 27 - 2) {
        col--;
      } else {
        row--;
      }

    }

    return squares;
  }

  rollDie = () => {
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const index = Math.floor(dice.length * Math.random());
    const rolledNumber = dice[index];
    this.setState({
      rolledNumber
    });
    this.props.movePlayer(index + 1);
  }

  render() {
    const { players: [player_1, player_2, player_3, player_4] } = this.props;

    const playerLocations = [];

    if (this.state.squares.length > 0) {
      const player_1_locaton = this.state.squares[player_1.location % this.state.squares.length];
      playerLocations.push(player_1_locaton);
      const player_2_locaton = this.state.squares[player_2.location % this.state.squares.length];
      playerLocations.push(player_2_locaton);
      if (player_3 !== undefined) {
        const player_3_locaton = this.state.squares[player_3.location % this.state.squares.length];
        playerLocations.push(player_3_locaton);
      }
      if (player_4 !== undefined) {
        const player_4_locaton = this.state.squares[player_4.location % this.state.squares.length];
        playerLocations.push(player_4_locaton);
      }
    }

    return (
      <div className="game-board">
        {
          this.state.squares.map((square, i) => (
            <div
              style={{
                gridRow: square.row,
                gridColumn: square.col
              }}
              key={i} className="game-square">
              {square.type}
            </div>
          ))
        }
        {
          playerLocations.map((location, i) => {
            const player = this.props.players[i];
            return (
              <div
                key={player.number}
                style={{
                  gridRow: location.row,
                  gridColumn: location.col
                }}
                className="player-avatar">
                <img className="pawn" src={`./pawns/pawn${this.props.players[i].pawn}.png`} />
              </div>
            )
          })
        }
        <div className="board-middle">
          <h3 className="die-desc"> Gracz {this.props.currentPlayer} rzuć kostką :) </h3>
          <p className="rolled-die">{this.state.rolledNumber}</p>
          <button onClick={this.rollDie} className="roll-button">Rzuć</button>
          <button onClick={this.props.resetGame} className="reset-button">Zresetuj Grę</button>
        </div>
      </div>
    );
  }
}

export default GameBoard;
