import Config from "../config";
var baseUrl = Config.api_url;

class API_Room {
    async postRoom(room){
        var result =
            fetch(`${baseUrl}rooms`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(room)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateRoom(room){
        var result =
            fetch(`${baseUrl}rooms`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(room)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllRooms(){
        var result =
            fetch(`${baseUrl}rooms`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteRoom(roomId){
        var result =
            fetch(`${baseUrl}rooms/${roomId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Room;