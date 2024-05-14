package aeh.zzaip.Monopoly;

import aeh.zzaip.Monopoly.model.Player;
import aeh.zzaip.Monopoly.service.PlayerService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MonopolyApplication {

	public static void main(String[] args) {
		SpringApplication.run(MonopolyApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(PlayerService playerService) {
		return args -> {
			Player player = new Player();
			player.setNick("John Doe");
			player.setMoney(1000);

			playerService.addPlayer(player);
		};
	}

}
