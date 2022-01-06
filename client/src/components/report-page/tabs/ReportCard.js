import React from 'react';
import '../../styles/ReportPage.css'

function ReportCard({report, action}) {

    const {id, title, description} = report;
    
    return (
        <div className='report-card'>
            <h3>{title}</h3>
            <p>{description}</p>
            <button className='btn' onClick={() => action(report)}>Generate Report</button>
        </div>
    )
} 

export default ReportCard;