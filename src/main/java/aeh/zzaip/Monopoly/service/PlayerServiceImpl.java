package aeh.zzaip.Monopoly.service;

import aeh.zzaip.Monopoly.model.Player;
import aeh.zzaip.Monopoly.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public Optional<Player> getPlayerById(Long playerId) {
        return playerRepository.findById(playerId);
    }

    @Override
    public Player addPlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public Optional<Player> updatePlayerById(Long playerId, Player newPlayer) {
        Optional<Player> oldPlayer = playerRepository.findById(playerId);

        if (oldPlayer.isPresent()) {
            Player player = oldPlayer.get();
            player.setNick(newPlayer.getNick());
            player.setMoney(newPlayer.getMoney());
            player.setLocation(newPlayer.getLocation());
            player.setNumber(newPlayer.getNumber());

            return Optional.of(playerRepository.save(player));
        }

        return Optional.empty();
    }

    @Override
    public boolean deletePlayerById(Long playerId) {
        if (playerRepository.existsById(playerId)) {
            playerRepository.deleteById(playerId);
            return true;
        }
        return false;
    }

    @Override
    public Optional<List<Player>> getPlayerByRoomId(Long roomId) {
        return playerRepository.findByRoomId(roomId);
    }
}
