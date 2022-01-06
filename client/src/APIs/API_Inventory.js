import Config from "../config";
var baseUrl = Config.api_url;

class API_Inventory {
    async postInventory(inventory){
        var result =
            fetch(`${baseUrl}inventories`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inventory)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateInventory(inventory){
        var result =
            fetch(`${baseUrl}inventories`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inventory)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllInventories(){
        var result =
            fetch(`${baseUrl}inventories`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteInventory(inventoryId){
        var result =
            fetch(`${baseUrl}inventories/${inventoryId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Inventory;