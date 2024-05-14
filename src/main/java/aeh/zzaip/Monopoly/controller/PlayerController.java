package aeh.zzaip.Monopoly.controller;

import aeh.zzaip.Monopoly.model.Player;
import aeh.zzaip.Monopoly.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/getAllPlayers")
    public ResponseEntity<List<Player>> getAllPlayers() {
        try {
            List<Player> playersList = playerService.getAllPlayers();

            if (playersList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(playersList, HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getPlayerById/{playerId}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long playerId) {
        Optional<Player> player = playerService.getPlayerById(playerId);

        return player.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/addPlayer")
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        Player newPlayer = playerService.addPlayer(player);

        return new ResponseEntity<>(newPlayer, HttpStatus.OK);
    }

    @PostMapping("/updatePlayerById/{playerId}")
    public ResponseEntity<Player> updatePlayerById(@PathVariable Long playerId, @RequestBody Player newPlayer) {
        Optional<Player> updatedPlayer = playerService.updatePlayerById(playerId, newPlayer);

        return updatedPlayer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/deletePlayerById/{playerId}")
    public ResponseEntity<Player> deletePlayerbyId(@PathVariable Long playerId) {
        boolean deleted = playerService.deletePlayerById(playerId);

        return deleted ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
