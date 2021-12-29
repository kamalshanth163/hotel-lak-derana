import React, { useState, useEffect } from 'react';
import '../../styles/Admin.css'
import API_Employee from '../../../APIs/API_Employee';

function Employee() {
  var initialEmployee = {
    id: "",
    name: "",
    department: "",
    role: "",
    email: "",
    phone: "",
    password: ""
  }
  const [employee, setEmployee] = useState(initialEmployee);
  const [employees, setEmployees] = useState([]);
  const [action, setAction] = useState("add");

  useEffect(() => {
    getAllEmployees();
  })

  const getAllEmployees = () => {
    new API_Employee().getAllEmployees().then(data => {
      setEmployees([...data]);
    });
  }

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setEmployee({...employee, [name]: value});
  }

  const handleAdd = (e) => {
    e.preventDefault();
    new API_Employee().postEmployee(employee).then(data => {
      setEmployee(initialEmployee);
    });
  }

  const handleEdit = (e) => {
    e.preventDefault();
    new API_Employee().updateEmployee(employee).then(data => {
      setEmployee(initialEmployee);
    });
    setAction("add");
  }

  const handleEditAction = (model) => {
    setAction("edit");
    setEmployee(model);
    console.log(employee)
  }

  const handleDelete = (employeeId) => {
    if(window.confirm("Are you sure you want to DELETE this Employee?")){
      new API_Employee().deleteEmployee(employeeId);
    }
  }

  return (
    <div className="employee-page row">
      <div>
        <hr></hr>
        <h2>Manage Employees</h2>
      <table className="layout">
      <tr>
        <td className="left-col">
        <form className="form">
            <div class="container">
            {action === 'add' ? 
                <h3>Add an Employee</h3> : <h3>Edit Employee</h3>
              }
            <hr></hr>
            <label for="name"><b>Name</b></label>
            <input type="text" placeholder="Name" name="name" id="name" value={employee.name} required onChange={(e)=>handleChange(e)}/>

            <label for="department"><b>Department</b></label>
            <input type="text" placeholder="Department" name="department" id="department" value={employee.department} required onChange={(e)=>handleChange(e)}/>

            <label for="role"><b>Role</b></label>
            <input type="text" placeholder="Role" name="role" id="role" value={employee.role} required onChange={(e)=>handleChange(e)}/>
            
            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Email" name="email" id="email" value={employee.email} required onChange={(e)=>handleChange(e)}/>

            <label for="phone"><b>Phone</b></label>
            <input type="number" placeholder="Phone" name="phone" id="phone" value={employee.phone} required onChange={(e)=>handleChange(e)}/>
            
            <label for="password"><b>Password</b></label>
            <input type="text" placeholder="Password" name="password" id="password" value={employee.password} required onChange={(e)=>handleChange(e)}/>
            <br></br>

            {action === 'add' ? 
            <button type="submit" className="addEmployeeBtn" onClick={(e) => handleAdd(e)}>Add</button> :
            <button type="submit" className="editEmployeeBtn" onClick={(e) => handleEdit(e)}>Save</button>
            }
            </div>        
        </form>
        </td>
        <td className="right-col">
            <div className="panel">
                  <table>

                    <div className="table-body">
                      <tr className="th-row">
                        <th>No.</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                      </tr>
                      {employees.map((e, i) => {
                        return (
                          <tr className="td-row">
                            <td>{i + 1}</td>
                            <td>{e.name}</td>
                            <td>{e.department}</td>
                            <td>{e.role}</td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td>
                              <button className="edit-btn btn" onClick={() => handleEditAction(e)}>Edit</button>
                            </td>
                            <td>
                              <button className="delete-btn btn" onClick={() => handleDelete(e.Id)}>Delete</button>
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

export default Employee;