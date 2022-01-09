import Config from "../config";
var baseUrl = Config.api_url;

class API_Employee {
    async postEmployee(employee){
        var result =
            fetch(`${baseUrl}employees`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateEmployee(employee){
        var result =
            fetch(`${baseUrl}employees`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllEmployees(){
        var result =
            fetch(`${baseUrl}employees`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteEmployee(employeeId){
        var result =
            fetch(`${baseUrl}employees/${employeeId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async loginUser(user){
        var result =
            fetch(`${baseUrl}employees/login`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Employee;