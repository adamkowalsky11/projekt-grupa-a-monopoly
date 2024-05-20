import axios from 'axios';

const PLAYERS = 'http://localhost:9090/api/players/addPlayer';

class PlayerService {
    createPlayer(player) {
        return axios.post(PLAYERS, player); 
    }
}

export default new PlayerService();