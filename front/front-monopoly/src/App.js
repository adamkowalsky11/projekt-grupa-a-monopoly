import { Component } from 'react';
import './App.css';
import PlayerSelect from './containers/PlayerSelect';
import mainLogo from './mainLogo.png';
import Players from './components/Players';
import GameBoard from './components/GameBoard';

class App extends Component {
  state = {
    players: [],
    gameStarted: false
  };

  startGame = (players) => {
    this.setState({
      players,
      gameStarted: true
    });
  }

  render() {
    return (
      <div className="App backgroundColor">
        <Players players={this.state.players} />
        {
          this.state.gameStarted ? '' : <img src={mainLogo} className="App-logo" alt="logo" />
        }
        {
          this.state.gameStarted ? <GameBoard players={this.state.players}/> : <PlayerSelect startGame={this.startGame} />
        }
      </div>
    );
  }
}

export default App;
