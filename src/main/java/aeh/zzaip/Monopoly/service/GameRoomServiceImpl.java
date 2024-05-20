package aeh.zzaip.Monopoly.service;

import aeh.zzaip.Monopoly.model.GameRoom;
import aeh.zzaip.Monopoly.repository.GameRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameRoomServiceImpl implements GameRoomService {

    private final GameRoomRepository gameRoomRepository;

    @Autowired
    public GameRoomServiceImpl(GameRoomRepository gameRoomRepository) {
        this.gameRoomRepository = gameRoomRepository;
    }


    @Override
    public List<GameRoom> getAllGameRooms() {
        return gameRoomRepository.findAll();
    }

    @Override
    public Optional<GameRoom> getGameRoomById(Long gameRoomId) {
        return gameRoomRepository.findById(gameRoomId);
    }

    @Override
    public GameRoom addGameRoom(GameRoom gameRoom) {
        return gameRoomRepository.save(gameRoom);
    }

    @Override
    public Optional<GameRoom> updateGameRoomById(Long gameRoomId, GameRoom newGameRoom) {
        Optional<GameRoom> oldGameRoom = gameRoomRepository.findById(gameRoomId);

        if(oldGameRoom.isPresent()) {
            GameRoom gameRoom = oldGameRoom.get();
            gameRoom.setGameRoomName(newGameRoom.getGameRoomName());
            gameRoom.setRoomClosedToJoin(newGameRoom.isRoomClosedToJoin());

            return Optional.of(gameRoomRepository.save(gameRoom));
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteGameRoomById(Long gameRoomId) {
        if(gameRoomRepository.existsById(gameRoomId)) {
            gameRoomRepository.deleteById(gameRoomId);
            return true;
        }
        return false;
    }
}
