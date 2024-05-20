package aeh.zzaip.Monopoly.controller;

import aeh.zzaip.Monopoly.model.GameRoom;
import aeh.zzaip.Monopoly.service.GameRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/gamerooms")
public class GameRoomController {

    private final GameRoomService gameRoomService;

    @Autowired
    public GameRoomController(GameRoomService gameRoomService) {
        this.gameRoomService = gameRoomService;
    }

    @GetMapping("/getAllGameRooms")
    public ResponseEntity<List<GameRoom>> getAllPlayers() {
        try {
            List<GameRoom> gameRoomList = gameRoomService.getAllGameRooms();

            if (gameRoomList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(gameRoomList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getGameRoomById/{gameRoomId}")
    public ResponseEntity<GameRoom> getPlayerById(@PathVariable Long gameRoomId) {
        Optional<GameRoom> gameRoom = gameRoomService.getGameRoomById(gameRoomId);

        return gameRoom.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/addGameRoom")
    public ResponseEntity<GameRoom> addGameRoom(@RequestBody GameRoom gameRoom) {
        GameRoom newGameRoom = gameRoomService.addGameRoom(gameRoom);

        return new ResponseEntity<>(gameRoom, HttpStatus.OK);
    }

    @PostMapping("/updateGameRoomById/{gameRoomId}")
    public ResponseEntity<GameRoom> updateGameRoomById(@PathVariable Long gameRoomId, @RequestBody GameRoom newGameRoom) {
        Optional<GameRoom> updatedPlayer = gameRoomService.updateGameRoomById(gameRoomId, newGameRoom);

        return updatedPlayer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/deleteGameRoomById/{gameRoomId}")
    public ResponseEntity<GameRoom> deleteGameRoomById(@PathVariable Long gameRoomId) {
        boolean deleted = gameRoomService.deleteGameRoomById(gameRoomId);

        return deleted ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
