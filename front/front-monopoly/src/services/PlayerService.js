import axios from 'axios';

const PLAYERS = 'http://localhost:9090/api/players';

class PlayerService {
    createPlayer(player) {
        return axios.post(PLAYERS + '/addPlayer', player);
    }

    getPlayerByRoomId(roomId) {
        return axios.get(PLAYERS + '/getPlayerByRoomId/' + roomId);
    }

    getPlayerNextNumberByRoomId(roomId) {
        return axios.get(PLAYERS + '/getPlayerNextNumberByRoomId/' + roomId);
    }
}

export default new PlayerService();