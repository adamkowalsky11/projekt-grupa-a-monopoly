package aeh.zzaip.Monopoly.repository;

import aeh.zzaip.Monopoly.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
}
