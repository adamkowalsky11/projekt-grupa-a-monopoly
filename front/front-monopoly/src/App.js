import { Component } from 'react';
import './App.css';
import PlayerSelect from './containers/PlayerSelect';
import mainLogo from './mainLogo.png';

class App extends Component {
  state = {
    players: [],
    gameStarted: false
  };

  startGame = (players) => {
    console.log(players);
  }

  render() {
    return (
      <div className="App backgroundColor">
        <img src={mainLogo} className="App-logo" alt="logo"/>
        <PlayerSelect startGame={this.startGame} />
      </div>
    );
  }
}

export default App;
