import Config from "../config";
var baseUrl = Config.api_url;

class API_Reservation {
    async postReservation(reservation){
        var result =
            fetch(`${baseUrl}reservations`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservation)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateReservation(reservation){
        var result =
            fetch(`${baseUrl}reservations`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservation)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllReservations(){
        var result =
            fetch(`${baseUrl}reservations`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteReservation(reservationId){
        var result =
            fetch(`${baseUrl}reservations/${reservationId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Reservation;