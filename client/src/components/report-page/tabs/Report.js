import React from 'react';
import '../../styles/ReportPage.css'
  
  function Report() {
  
    return (
      <div className="report-page row">
        <div>
          <hr></hr>
          <h2>Manage Reports</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Report</h3> : <h3>Edit Report</h3>
                }
              <hr></hr>
              <label for="amount"><b>Amount (LKR)</b></label>
              <input type="number" placeholder="Amount (LKR)" name="amount" id="amount" value={report.amount} required onChange={(e)=>handleChange(e)}/>

              <label for="payer"><b>Payer</b></label>
              <input type="text" placeholder="Payer" name="payer" id="payer" value={report.payer} required onChange={(e)=>handleChange(e)}/>
              
              <label for="description"><b>Description</b></label>
              <input type="text" placeholder="Description" name="description" id="description" value={report.description} required onChange={(e)=>handleChange(e)}/>
              
              <label for="recorded_by"><b>Recorded By</b></label>
              <input type="number" placeholder="Recorded By" name="recorded_by" id="recorded_by" value={report.recorded_by} required onChange={(e)=>handleChange(e)}/>
              <br></br>
  
              {action === 'add' ? 
              <button type="submit" className="addBtn" onClick={(e) => handleAdd(e)}>Add</button> :
              <button type="submit" className="editBtn" onClick={(e) => handleEdit(e)}>Save</button>
              }
              </div>        
          </form>
          </td>
          <td className="right-col">
              <div className="panel">
                    <table>
  
                      <div className="table-body">
                        <tr className="th-row">
                          <th>Id</th>
                          <th>Amount</th>
                          <th>Payer</th>
                          <th>Description</th>
                          <th>Recorded By</th>
                          <th></th>
                        </tr>
                        {reports.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{e.amount}</td>
                              <td>{e.payer}</td>
                              <td>{e.description}</td>
                              <td>{e.recorded_by}</td>
                              <td>
                                <button className="edit-btn btn" onClick={() => handleEditAction(e)}>Edit</button>
                              </td>
                              <td>
                                <button className="delete-btn btn" onClick={() => handleDelete(e.id)}>Delete</button>
                              </td>
                            </tr>
                          )
                        })}
                      </div>
                      </table> 
              </div>
          </td>
        </tr>
      </table>       
      </div>
  
        </div>
    );
  }
  
export default Report;