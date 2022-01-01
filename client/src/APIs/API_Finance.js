import Config from "../config";
var baseUrl = Config.api_url;

class API_Finance {
    async postFinance(finance){
        var result =
            fetch(`${baseUrl}finances`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finance)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateFinance(finance){
        var result =
            fetch(`${baseUrl}finances`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finance)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllFinances(){
        var result =
            fetch(`${baseUrl}finances`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteFinance(financeId){
        var result =
            fetch(`${baseUrl}finances/${financeId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Finance;