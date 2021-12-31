import React, { useState, useEffect } from 'react';
  import '../../styles/Admin.css'
  import API_Room from '../../../APIs/API_Room';
  
  function Room() {
    var initialRoom = {
      id: "",
      number: "",
      availability: 1,
      type: "Budget",
      hotel_id: 0
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
      console.log(room)
    }
  
    const handleDelete = (roomId) => {
      if(window.confirm("Are you sure you want to DELETE this Room?")){
        new API_Room().deleteRoom(roomId);
      }
    }
  
    return (
      <div className="room-page row">
        <div>
          <hr></hr>
          <h2>Manage Rooms</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Room</h3> : <h3>Edit Room</h3>
                }
              <hr></hr>
              <label for="number"><b>Number</b></label>
              <input type="text" placeholder="Number" name="number" id="number" value={room.number} required onChange={(e)=>handleChange(e)}/>
  
              <label for="availability"><b>Availability</b></label>
              {/* <input type="number" placeholder="Availability" name="availability" id="availability" value={room.availability} required onChange={(e)=>handleChange(e)}/> */}
              <select name="availability" id="availability" value={room.availability} required onChange={(e)=>handleChange(e)}>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <br></br>
              <br></br>

              <label for="type"><b>Type</b></label>
              {/* <input type="text" placeholder="Type" name="type" id="type" value={room.type} required onChange={(e)=>handleChange(e)}/> */}
              <select name="type" id="type" value={room.type} defaultValue="Budget" required onChange={(e)=>handleChange(e)}>
                <option value="Budget">Budget</option>
                <option value="Luxury">Luxury</option>
              </select>
              <br></br>
              <br></br>
              
              <label for="hotel_id"><b>Hotel Id</b></label>
              <input type="number" placeholder="Hotel Id" name="hotel_id" id="hotel_id" value={room.hotel_id} required onChange={(e)=>handleChange(e)}/>
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
                          <th>Number</th>
                          <th>Availability</th>
                          <th>Type</th>
                          <th>Hotel Id</th>
                          <th></th>
                        </tr>
                        {rooms.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{e.number}</td>
                              <td>{e.availability}</td>
                              <td>{e.type}</td>
                              <td>{e.hotel_id}</td>
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
  
export default Room;