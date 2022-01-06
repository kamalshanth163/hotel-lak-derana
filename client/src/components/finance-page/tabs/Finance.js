import React, { useState, useEffect } from 'react';
import '../../styles/FinancePage.css'
import API_Finance from '../../../APIs/API_Finance';
import DateTimeService from '../../../services/DateTimeService';
  
  function Finance() {
    var initialFinance = {
      id: 0,
      amount: 0,
      payer: "",
      description: "",
      recorded_by: 0
    }
    const [finance, setFinance] = useState(initialFinance);
    const [finances, setFinances] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllFinances();
    }, [])
  
    const getAllFinances = () => {
      new API_Finance().getAllFinances().then(data => {
        setFinances([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setFinance({...finance, [name]: value});
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      new API_Finance().postFinance(finance).then(data => {
        setFinance(initialFinance);
        getAllFinances();
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Finance().updateFinance(finance).then(data => {
        setFinance(initialFinance);
        getAllFinances();
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setFinance(model);
    }
  
    const handleDelete = (financeId) => {
      if(window.confirm("Are you sure you want to DELETE this Finance?")){
        new API_Finance().deleteFinance(financeId);
      }
    }
  
    return (
      <div className="finance-page row">
        <div>
          <hr></hr>
          <h2>Manage Finances</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Finance</h3> : <h3>Edit Finance</h3>
                }
              <hr></hr>
              <label for="amount"><b>Amount (LKR)</b></label>
              <input type="number" placeholder="Amount (LKR)" name="amount" id="amount" value={finance.amount} required onChange={(e)=>handleChange(e)}/>

              <label for="payer"><b>Payer</b></label>
              <input type="text" placeholder="Payer" name="payer" id="payer" value={finance.payer} required onChange={(e)=>handleChange(e)}/>
              
              <label for="description"><b>Description</b></label>
              <input type="text" placeholder="Description" name="description" id="description" value={finance.description} required onChange={(e)=>handleChange(e)}/>
              
              <label for="recorded_by"><b>Recorded By</b></label>
              <input type="number" placeholder="Recorded By" name="recorded_by" id="recorded_by" value={finance.recorded_by} required onChange={(e)=>handleChange(e)}/>
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
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th></th>
                        </tr>
                        {finances.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{e.amount}</td>
                              <td>{e.payer}</td>
                              <td>{e.description}</td>
                              <td>{e.recorded_by}</td>
                              <td>{new DateTimeService().getLocalDateTime(e.created_at).toLocaleString()}</td>
                              <td>{new DateTimeService().getLocalDateTime(e.updated_at).toLocaleString()}</td>
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
  
export default Finance;