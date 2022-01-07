import React, { useState, useEffect } from 'react';
  import '../../styles/Salary.css'
  import API_Salary from '../../../APIs/API_Salary';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';
  
  function Salary() {
    var initialSalary = {
      id: "",
      basic_salary: "",
      over_time: "",
      allowance: "",
      leaves: "",
      deduction: "",
      final_amount: "",
      customer_id: "",
      room_id: ""
    }
    const [salary, setSalary] = useState(initialSalary);
    const [salaries, setSalaries] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllSalaries();
    })
  
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
      console.log(salary)
      e.preventDefault();
      new API_Salary().postSalary(salary).then(data => {
        setSalary(initialSalary);
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Salary().updateSalary(salary).then(data => {
        setSalary(initialSalary);
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

      <div className='salary-tab'>

      <div className='title-and-action'>
           <h3>Salary :</h3>

    <form className="form">

    <div className='div1'> 

        <div className='input'> 
          <label for="basic_salary"></label>
          <input type="number" placeholder="Basic Salary" name="basic_salary" id="basic_salary" value={salary.basic_salary} required onChange={(e)=>handleChange(e)}/>
        </div>


          <div className='input'>
            <label for="over_time"></label>
            <input type="number" placeholder="Overtime" name="over_time" id="over_time" value={salary.over_time} required onChange={(e)=>handleChange(e)}/>
          </div>

          <div className='input'>
            <label for="allowance"></label>
            <input type="number" placeholder="Allowance" name="allowance" id="allowance" value={salary.allowance} required onChange={(e)=>handleChange(e)}/>
          </div>

    </div>
    <div className='div2'> 

          <div className='input'>
              <label for="leaves"></label>
              <input type="number" placeholder="Leaves" name="leaves" id="leaves" value={salary.leaves} required onChange={(e)=>handleChange(e)}/>
          </div>

          <div className='input'>
              <label for="deduction"></label>
              <input type="number" placeholder="Deduction" name="deduction" id="deduction" value={salary.deduction} required onChange={(e)=>handleChange(e)}/>
          </div>

          <div className='input'>
              <label for="final_amount"></label>
              <input type="number" placeholder="Final Amount" name="final_amount" id="final_amount" value={salary.final_amount} required onChange={(e)=>handleChange(e)}/>
          </div>

    </div>

    <div className='div3'> 

        <div className='input'>
                  <label for="hr_id"></label>
                  <input type="number" placeholder="HR Id" name="hr_id" id="hr_id" value={salary.hr_id} required onChange={(e)=>handleChange(e)}/>
        </div>

        <div className='input'>
              <label for="employee_id"></label>
              <input type="number" placeholder="Employee Id" name="employee_id" id="employee_id" value={salary.employee_id} required onChange={(e)=>handleChange(e)}/>
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
      <h4>Salaries Table View</h4>
      <hr></hr>
    </div>

    <div className="container p-5">
        
        <table id="attendance" class="table table-hover table-bordered ">
        <thead>
          <tr>
                           <th>Id</th>
                           <th>Basic Salary (LKR)</th>
                           <th>Overtime (LKR)</th>
                           <th>Allowance (LKR)</th>
                           <th>Leaves</th>
                           <th>Deduction (LKR)</th>
                           <th>Final Amount (LKR)</th>
                           <th>HR Id</th>
                           <th>Employee Id</th>
                           <th>Action</th>

          </tr>
        </thead>
        <tbody>

        {salaries.map((e, i) => {
                      return (
                        <tr>

                         <td>{e.id}</td>
                               <td>{e.basic_salary}</td>
                               <td>{e.over_time}</td>
                               <td>{e.allowance}</td>
                               <td>{e.leaves}</td>
                               <td>{e.deduction}</td>
                               <td>{e.final_amount}</td>
                               <td>{e.hr_id}</td>
                               <td>{e.employee_id}</td>
                          <td>
                            <button className="deleteBtn" onClick={() => handleDelete(e.id)}><FontAwesomeIcon className='icon' icon={faUserPlus} />Delete</button>
                            <button className="editBtn" onClick={() => handleEditAction(e)}><FontAwesomeIcon className='icon' icon={faUserCheck} />Edit</button>
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
  
export default Salary;