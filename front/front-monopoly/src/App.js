import { Component } from 'react';
import './App.css';
import PlayerSelect from './containers/PlayerSelect';
import mainLogo from './mainLogo.png';
import Players from './components/Players';
import GameBoard from './components/GameBoard';
import GameRoomService from './services/GameRoomService';
import PlayerService from './services/PlayerService';

class App extends Component {
  state = {
    players: JSON.parse(localStorage.getItem('players')) || [],
    gameStarted: JSON.parse(localStorage.getItem('gameStarted')) || false,
    currentPlayer: JSON.parse(localStorage.getItem('currentPlayer')) || 1
  };

  componentDidMount() {
    window.addEventListener('storage', this.syncStateFromLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.syncStateFromLocalStorage);
  }

  syncStateFromLocalStorage = () => {
    this.setState({
      players: JSON.parse(localStorage.getItem('players')) || [],
      gameStarted: JSON.parse(localStorage.getItem('gameStarted')) || false,
      currentPlayer: JSON.parse(localStorage.getItem('currentPlayer')) || 1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.players !== this.state.players || 
        prevState.gameStarted !== this.state.gameStarted || 
        prevState.currentPlayer !== this.state.currentPlayer) {
      localStorage.setItem('players', JSON.stringify(this.state.players));
      localStorage.setItem('gameStarted', JSON.stringify(this.state.gameStarted));
      localStorage.setItem('currentPlayer', JSON.stringify(this.state.currentPlayer));
    }
  }

  startGame = (players) => {
    console.log('start game players: ' + players)
    this.setState({
      players: players.map(player => ({
        ...player
      })),
      gameStarted: true
    });
  }

  resetGame = () => {
    this.setState({
      players: [],
      gameStarted: false,
      currentPlayer: 1
    });
    localStorage.removeItem('players');
    localStorage.removeItem('gameStarted');
    localStorage.removeItem('currentPlayer');
  }

  movePlayer = (number) => {
    this.setState((prevState) => ({
      players: prevState.players.map(player => {
        if (player.number === prevState.currentPlayer) {
          const location = player.location + number;
          player = {
            ...player,
            location
          }
        }
        PlayerService.updatePlayerById(player.playerId, player).then((response) => {

        }).catch((err) =>{
            console.log(err);
        })
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
              players={this.state.players}
              resetGame={this.resetGame}
            />
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


