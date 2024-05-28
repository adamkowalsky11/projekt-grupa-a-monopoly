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

    updatePlayerById(playerId, player) {
        return axios.post(PLAYERS + '/updatePlayerById/' + playerId, player);
    }

    getPlayerById(playerId) {
        return axios.get(PLAYERS + '/getPlayerById/' + playerId);
    }
}

export default new PlayerService();