package aeh.zzaip.Monopoly.repository;

import aeh.zzaip.Monopoly.model.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRoomRepository extends JpaRepository<GameRoom, Long> {
}
