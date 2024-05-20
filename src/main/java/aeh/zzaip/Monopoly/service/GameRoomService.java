package aeh.zzaip.Monopoly.service;

import aeh.zzaip.Monopoly.model.GameRoom;
import aeh.zzaip.Monopoly.model.Player;

import java.util.List;
import java.util.Optional;

public interface GameRoomService {
    List<GameRoom> getAllGameRooms();

    Optional<GameRoom> getGameRoomById(Long gameRoomId);

    GameRoom addGameRoom(GameRoom gameRoom);

    Optional<GameRoom> updateGameRoomById(Long gameRoomId, GameRoom newGameRoom);

    boolean deleteGameRoomById(Long gameRoomId);
}
