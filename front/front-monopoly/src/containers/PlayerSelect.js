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
        gameRooms: [],
        password: '',
        disableButton: false,
        gameIdToJoin: 0,
        disableButtonJoin: false
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
        })
    );
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
        this.setState({ numberOfPlayersEnd: this.state.numberOfPlayers })
        this.setState({ disableButton: true })
    }

    backToStartScreen = () => {
        this.setState({ numberOfPlayersConfirmed: false })
        this.setState({ players: [] })
        this.setState({ readyToStart: false })
        this.setState({ currentPlayerSelect: 1 })
        this.setState({ pawns: ['blue', 'green', 'red', 'yellow'] });
    }

    handleRemove = () => {
        // const newList = this.state.pawns.filter(pawn => pawn !== pawnToRemove);
        // this.setState({ pawns: newList });

        PlayerService.getPlayerByRoomId(this.state.gameIdToJoin).then((response) => {
            const pawnsToRemove = response.data.map(pawnObject => pawnObject.pawn);
            console.log('Pawn colors to remove:', pawnsToRemove);
            console.log('Current pawns:', this.state.pawns);
        
            // Removing the pawns from state
            const newList = this.state.pawns.filter(pawn => !pawnsToRemove.includes(pawn));
            console.log('New list of pawns:', newList);
        
            this.setState({ pawns: newList }, () => {
              console.log('Updated pawns state:', this.state.pawns);
            });

        })
    }

    handlePawn = (pawn) => {
        const playertoAdd = {
            nick: "test",
            money: 1500,
            pawn: pawn,
            roomId: this.state.gameIdToJoin
        };

        PlayerService.createPlayer(playertoAdd).then((response) => {
        }).catch((err) => {
            console.log(err);
        })

        this.setPlayer(pawn)
        this.handleRemove();

        GameRoomService.getGameRoomById(playertoAdd.roomId).then((response) => {
            if(response.data.numberOfPlayers < response.data.maxNumberOfPlayers){
                const roomToUpdate = {
                    gameRoomName: response.data.gameRoomName,
                    password: response.data.password,
                    numberOfPlayers: response.data.numberOfPlayers + 1,
                    maxNumberOfPlayers: response.data.maxNumberOfPlayers
                }

                GameRoomService.updateGameRoomById(playertoAdd.roomId, roomToUpdate).then((response) => {

                })

            }
        })
    }


    startGame = () => {
        this.props.startGame(this.state.players)
    }

    disableButton = () => {
        const gameRoom = {
            gameRoomName: this.state.roomName,
            password: this.state.password,
            numberOfPlayers: this.props.numberOfPlayers,
            maxNumberOfPlayers: this.state.numberOfPlayersEnd
        }

        GameRoomService.createGameRoom(gameRoom).then((response) => {
            console.log("Game room created");
            this.getGameRooms();
        }).catch((err) => {
            console.log(err);
        })

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

    joinGame = (room) => {
        this.setState({ numberOfPlayersConfirmed: true })
        this.setState({ gameIdToJoin: room.gameRoomId })
        this.setState({ numberOfPlayersEnd: room.maxNumberOfPlayers })
    }



    render() {
        return (
            <div>
                {this.state.gameRooms.length !== 0 ?
                    <div>
                        <h1 className='roomsLabel'>Pokoje</h1>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Liczba graczy</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.gameRooms.map((room) => (
                                    <tr key={room.gameRoomId}>
                                        <td>{room.gameRoomName}</td>
                                        <td>{room.numberOfPlayers} / {room.maxNumberOfPlayers}</td>
                                        <td>
                                            <button 
                                            disabled={room.numberOfPlayers === room.maxNumberOfPlayers ? "disabled" : ""}
                                            onClick={() => this.joinGame(room)}>Dołącz do {room.gameRoomName} </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : <h3></h3>
                }
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
                                            placeholder='Podaj nazwę pokoju' />
                                        <input
                                            className='room'
                                            type='password'
                                            onChange={(e => this.setState({ password: e.target.value }))}
                                            value={this.state.password}
                                            placeholder='Podaj hasło' />
                                        <button
                                            className='buttonStart'
                                            type='submit'
                                            disabled={(this.state.disableButton) ? "" : "disabled"}
                                            onClick={this.disableButton}>Stwórz pokój</button>
                                    </form>
                                </div>
                                <h1 className='label'>Dodaj graczy (min 2, max 4):</h1>
                                <button className='buttonStart'
                                    onClick={this.addPlayers}
                                    disabled={(this.state.disableButton) ? "disabled" : ""}
                                >
                                    Dodaj graczy
                                </button>
                                <button className='buttonRemove'
                                    onClick={this.removePlayers}
                                    disabled={(this.state.disableButton) ? "disabled" : ""}
                                >
                                    Usuń graczy
                                </button>
                                <h1 className='label'>Ilość graczy: {this.state.numberOfPlayers}</h1>
                            </div>
                    }
                    {
                        this.state.numberOfPlayersConfirmed ?
                            <h1></h1> :
                            <div>
                                <button
                                    onClick={this.confirmNumberOfPlayers}
                                    className='buttonStart'
                                    disabled={(this.state.disableButton) ? "disabled" : ""}
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