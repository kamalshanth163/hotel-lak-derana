import Config from "../config";
var baseUrl = Config.api_url;

class API_Salary {
    async postSalary(salary){
        var result =
            fetch(`${baseUrl}salaries`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(salary)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateSalary(salary){
        var result =
            fetch(`${baseUrl}salaries`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(salary)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllSalaries(){
        var result =
            fetch(`${baseUrl}salaries`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteSalary(salaryId){
        var result =
            fetch(`${baseUrl}salaries/${salaryId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Salary;