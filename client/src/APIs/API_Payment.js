import Config from "../config";
var baseUrl = Config.api_url;

class API_Payment {
    async postPayment(payment){
        var result =
            fetch(`${baseUrl}payments`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payment)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updatePayment(payment){
        var result =
            fetch(`${baseUrl}payments`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payment)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllPayments(){
        var result =
            fetch(`${baseUrl}payments`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deletePayment(paymentId){
        var result =
            fetch(`${baseUrl}payments/${paymentId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Payment;