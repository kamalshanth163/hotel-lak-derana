import React, { useState, useEffect } from 'react';
  import '../../styles/StaffPage.css'
  import API_Attendance from '../../../APIs/API_Attendance';
  import DateTimeService from '../../../services/DateTimeService';
  
  function Attendance() {
    var initialAttendance = {
      id: 0,
      entered: new Date().toDateString(),
      exited: new Date().toDateString(),
      customer_id: 0,
      room_id: 0
    }
    const [attendance, setAttendance] = useState(initialAttendance);
    const [attendances, setAttendances] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllAttendances();
    }, [])
  
    const getAllAttendances = () => {
      new API_Attendance().getAllAttendances().then(data => {
        setAttendances([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setAttendance({...attendance, [name]: value});
    }
  
    const handleAdd = (e) => {
      console.log(attendance)
      e.preventDefault();
      new API_Attendance().postAttendance(attendance).then(data => {
        setAttendance(initialAttendance);
        getAllAttendances();
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Attendance().updateAttendance(attendance).then(data => {
        setAttendance(initialAttendance);
        getAllAttendances();
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setAttendance(model);
    }
  
    const handleDelete = (attendanceId) => {
      if(window.confirm("Are you sure you want to DELETE this Attendance?")){
        new API_Attendance().deleteAttendance(attendanceId).then(data => {
          getAllAttendances();
        });
      }
    }
  
    return (
      <div className="attendance-page row">
        <div>
          <hr></hr>
          <h2>Manage Attendances</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Attendance</h3> : <h3>Edit Attendance</h3>
                }
              <hr></hr>
              <label for="entered"><b>Entered</b></label>
              <input type="date" placeholder="Entered" name="entered" id="entered" value={attendance.entered} required onChange={(e)=>handleChange(e)}/>
              <br></br>
              <br></br>

              <label for="exited"><b>Exited</b></label>
              <input type="date" placeholder="Exited" name="exited" id="exited" value={attendance.exited} required onChange={(e)=>handleChange(e)}/>
              <br></br>
              <br></br>
              
              <label for="hr_id"><b>HR Id</b></label>
              <input type="number" placeholder="HR Id" name="hr_id" id="hr_id" value={attendance.hr_id} required onChange={(e)=>handleChange(e)}/>
              
              <label for="employee_id"><b>Employee Id</b></label>
              <input type="number" placeholder="Employee Id" name="employee_id" id="employee_id" value={attendance.employee_id} required onChange={(e)=>handleChange(e)}/>
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
                          <th>Entered</th>
                          <th>Exited</th>
                          <th>HR Id</th>
                          <th>Employee Id</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th></th>
                        </tr>
                        {attendances.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{new Date(e.entered).toDateString()}</td>
                              <td>{new Date(e.exited).toDateString()}</td>
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
  
export default Attendance;