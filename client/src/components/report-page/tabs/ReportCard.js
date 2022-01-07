import React from 'react';
import '../../styles/ReportPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf} from '@fortawesome/free-solid-svg-icons';

function ReportCard({report, action}) {

    const {id, title, description} = report;
    
    return (
        <div className='card'>
            <div><FontAwesomeIcon className='icon' icon={faFilePdf} /></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => action(report)}>Generate Report</button>
        </div>
    )
} 

export default ReportCard;