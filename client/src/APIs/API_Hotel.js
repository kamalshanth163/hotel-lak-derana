import Config from "../config";
var baseUrl = Config.api_url;

class API_Hotel {
    async postHotel(hotel){
        var result =
            fetch(`${baseUrl}hotels`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotel)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateHotel(hotel){
        var result =
            fetch(`${baseUrl}hotels`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotel)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllHotels(){
        var result =
            fetch(`${baseUrl}hotels`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteHotel(hotelId){
        var result =
            fetch(`${baseUrl}hotels/${hotelId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Hotel;