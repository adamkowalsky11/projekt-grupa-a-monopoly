import { Component, useEffect } from 'react';
import './App.css';
import PlayerSelect from './containers/PlayerSelect';
import mainLogo from './mainLogo.png';
import Players from './components/Players';
import GameBoard from './components/GameBoard';
import GameRoomService from './services/GameRoomService';

class App extends Component {
  state = {
    players: [],
    gameStarted: false,
    currentPlayer: 1
  };

  startGame = (players) => {
    this.setState({
      players: players.map(player => ({
        ...player,
        location: 0
      })),
      gameStarted: true
    });
  }

  movePlayer = (number) => {
    this.setState((prevState) => ({
      players: prevState.players.map(player => {
        if (player.number === prevState.currentPlayer) {
          const location =  player.location + number;
            player = {
              ...player,
              location
            }
          }
        return player;
      }),      
      currentPlayer: prevState.currentPlayer === this.state.players.length ? 1 : prevState.currentPlayer + 1
    }))
  }

  render() {
    return (
      <div className="App backgroundColor">
        <Players players={this.state.players} />
        {
          this.state.gameStarted ? '' : <img src={mainLogo} className="App-logo" alt="logo" />
        }
        {
          this.state.gameStarted ? 
          <GameBoard 
          movePlayer={this.movePlayer}
          currentPlayer={this.state.currentPlayer} 
          players={this.state.players}/> 
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
