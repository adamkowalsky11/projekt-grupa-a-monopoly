import React, { Component } from 'react'
import { useState } from 'react';
import Players from '../components/Players';
import PlayerService from '../services/PlayerService';
import GameRoomService from '../services/GameRoomService';

class PlayerSelect extends Component {
    state = {
        pawns: ['blue', 'green', 'red', 'yellow'],
        currentPlayerSelect: 1,
        players: [],
        readyToStart: false,
        numberOfPlayers: 2,
        numberOfPlayersConfirmed: false,
        numberOfPlayersEnd: 0,
        roomName: '',
        disableButton: false,
        gameRooms: []
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
        this.setState({ disableButton: false })
    }

    backToStartScreen = () => {
        this.setState({ numberOfPlayersConfirmed: false })
        this.setState({ players: [] })
        this.setState({ readyToStart: false })
        this.setState({ currentPlayerSelect: 1 })
        this.setState({ pawns: ['blue', 'green', 'red', 'yellow'] });
        this.setState({ roomName: '' })
    }

    handleRemove = (pawnToRemove) => {
        const newList = this.state.pawns.filter(pawn => pawn !== pawnToRemove);
        this.setState({ pawns: newList });
    }

    handlePawn = (pawn) => {
        const playertoAdd = {
            nick: "test",
            money: 1500,
            pawn: pawn
        };

        PlayerService.createPlayer(playertoAdd).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })

        this.setPlayer(pawn)
        this.handleRemove(pawn);
    }

    startGame = () => {
        this.props.startGame(this.state.players)
    }

    disableButton = () => {
        const gameRoom = {
            gameRoomName: this.state.roomName,
            roomClosedToJoin: false
        }

        GameRoomService.createGameRoom(gameRoom).then((response) => {
            console.log("Game room created");
        }).catch((err) => {
            console.log(err);
        })

        this.setState({ disableButton: true })
        this.getGameRooms();
    }

    getGameRooms = () => {
        GameRoomService.getAllGameRooms().then((response) => {
            const allGameRooms = response.data;
            this.setState({ gameRooms: allGameRooms })
        }).catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getGameRooms();
      }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.numberOfPlayersConfirmed ?
                            <h1></h1> :
                            <div>
                                <div className='gameRooms'>
                                    <form>
                                        <input
                                            className='room'
                                            onChange={(e => this.setState({ roomName: e.target.value }))}
                                            value={this.state.roomName}
                                            disabled={(this.state.disableButton) ? "disabled" : ""}
                                            placeholder='Podaj nazwę pokoju' />
                                        <button
                                            className='buttonStart'
                                            type='submit'
                                            disabled={(this.state.disableButton) ? "disabled" : ""}
                                            onClick={this.disableButton}>Stwórz pokój</button>
                                    </form>
                                    <div>
                                        <h1>Game Rooms</h1>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Closed to Join</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.gameRooms.map((room) => (
                                                    <tr key={room.gameRoomId}>
                                                        <td>{room.gameRoomId}</td>
                                                        <td>{room.gameRoomName}</td>
                                                        <td>{room.roomClosedToJoin ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <h1 className='label'>Dodaj graczy (min 2, max 4):</h1>
                                <button className='buttonStart'
                                    onClick={this.addPlayers}>
                                    Dodaj graczy
                                </button>
                                <button className='buttonRemove'
                                    onClick={this.removePlayers}>
                                    Usuń graczy
                                </button>
                            </div>
                    }

                    <h1 className='label'>Ilość graczy: {this.state.numberOfPlayers}</h1>

                    {
                        this.state.numberOfPlayersConfirmed ?
                            <h1></h1> :
                            <div>
                                <button
                                    onClick={this.confirmNumberOfPlayers}
                                    className='buttonStart'>
                                    Zatwierdź
                                </button>
                            </div>
                    }

                    {
                        this.state.numberOfPlayersConfirmed ?
                            <div>
                                {
                                    this.state.readyToStart ?
                                        <div>
                                            <h1> Naciśnij START aby rozpocząć </h1>
                                            <button onClick={this.startGame} className='start-button'>START</button>
                                        </div>
                                        :
                                        <div>
                                            <h1 className='label'>Gracz {this.state.currentPlayerSelect} - wybierz pionek.</h1>
                                            {
                                                this.state.pawns.map(pawn => (
                                                    <img
                                                        onClick={() => this.handlePawn(pawn)}
                                                        key={pawn}
                                                        className='pawn'
                                                        alt={pawn}
                                                        src={`./pawns/pawn${pawn}.png`} />
                                                ))
                                            }

                                        </div>
                                }
                                <div>
                                    <button className='buttonRemove'
                                        onClick={this.backToStartScreen}>
                                        Powrót do strony startowej
                                    </button>
                                </div>
                            </div>
                            :
                            <h1></h1>

                    }
                </div>
                <Players players={this.state.players} />
            </div>
        );
    }
}

export default PlayerSelect;