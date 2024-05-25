package aeh.zzaip.Monopoly.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "player")
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long playerId;
    private String nick;
    private int money;
    private int location;
    private int number;
    private String pawn;
    private Long roomId;
}
