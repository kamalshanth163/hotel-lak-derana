import React, { useState, useEffect } from 'react';
import '../../styles/EmployeePage.css';
import API_Employee from '../../../APIs/API_Employee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';

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

  <div className='employee-tab'>

    <div className='title-and-action'>
        <h3>Employee :</h3>

          <form className="form">

            <div className='div1'>
              <div className='input'>
                <label for="name"></label>
                <input type="text" placeholder="Name" name="name" id="name" value={employee.name} required onChange={(e)=>handleChange(e)}/>
              </div>
              <div className='input'>
                <label for="department"></label>
                <input type="text" placeholder="Department" name="department" id="department" value={employee.department} required onChange={(e)=>handleChange(e)}/>
              </div>
            </div>

            <div className='div2'> 
              {/* <div className='input'>
                <label for="role"></label>
                <input type="text" placeholder="Role" name="role" id="role" value={employee.role} required onChange={(e)=>handleChange(e)}/>
              </div> */}

              <div className='input'>
                <label for="role"><b>Role</b></label>
                  <select name="role" id="role" value={employee.role} required onChange={(e)=>handleChange(e)}>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Reservation Manager">Reservation Manager</option>
                    <option value="Human Resource Manager">Human Resource Manager</option>
                  </select>
              </div>

              <div className='input'>
                <label for="email"></label>
                <input type="text" placeholder="Email" name="email" id="email" value={employee.email} required onChange={(e)=>handleChange(e)}/>
              </div>
            </div>

            <div className='div3'>  
                <div className='input'>
                  <label for="phone"></label>
                  <input type="number" placeholder="Phone" name="phone" id="phone" value={employee.phone} required onChange={(e)=>handleChange(e)}/>
                </div>
                <div className='input'>
                  <label for="password"></label>
                  <input type="text" placeholder="Password" name="password" id="password" value={employee.password} required onChange={(e)=>handleChange(e)}/>
                </div>
            </div>

            <div className='btns'>
              <button type="submit" className="addBtn"   onClick={(e) => handleAdd(e)} ><FontAwesomeIcon className='icon' icon={faUserPlus} />Add</button>
              <button type="submit" className="editBtn"  onClick={(e) => handleEdit(e)} ><FontAwesomeIcon className='icon' icon={faUserCheck} />Save</button>
            </div>
          </form>
    </div>

    <div className="TableDiv">
      <div>
        <h4>Payments Table View</h4>
        <hr></hr>
      </div>

    <div className="container p-5">
      <table id="employee" class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>

            {employees.map((e, i) => {
                          return (
                            <tr>
                                      <td>{e.id}</td>
                                      <td>{e.name}</td>
                                      <td>{e.department}</td>
                                      <td>{e.role}</td>
                                      <td>{e.email}</td>
                                      <td>{e.phone}</td>
                              <td>
                                <button className="editBtn" onClick={() => handleEditAction(e)}><FontAwesomeIcon className='icon' icon={faUserCheck} />Edit</button>
                                <button className="deleteBtn" onClick={() => handleDelete(e.id)}><FontAwesomeIcon className='icon' icon={faUserPlus} />Delete</button>
                              </td>
                            </tr>

                          )
                        })}
        
          </tbody>
        </table>
      
    </div>
    </div>                                  

  </div>

  );
}

export default Employee;