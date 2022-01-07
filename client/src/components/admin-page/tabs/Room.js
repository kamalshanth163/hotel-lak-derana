import React, { useState, useEffect } from 'react';
  import '../../styles/RoomPage.css';
  import API_Room from '../../../APIs/API_Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';
import {CusBarChart} from '../../charts/customerbar';
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
      $('#room').DataTable(
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

  
  function Room() {
    var initialRoom = {
      id: "",
      number: "",
      availability: "",
      type: "",
      hotel_id: ""
    }
    const [room, setRoom] = useState(initialRoom);
    const [rooms, setRooms] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllRooms();
    })
  
    const getAllRooms = () => {
      new API_Room().getAllRooms().then(data => {
        setRooms([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setRoom({...room, [name]: value});
    }
  
    const handleAdd = (e) => {
      room.hotel_id = room.hotel_id * 1;
      e.preventDefault();
      new API_Room().postRoom(room).then(data => {
        setRoom(initialRoom);
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Room().updateRoom(room).then(data => {
        setRoom(initialRoom);
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setRoom(model);
    }
  
    const handleDelete = (roomId) => {
      if(window.confirm("Are you sure you want to DELETE this Room?")){
        new API_Room().deleteRoom(roomId);
      }
    }
  
    return (

      
    <div className='room-page'>

    <div className='title-and-action'>
      <h3>Room :</h3>

      <form className="form">

           <div className='input'>
              <label for="number"></label>
               <input type="text" placeholder="Number" name="number" id="number" value={room.number} required onChange={(e)=>handleChange(e)}/>
            </div>

            <div className='input selct'>
            <label for="availability">Availability</label>
                   <select name="availability" id="availability" value={room.availability} required onChange={(e)=>handleChange(e)}>
                   <option value="1">Yes</option>
                   <option value="0">No</option>
                 </select>
            </div>

            <div className='input selct'>
              <label for="type">Type</label>
              <select name="type" id="type" value={room.type} defaultValue="Budget" required onChange={(e)=>handleChange(e)}>
                  <option value="Budget">Budget</option>
                  <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div className='input'>
              <label for="hotel_id"></label>
             <input type="number" placeholder="Hotel Id" name="hotel_id" id="hotel_id" value={room.hotel_id} required onChange={(e)=>handleChange(e)}/>
            </div>

            <div className='btns'>
            <button type="submit" className="addBtn"   onClick={(e) => handleAdd(e)}><FontAwesomeIcon className='icon' icon={faUserPlus}/>Add</button>
            <button type="submit" className="editBtn"   onClick={(e) => handleEdit(e)}><FontAwesomeIcon className='icon' icon={faUserCheck}/>Save</button>
            </div>

        </form>

    </div>


  <div className="TableDiv">

      <div>
        <h4>Rooms Table View</h4>
        <hr></hr>
      </div>
  
      <div className="container p-5">
          
          <table id="room" class="table table-hover table-bordered">
          <thead>
            <tr>
                             <th>Id</th>
                             <th>Number</th>
                             <th>Availability</th>
                             <th>Type</th>
                             <th>Hotel Id</th>
                             <th>Action</th>
            </tr>
          </thead>
          <tbody>

          {rooms.map((e, i) => {
                        return (



                          <tr>
                              <td>{e.id}</td>
                              <td>{e.number}</td>
                              <td>{e.availability}</td>
                              <td>{e.type}</td>
                              <td>{e.hotel_id}</td>
                          <td>
                            <button  className="editBtn" onClick={() => handleEditAction(e)}><FontAwesomeIcon className='icon' icon={faUserCheck}    />Edit</button>
                            <button  className="deleteBtn" onClick={() => handleDelete(e.id)}><FontAwesomeIcon className='icon' icon={faUserPlus}  />Delete</button>
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
  
export default Room;