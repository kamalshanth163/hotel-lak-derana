  import React, { useState, useEffect } from 'react';
  import '../../styles/Attendance.css';
  import API_Attendance from '../../../APIs/API_Attendance';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';

  //Bootstrap and jQuery libraries
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'jquery/dist/jquery.min.js';
  //Datatable Modules
  import "datatables.net-dt/js/dataTables.dataTables"
  import "datatables.net-dt/css/jquery.dataTables.min.css"
  import "datatables.net-buttons/js/dataTables.buttons.js"
  import "datatables.net-buttons/js/buttons.colVis.js"
  import "datatables.net-buttons/js/buttons.flash.js"
  import "datatables.net-buttons/js/buttons.html5.js"
  import "datatables.net-buttons/js/buttons.print.js"
  import "datatables.net-dt/css/jquery.dataTables.min.css"
  import $ from 'jquery';


    //initialize datatable
    $(document).ready(function () {
      setTimeout(function(){
      $('#attendance').DataTable(
          {
              pagingType: 'full_numbers',
                pageLength: 5,
                processing: true,
                dom: 'Bfrtip',
                    buttons: ['copy', 'csv', 'print'
                    ]
          }
      );
      } ,
      1000
      );
    });




  
  function Attendance() {
    var initialAttendance = {
      id: "",
      entered: new Date().toDateString(),
      exited: new Date().toDateString(),
      customer_id: "",
      room_id: ""
    }
    const [attendance, setAttendance] = useState(initialAttendance);
    const [attendances, setAttendances] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllAttendances();
    })
  
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
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Attendance().updateAttendance(attendance).then(data => {
        setAttendance(initialAttendance);
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setAttendance(model);
    }
  
    const handleDelete = (attendanceId) => {
      if(window.confirm("Are you sure you want to DELETE this Attendance?")){
        new API_Attendance().deleteAttendance(attendanceId);
      }
    }
  
    return (

      <div className='attendance-tab'>

          <div className='title-and-action'>
               <h3>Attendance :</h3>

        <form className="form">


        <div className='div1'> 
        <div className='input'> 
              <label for="employee_id"></label>
                <input type="number" placeholder="Employee Id" name="employee_id" id="employee_id" value={attendance.employee_id} required onChange={(e)=>handleChange(e)}/>
              </div>


              <div className='input'>
                <label for="entered"> Check-in</label>
               <input type="date"  name="entered" id="entered" value={attendance.entered} required onChange={(e)=>handleChange(e)}/>
              </div>

        </div>
        <div className='div2'> 

        <div className='input'>

              <div className='input'>
                <label for="exited">Check-out</label>
               <input type="date"  name="exited" id="exited" value={attendance.exited} required onChange={(e)=>handleChange(e)}/>
              </div>

        </div>

              <div className='input'>

              <label for="hr_id"></label>
             <input type="number" placeholder="HR Id" name="hr_id" id="hr_id" value={attendance.hr_id} required onChange={(e)=>handleChange(e)}/>
              </div>


        </div>



        <div className='div3'> 

        <div className='input'>
              <label for="employee_id"></label>
              <input type="number" placeholder="Employee Id" name="employee_id" id="employee_id" value={attendance.employee_id} required onChange={(e)=>handleChange(e)}/>
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
          <h4>Attendances Table View</h4>
          <hr></hr>
        </div>
    
        <div className="container p-5">
            
            <table id="attendance" class="table table-hover table-bordered ">
            <thead>
              <tr>
              <th>Id</th>
              <th>Check-in</th>
              <th>Checl-out</th>
              <th>HR Id</th>
              <th>Employee Id</th>
              <th>Action</th>
              </tr>
            </thead>
            <tbody>

            {attendances.map((e, i) => {
                          return (
                            <tr>
                              <td>{e.id}</td>
                               <td>{new Date(e.entered).toDateString()}</td>
                               <td>{new Date(e.exited).toDateString()}</td>
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


      {/* <div className='ChartDiv'>

        <div>
      <h4>Attendances <br /> Graphical View</h4>
        <hr></hr>
        </div>

        <div className='chart'>
        <ResBarChart />
        </div>

      </div> */}
  
        </div>

















    );
  }
  
export default Attendance;