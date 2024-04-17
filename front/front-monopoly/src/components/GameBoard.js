import React, { Component } from "react";

class GameBoard extends Component {
    state = {
        squares: []
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
            type: 'start'
        }];
        
        for (let i = 1; i < 18; i++) {
            const square = {};

            if (i % 2 !== 0) {
                square.type = player_1.pawn;
            } else if (i % 2 == 0) {
                square.type = player_2.pawn;
            }

            if(i % 3 === 0) {
                square.type = 'face-off';
            }

            squares.push(square);
        }

        return squares;
    }

    render() {
        return (
            <div className="game-board">
             {
                this.state.squares.map((square) => (
                    <div className="game-square">
                        {square.type}
                    </div>
                ))
             }   
            </div>
        );
    }
}

export default GameBoard; 