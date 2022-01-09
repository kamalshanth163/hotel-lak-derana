import React, { useState, useEffect } from 'react';
  import '../../styles/ReservationPage.css'
  import API_Reservation from '../../../APIs/API_Reservation';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';


    function Reservation() {
      var initialReservation = {
        id: "",
        adults_count: "",
        children_count: "",
        customer_id: "",
        room_id: ""
      }
      const [reservation, setReservation] = useState(initialReservation);
      const [reservations, setReservations] = useState([]);
      const [action, setAction] = useState("add");
    
      useEffect(() => {
        getAllReservations();
      })
    
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
        reservation.hotel_id = reservation.hotel_id * 1;
        e.preventDefault();
        new API_Reservation().postReservation(reservation).then(data => {
          setReservation(initialReservation);
        });
      }
    
      const handleEdit = (e) => {
        e.preventDefault();
        new API_Reservation().updateReservation(reservation).then(data => {
          setReservation(initialReservation);
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
      <div className='reservation-tab'>

          <div className='title-and-action'>
               <h3>Reservation :</h3>

        <form className="form">

              <div className='input'>
                <label for="adults_count"></label>
                <input type="number" placeholder="Adults Count" name="adults_count" id="adults_count" value={reservation.adults_count} required onChange={(e)=>handleChange(e)} />
              </div>

              <div className='input'>
                <label for="children_count"></label>
                <input type="number" placeholder="Children Count" name="children_count" id="children_count" value={reservation.children_count} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
              <label for="customer_id"></label>
              <input type="number" placeholder="Customer Id" name="customer_id" id="customer_id" value={reservation.customer_id} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
              <label for="room_id"></label>
              <input type="number" placeholder="Room Id" name="room_id" id="room_id" value={reservation.room_id} required onChange={(e)=>handleChange(e)}/>

              </div>

              <div className='btns'>
              <button type="submit" className="addBtn"   onClick={(e) => handleAdd(e)} ><FontAwesomeIcon className='icon' icon={faUserPlus} />Add</button>
              <button type="submit" className="editBtn"  onClick={(e) => handleEdit(e)} ><FontAwesomeIcon className='icon' icon={faUserCheck} />Save</button>
              </div>


          </form>

      </div>




    <div className="TableDiv">

        <div>
          <h4>Reservations Table View</h4>
          <hr></hr>
        </div>
    
        <div className="container p-5">
            
            <table id="reservation" class="table table-hover table-bordered ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Adults Count</th>
                <th>Children Count</th>
                <th>Customer Id</th>
                <th>Room Id</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

            {reservations.map((e, i) => {
                          return (
                            <tr>
                              <td>{e.id}</td>
                              <td>{e.adults_count}</td>
                              <td>{e.children_count}</td>
                              <td>{e.customer_id}</td>
                              <td>{e.room_id}</td>
                              <td>
                              </td>
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
  
export default Reservation;