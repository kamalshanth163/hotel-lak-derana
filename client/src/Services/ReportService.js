class ReportService {

    constructor(){
        this.data = [];
    }

    generateDailyIncomeReport(){
        console.log("Generating daily report...");
        this.data = ['A', 'B', 'C']
    }

    generateMonthlyIncomeReport(){
        console.log("Generating monthly report...");
        this.data = ['1', '2', '3']
    }

    generateYearlyIncomeReport(){
        console.log("Generating yearly report...");
        this.data = ['aa', 'bb', 'cc']
    }
}

export default ReportService;