import Config from "../config";
var baseUrl = Config.api_url;

class API_Attendance {
    async postAttendance(attendance){
        var result =
            fetch(`${baseUrl}attendances`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attendance)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async updateAttendance(attendance){
        var result =
            fetch(`${baseUrl}attendances`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(attendance)           
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async getAllAttendances(){
        var result =
            fetch(`${baseUrl}attendances`)
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }

    async deleteAttendance(attendanceId){
        var result =
            fetch(`${baseUrl}attendances/${attendanceId}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((a) => {
                return a;
            });
        return result;
    }
}

export default API_Attendance;