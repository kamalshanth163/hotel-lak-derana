import Config from "../config";
var baseUrl = Config.api_url;

class API_Customer {
    async postCustomer(customer){
        var result =
            fetch(`${baseUrl}customers`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateCustomer(customer){
        var result =
            fetch(`${baseUrl}customers`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllCustomers(){
        var result =
            fetch(`${baseUrl}customers`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteCustomer(customerId){
        var result =
            fetch(`${baseUrl}customers/${customerId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Customer;