import React, { useState, useEffect } from 'react';
  import '../../styles/StaffPage.css'
  import API_Salary from '../../../APIs/API_Salary';
  import DateTimeService from '../../../services/DateTimeService';
  
  function Salary() {
    var initialSalary = {
      id: 0,
      basic_salary: 0,
      over_time: 0,
      allowance: 0,
      leaves: 0,
      deduction: 0,
      final_amount: 0,
      customer_id: 0,
      room_id: 0
    }
    const [salary, setSalary] = useState(initialSalary);
    const [salaries, setSalaries] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllSalaries();
    }, [])
  
    const getAllSalaries = () => {
      new API_Salary().getAllSalaries().then(data => {
        setSalaries([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setSalary({...salary, [name]: value});
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      new API_Salary().postSalary(salary).then(data => {
        setSalary(initialSalary);
        getAllSalaries();
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Salary().updateSalary(salary).then(data => {
        setSalary(initialSalary);
        getAllSalaries();
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setSalary(model);
    }
  
    const handleDelete = (salaryId) => {
      if(window.confirm("Are you sure you want to DELETE this Salary?")){
        new API_Salary().deleteSalary(salaryId);
      }
    }
  
    return (
      <div className="salary-page row">
        <div>
          <hr></hr>
          <h2>Manage Salaries</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Salary</h3> : <h3>Edit Salary</h3>
                }
              <hr></hr>
              <label for="basic_salary"><b>Basic Salary (LKR)</b></label>
              <input type="number" placeholder="Basic Salary" name="basic_salary" id="basic_salary" value={salary.basic_salary} required onChange={(e)=>handleChange(e)}/>

              <label for="over_time"><b>Overtime (LKR)</b></label>
              <input type="number" placeholder="Overtime" name="over_time" id="over_time" value={salary.over_time} required onChange={(e)=>handleChange(e)}/>

              <label for="allowance"><b>Allowance (LKR)</b></label>
              <input type="number" placeholder="Allowance" name="allowance" id="allowance" value={salary.allowance} required onChange={(e)=>handleChange(e)}/>

              <label for="leaves"><b>Leaves</b></label>
              <input type="number" placeholder="Leaves" name="leaves" id="leaves" value={salary.leaves} required onChange={(e)=>handleChange(e)}/>

              <label for="deduction"><b>Deduction (LKR)</b></label>
              <input type="number" placeholder="Deduction" name="deduction" id="deduction" value={salary.deduction} required onChange={(e)=>handleChange(e)}/>

              <label for="final_amount"><b>Final Amount (LKR)</b></label>
              <input type="number" placeholder="Final Amount" name="final_amount" id="final_amount" value={salary.final_amount} required onChange={(e)=>handleChange(e)}/>
              
              <label for="hr_id"><b>HR Id</b></label>
              <input type="number" placeholder="HR Id" name="hr_id" id="hr_id" value={salary.hr_id} required onChange={(e)=>handleChange(e)}/>
              
              <label for="employee_id"><b>Employee Id</b></label>
              <input type="number" placeholder="Employee Id" name="employee_id" id="employee_id" value={salary.employee_id} required onChange={(e)=>handleChange(e)}/>
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
                          <th>Basic Salary (LKR)</th>
                          <th>Overtime (LKR)</th>
                          <th>Allowance (LKR)</th>
                          <th>Leaves</th>
                          <th>Deduction (LKR)</th>
                          <th>Final Amount (LKR)</th>
                          <th>HR Id</th>
                          <th>Employee Id</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th></th>
                        </tr>
                        {salaries.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{e.basic_salary}</td>
                              <td>{e.over_time}</td>
                              <td>{e.allowance}</td>
                              <td>{e.leaves}</td>
                              <td>{e.deduction}</td>
                              <td>{e.final_amount}</td>
                              <td>{e.hr_id}</td>
                              <td>{e.employee_id}</td>
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
  
export default Salary;