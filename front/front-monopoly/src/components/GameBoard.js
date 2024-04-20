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
        
        // for (let i = 1; i < 18; i++) {
        //     const square = {};

        //     if (i % 2 !== 0) {
        //         square.type = player_1.pawn;
        //     } else if (i % 2 === 0) {
        //         square.type = player_2.pawn;
        //     }

        //     if(i % 3 === 0) {
        //         square.type = 'empty';
        //     } 

        //     squares.push(square);
        // }

        for (let i = 1; i < 18; i++) {
            let playerIndex = 0;
            if(player_3 !== undefined && player_4 !== undefined) {
                playerIndex = (i - 1) % 4 + 1;
            } else if (player_3 !== undefined) {
                playerIndex = (i - 1) % 3 + 1
            } else {
                playerIndex = (i - 1) % 2 + 1
            }
            let pawnType = eval(`player_${playerIndex}.pawn`);
            squares.splice(i, 0, { type: pawnType });
        }

        return squares;
    }

    render() {
        return (
            <div className="game-board">
             {
                this.state.squares.map((square, i) => (
                    <div key={i} className="game-square">
                        {square.type}
                    </div>
                ))
             }   
            </div>
        );
    }
}

export default GameBoard; 