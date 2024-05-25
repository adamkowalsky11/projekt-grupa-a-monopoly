import { Component, useEffect } from 'react';
import './App.css';
import PlayerSelect from './containers/PlayerSelect';
import mainLogo from './mainLogo.png';
import Players from './components/Players';
import GameBoard from './components/GameBoard';
import GameRoomService from './services/GameRoomService';

class App extends Component {
  state = {
    playersInRoom: [],
    gameStarted: false,
    currentPlayer: 1
  };

  startGame = (playersInRoom) => {
    console.log('start game players: ' + playersInRoom)
    this.setState({
      playersInRoom: playersInRoom.map(player => ({
        ...player,
        location: 0
      })),
      gameStarted: true
    });
  }

  movePlayer = (number) => {
    this.setState((prevState) => ({
      playersInRoom: prevState.playersInRoom.map(player => {
        if (player.number === prevState.currentPlayer) {
          const location = player.location + number;
          player = {
            ...player,
            location
          }
        }
        return player;
      }),
      currentPlayer: prevState.currentPlayer === this.state.playersInRoom.length ? 1 : prevState.currentPlayer + 1
    }))
  }

  render() {
    return (
      <div className="App backgroundColor">
        <Players players={this.state.playersInRoom} />
        {
          this.state.gameStarted ? '' : <img src={mainLogo} className="App-logo" alt="logo" />
        }
        {
          this.state.gameStarted ?
            <GameBoard
              movePlayer={this.movePlayer}
              currentPlayer={this.state.currentPlayer}
              players={this.state.playersInRoom} />
            :
            <PlayerSelect
              startGame={this.startGame}

            />
        }
      </div>
    );
  }
}

export default App;
