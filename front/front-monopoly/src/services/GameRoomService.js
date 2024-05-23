import axios from 'axios';

const GAMEROOM = 'http://localhost:9090/api/gamerooms';

class GameRoomService {
    getAllGameRooms(){
        return axios.get(GAMEROOM + '/getAllGameRooms')
    }

    createGameRoom(gameRoom) {
        return axios.post(GAMEROOM + '/addGameRoom', gameRoom); 
    }

    updateGameRoomById(gameRoomId, gameRoom) {
        return axios.post(GAMEROOM + '/updateGameRoomById/' + gameRoomId, gameRoom);
    }

    getGameRoomById(gameRoomId) {
        return axios.get(GAMEROOM + '/getGameRoomById/' + gameRoomId);
    }
}

export default new GameRoomService();