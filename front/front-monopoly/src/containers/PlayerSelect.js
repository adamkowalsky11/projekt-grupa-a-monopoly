import React, { Component } from 'react'
import { useState, useEffect, useCallback } from 'react';
import Players from '../components/Players';
import PlayerService from '../services/PlayerService';
import GameRoomService from '../services/GameRoomService';
import RefreshPage from './RefreshPage';

class PlayerSelect extends Component {
    state = {
        pawns: ['blue', 'green', 'red', 'yellow'],
        currentPlayerSelect: 0,
        players: [],
        readyToStart: false,
        numberOfPlayers: 2,
        numberOfPlayersConfirmed: false,
        numberOfPlayersEnd: 0,
        roomName: '',
        gameRooms: [],
        disableButton: false,
        gameIdToJoin: 0,
        disableButtonJoin: false,
        waitingOtherPlayers: false,
        playersInRoom: [],
        isVisible: true,
        maxNumber: 1
    };

    setPlayer = (pawn) => {
        this.setState((prevState) => ({
            currentPlayerSelect: prevState.currentPlayerSelect + 1,
            playersInRoom: [
                ...prevState.playersInRoom, {
                    number: prevState.currentPlayerSelect,
                    pawn
                }
            ],
            // readyToStart: prevState.currentPlayerSelect === 4 ? true : false
            readyToStart: prevState.currentPlayerSelect === this.state.numberOfPlayersEnd ? true : false
        }
        )
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
        this.setState({ currentPlayerSelect: 0 })
        this.setState({ pawns: ['blue', 'green', 'red', 'yellow'] });
    }

    handleRemove = (gameId) => {
        // const newList = this.state.pawns.filter(pawn => pawn !== pawnToRemove);
        // this.setState({ pawns: newList });
        PlayerService.getPlayerByRoomId(gameId).then((response) => {
            const pawnsToRemove = response.data.map(pawnObject => pawnObject.pawn);

            // Removing the pawns from state
            const newList = this.state.pawns.filter(pawn => !pawnsToRemove.includes(pawn));

            this.setState({ pawns: newList });
        })
    }

    handlePawn = (pawn) => {
        console.log('playersInRoom.length:' + this.state.playersInRoom.length)
        const playertoAdd = {
            nick: "test",
            money: 1500,
            number: this.state.playersInRoom.length + 1,
            pawn: pawn,
            location: 0,
            roomId: this.state.gameIdToJoin
        }

        PlayerService.createPlayer(playertoAdd).then((response) => {
            this.setState({ waitingOtherPlayers: true })
        }).catch((err) => {
            console.log(err);
        })

        // this.setPlayer(pawn)
        this.handleRemove(playertoAdd.roomId);


        GameRoomService.getGameRoomById(playertoAdd.roomId).then((response) => {
            if (response.data.numberOfPlayers < response.data.maxNumberOfPlayers) {
                const roomToUpdate = {
                    gameRoomName: response.data.gameRoomName,
                    numberOfPlayers: response.data.numberOfPlayers + 1,
                    maxNumberOfPlayers: response.data.maxNumberOfPlayers
                }

                this.setState({maxNumber: response.data.numberOfPlayers + 1})

                this.handleRemove(playertoAdd.roomId);

                GameRoomService.updateGameRoomById(playertoAdd.roomId, roomToUpdate).then((response) => {
                    this.getGameRooms();
                    this.refreshData(roomToUpdate);
                })
            }
        })

        this.setState({ waitingOtherPlayers: true });
        this.getPlayersByRoomId(playertoAdd.roomId);
        this.setState({ isVisible: false })
    }

    refreshData = (roomToUpdate) => {
        if (roomToUpdate.numberOfPlayers === roomToUpdate.maxNumberOfPlayers) {
            this.setState({ readyToStart: true });
        }
    }

    startGame = () => {
        this.props.startGame(this.state.playersInRoom)
    }

    disableButton = () => {
        const gameRoom = {
            gameRoomName: this.state.roomName,
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
        this.handleRemove(room.gameRoomId);
        this.getPlayersByRoomId(room.gameRoomId);
    }

    setMaxNumber = () => {
        PlayerService.getPlayerNextNumberByRoomId(this.state.gameIdToJoin).then((response) => {
            console.log(response.data);

            return response.data
        })
    }

    getPlayersByRoomId = (roomId) => {
        PlayerService.getPlayerByRoomId(roomId).then((response) => {
            this.setState({ playersInRoom: response.data })
        }).catch((err) => {
            console.log(err);
        })
    };

    getGameRoomById = (roomId) => {
        PlayerService.getGameRoomById(roomId).then((response) => {
            return response
        }).catch((err) => {
            console.log(err);
        })
    }

    log = () => {
        console.log('This message logs every 3 seconds');
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
                                <RefreshPage method={() => { this.getPlayersByRoomId(this.state.gameIdToJoin) }} />
                                {
                                    this.state.readyToStart ?
                                        <div>
                                            <h1> Naciśnij START aby rozpocząć </h1>
                                            <button onClick={this.startGame} className='start-button'>START</button>
                                        </div>
                                        :
                                        <div>
                                            {this.state.isVisible ? <h1></h1> : <h1> Oczekiwanie na pozostałych graczy lub rozpoczęcie gry... </h1>}
                                            <div className={this.state.isVisible ? '' : 'hidden'}>
                                                <h1 className='label'>Wybierz pionek</h1>
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
                                            {this.state.waitingOtherPlayers || this.state.playersInRoom.length !== 0 ? <h1> Gracze oczekujący w pokoju </h1> : <h1></h1>}

                                            {
                                                this.state.playersInRoom.map(player => (
                                                    <img
                                                        key={player}
                                                        className='pawn'
                                                        alt={player.pawn}
                                                        src={`./pawns/pawn${player.pawn}.png`}
                                                    />
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
                <Players players={this.state.playersInRoom} />
            </div>
        );
    }
}

export default PlayerSelect;