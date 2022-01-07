import React, { useEffect, useState } from 'react';
import '../../styles/ReportPage.css'
import ReportCard from './ReportCard';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import reports from '../reports';
import API_Finance from '../../../APIs/API_Finance';
import DateTimeService from '../../../services/DateTimeService';

  function Report() {
    
    const saveReport = (report, data) => {
      const doc = new jsPDF();
      if(data.length < 1){
        return false;
      }
      var keys = Object.keys(data[0]);
      var values = data.map(d => {
        return Object.values(d);
      })
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
        var mapped = data.filter((d) => {
          var dateTimeService = new DateTimeService(calculateTimeDifference(d.created_at));
          d.created_at = dateTimeService.getLocalDateTime(d.created_at).toLocaleString();
          d.updated_at = dateTimeService.getLocalDateTime(d.updated_at).toLocaleString();
          console.log(dateTimeService.days)
          return dateTimeService.days < 1;
        })
        saveReport(report, mapped);
      });
    }
      
    const generateMonthlyIncomeReport = (report) => {
      new API_Finance().getAllFinances().then(data => {
        var mapped = data.filter((d) => {
          var dateTimeService = new DateTimeService(calculateTimeDifference(d.created_at));
          d.created_at = dateTimeService.getLocalDateTime(d.created_at).toLocaleString();
          d.updated_at = dateTimeService.getLocalDateTime(d.updated_at).toLocaleString();
          return dateTimeService.months < 1;
        })
        saveReport(report, mapped);
      });
    }
    
    const generateYearlyIncomeReport = (report) => {
      new API_Finance().getAllFinances().then(data => {
        var mapped = data.filter((d) => {
          var dateTimeService = new DateTimeService(calculateTimeDifference(d.created_at));
          d.created_at = dateTimeService.getLocalDateTime(d.created_at).toLocaleString();
          d.updated_at = dateTimeService.getLocalDateTime(d.updated_at).toLocaleString();
          return dateTimeService.years < 1;
        })
        saveReport(report, mapped);
      });
    }
    
    const calculateTimeDifference = (d) => {
      var date = new Date(d);
      console.log(d)
      var localDate = new Date(date.setMinutes(date.getMinutes() - 330));
      var ms = new Date() - localDate;
      console.log(ms)
      return ms;
    }

    return (
      <div className='page-report-div'>
          <div className='flex-wrap-div'>
            {reports.map((r, i) => {
              return (
                <div>
                  <ReportCard report={r} action={generateReport}/>
                </div> 
              ) 
            })}
          </div>
      </div>
    );
  }
  
export default Report;