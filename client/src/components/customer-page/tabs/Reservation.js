import React, { useState, useEffect } from 'react';
  import '../../styles/CustomerPage.css'
  import API_Reservation from '../../../APIs/API_Reservation';
  import DateTimeService from '../../../services/DateTimeService';
  
  function Reservation() {
    var initialReservation = {
      id: 0,
      adults_count: 0,
      children_count: 0,
      customer_id: 0,
      room_id: 0,
      checked_out: 0
    }
    const [reservation, setReservation] = useState(initialReservation);
    const [reservations, setReservations] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllReservations();
    }, [])
  
    const getAllReservations = () => {
      new API_Reservation().getAllReservations().then(data => {
        setReservations([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setReservation({...reservation, [name]: value});
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      new API_Reservation().postReservation(reservation).then(data => {
        setReservation(initialReservation);
        getAllReservations();
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Reservation().updateReservation(reservation).then(data => {
        setReservation(initialReservation);
        getAllReservations();
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setReservation(model);
    }
  
    const handleDelete = (reservationId) => {
      if(window.confirm("Are you sure you want to DELETE this Reservation?")){
        new API_Reservation().deleteReservation(reservationId);
      }
    }
  
    return (
      <div className="reservation-page row">
        <div>
          <hr></hr>
          <h2>Manage Reservations</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Reservation</h3> : <h3>Edit Reservation</h3>
                }
              <hr></hr>
              <label for="adults_count"><b>Adults Count</b></label>
              <input type="number" placeholder="Adults Count" name="adults_count" id="adults_count" value={reservation.adults_count} required onChange={(e)=>handleChange(e)}/>
              
              <label for="children_count"><b>Children Count</b></label>
              <input type="number" placeholder="Children Count" name="children_count" id="children_count" value={reservation.children_count} required onChange={(e)=>handleChange(e)}/>
              
              <label for="customer_id"><b>Customer Id</b></label>
              <input type="number" placeholder="Customer Id" name="customer_id" id="customer_id" value={reservation.customer_id} required onChange={(e)=>handleChange(e)}/>
              
              <label for="room_id"><b>Room Id</b></label>
              <input type="number" placeholder="Room Id" name="room_id" id="room_id" value={reservation.room_id} required onChange={(e)=>handleChange(e)}/>
              <br></br>

              <label for="checked_out"><b>Checked Out</b></label>
              <select name="checked_out" id="checked_out" value={reservation.checked_out} required onChange={(e)=>handleChange(e)}>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <br></br>
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
                          <th>Adults Count</th>
                          <th>Children Count</th>
                          <th>Customer Id</th>
                          <th>Room Id</th>
                          <th>Checked Out</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th></th>
                        </tr>
                        {reservations.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{e.adults_count}</td>
                              <td>{e.children_count}</td>
                              <td>{e.customer_id}</td>
                              <td>{e.room_id}</td>
                              <td>{e.checked_out ? "Yes" : "No"}</td>
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
  
export default Reservation;