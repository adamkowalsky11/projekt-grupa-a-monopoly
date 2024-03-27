import React, { Component } from 'react'

class PlayerSelect extends Component {
    state = {
        pawns: ['blue', 'green', 'red', 'yellow'],
        currentPlayerSelect: 1,
        players: [],
        readyToStart: false,
        numberOfPlayers: 2,
        numberOfPlayersConfirmed: false,
        numberOfPlayersEnd: 0
    };

    setPlayer = (pawn) => {
        this.setState((prevState) => ({
            currentPlayerSelect: prevState.currentPlayerSelect + 1,
            players: [
                ...prevState.players, {
                    number: prevState.currentPlayerSelect,
                    pawn
                }
            ],
            // readyToStart: prevState.currentPlayerSelect === 4 ? true : false
            readyToStart: prevState.currentPlayerSelect === this.state.numberOfPlayersEnd ? true : false
        }));
    }

    addPlayers = () => {
        if (this.state.numberOfPlayers < 4) {
            this.setState({ numberOfPlayers: this.state.numberOfPlayers + 1 })
        }
    }

    removePlayers = () => {
        if (this.state.numberOfPlayers > 2) {
            this.setState({ numberOfPlayers: this.state.numberOfPlayers - 1 })
        }
    }

    confirmNumberOfPlayers = () => {
        this.setState({ numberOfPlayersConfirmed: true })
        this.setState({ numberOfPlayersEnd: this.state.numberOfPlayers })
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.numberOfPlayersConfirmed ?
                            <h1></h1> :
                            <div>
                                <h1>Dodaj graczy (min 2, max 4):</h1>
                                <button className='buttonStart'
                                    onClick={this.addPlayers}>
                                    Dodaj graczy
                                </button>
                                <button className='buttonStart'
                                    onClick={this.removePlayers}>
                                    Usuń graczy
                                </button>
                            </div>
                    }

                    <h1>Ilość graczy: {this.state.numberOfPlayers}</h1>

                    {
                        this.state.numberOfPlayersConfirmed ?
                            <h1></h1> :
                            <div>
                                <button
                                    onClick={this.confirmNumberOfPlayers}
                                    className='buttonStart'
                                >
                                    Zatwierdź
                                </button>
                            </div>
                    }

                    {
                        this.state.numberOfPlayersConfirmed ?
                            <div>
                                {
                                    this.state.readyToStart ?
                                        <h1> Naciśnij START aby rozpocząć </h1> :
                                        <div>
                                            <h1>Gracz {this.state.currentPlayerSelect} - wybierz pionek.</h1>
                                            {
                                                this.state.pawns.map(pawn => (
                                                    <img
                                                        onClick={() => this.setPlayer(pawn)}
                                                        key={pawn}
                                                        className='pawn'
                                                        alt={pawn}
                                                        src={`./pawns/pawn${pawn}.png`} />
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                            :
                            <h1></h1>

                    }
                </div>
                <div className='players'>
                    {
                        this.state.players.map(player => (
                            <div className='player' key={player.number}>
                                <h3> Gracz {player.number} </h3>
                                <img
                                    className='pawn'
                                    alt={player.pawn}
                                    src={`./pawns/pawn${player.pawn}.png`} />
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default PlayerSelect;