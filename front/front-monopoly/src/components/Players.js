import React from "react";
import PlayerService from "../services/PlayerService";

const Players = ({players}) => (
    <div className='players'>
        {
            players.map(player => (
                <div className='player' key={player.number}>
                    <h3> Gracz {player.number}, with location {player.location} </h3>
                    <img
                        className='pawn'
                        alt={player.pawn}
                        src={`./pawns/pawn${player.pawn}.png`} />
                </div>
            ))
        }
    </div>
);

export default Players;