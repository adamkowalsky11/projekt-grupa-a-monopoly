package aeh.zzaip.Monopoly.service;

import aeh.zzaip.Monopoly.model.Player;

import java.util.List;
import java.util.Optional;

public interface PlayerService {
    List<Player> getAllPlayers();

    Optional<Player> getPlayerById(Long playerId);

    Player addPlayer(Player player);

    Optional<Player> updatePlayerById(Long playerId, Player newPlayer);

    boolean deletePlayerById(Long playerId);

    Optional<List<Player>> getPlayerByRoomId(Long roomId);
}
