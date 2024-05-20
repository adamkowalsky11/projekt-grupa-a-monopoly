package aeh.zzaip.Monopoly.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "gameroom")
@Data
public class GameRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long gameRoomId;
    private String gameRoomName;
    private boolean isRoomClosedToJoin;
}
