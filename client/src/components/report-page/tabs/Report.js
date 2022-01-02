import React, { useState } from 'react';
import '../../styles/ReportPage.css'
import ReportCard from './ReportCard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import reports from '../reports';
import API_Finance from '../../../APIs/API_Finance';

  function Report() {

    const [data, setData] = useState([]);

    const saveReport = (report, data) => {
      const doc = new jsPDF();
      if(data){
        var keys = Object.keys(data[0]);
        var values = data.map(d => {
          return Object.values(d);
        })
      }
      doc.autoTable({
        head: [keys],
        body: values,
      })
      doc.save(`${report.title}.pdf`);
    }
    
    const generateReport = (report) => {
      switch(report.id){
        case 1:
          generateDailyIncomeReport(report);
          break;
        case 2:
          generateMonthlyIncomeReport(report);
          break;       
        case 3:
          generateYearlyIncomeReport(report);
          break;
        default:
          break;
      }
    }

    const generateDailyIncomeReport = (report) => {
      new API_Finance().getAllFinances().then(data => {
        saveReport(report, data);
      });
    }

    const generateMonthlyIncomeReport = () => {

    }

    const generateYearlyIncomeReport = () => {

    }
  
    return (
      <div className="report-page row">
        <div>
          <hr></hr>
          <h2>Generate Reports</h2>
          <div class="grid-container">
            {reports.map((r, i) => {
              return (
                <div class="grid-item">
                  <ReportCard report={r} action={generateReport}/>
                </div> 
              ) 
            })}
          </div>
        </div>
      </div>
    );
  }
  
export default Report;