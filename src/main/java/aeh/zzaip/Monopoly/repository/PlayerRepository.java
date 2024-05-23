package aeh.zzaip.Monopoly.repository;

import aeh.zzaip.Monopoly.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query(value = "SELECT * FROM player WHERE room_id = ?1", nativeQuery = true)
    Optional<List<Player>> findByRoomId(Long roomId);
}
