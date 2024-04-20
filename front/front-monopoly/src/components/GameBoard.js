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
            row: 1,
            col: 1,
            type: 'start'
        }];

        let i = 1;
        let row = 1;
        let col = 2;
        while (squares.length < (9 * 2 + ((9 - 2) * 2))) {
            const square = {
                row,
                col
            };

            // let playerIndex = 0;
            // if(player_3 !== undefined && player_4 !== undefined) {
            //     playerIndex = (i) % 4 + 1;
            // } else if (player_3 !== undefined) {
            //     playerIndex = (i) % 3 + 1
            // } else {
            //     playerIndex = (i) % 2 + 1
            // }
            // let pawnType = eval(`player_${playerIndex}.pawn`);
            // squares.splice(i, 0, { type: pawnType });
            // squares.push(square);

            // if (i % 2 !== 0) {
            //     square.type = player_1.pawn;
            // } else if (i % 2 === 0) {
            //     square.type = player_2.pawn;
            // }

            // if (i % 3 === 0) {
            //     square.type = 'empty';
            // }

            if(row === 1 && col === 9) {
                square.type = 'szpital'
            }else if(row === 9 && col === 9) {
                square.type = 'parking'
            }else if(row === 9 && col === 1) {
                square.type = 'więzienie'
            } else if ((row === 1 && col === 5) || (row === 5 && col === 9) || (row === 9 && col === 5) || (row === 5 && col === 1) ){
                square.type = 'dworzec'
            }
            else {
                square.type = 'pole'
            }
            
            squares.push(square);
            i++;

            if(i < 9) {
                col++;
            } else if (i < 18 - 1) {
                row++;
            } else if (i < 27 - 2) {
                col--;
            } else {
                row--;
            }

        }

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

        // for (let i = 1; i < 18; i++) {
        //     let playerIndex = 0;
        //     if(player_3 !== undefined && player_4 !== undefined) {
        //         playerIndex = (i - 1) % 4 + 1;
        //     } else if (player_3 !== undefined) {
        //         playerIndex = (i - 1) % 3 + 1
        //     } else {
        //         playerIndex = (i - 1) % 2 + 1
        //     }
        //     let pawnType = eval(`player_${playerIndex}.pawn`);
        //     squares.splice(i, 0, { type: pawnType });
        // }
        console.log(squares)

        return squares;
    }

    render() {
        return (
            <div className="game-board">
                {
                    this.state.squares.map((square, i) => (
                        <div
                            style={{
                                gridRow: square.row,
                                gridColumn: square.col
                            }}
                            key={i} className="game-square">
                            {square.type}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default GameBoard; 