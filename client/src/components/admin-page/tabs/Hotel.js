import React, { useState, useEffect } from 'react';
import '../../styles/AdminPage.css';
import API_Hotel from '../../../APIs/API_Hotel';
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
      $('#hotel').DataTable(
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
  
  function Hotel() {
    var initialHotel = {
      id: "",
      name: "",
      address: "",
      phone: ""
    }
    const [hotel, setHotel] = useState(initialHotel);
    const [hotels, setHotels] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllHotels();
    })
  
    const getAllHotels = () => {
      new API_Hotel().getAllHotels().then(data => {
        setHotels([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setHotel({...hotel, [name]: value});
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      new API_Hotel().postHotel(hotel).then(data => {
        setHotel(initialHotel);
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Hotel().updateHotel(hotel).then(data => {
        setHotel(initialHotel);
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setHotel(model);
    }
  
    const handleDelete = (hotelId) => {
      if(window.confirm("Are you sure you want to DELETE this Hotel?")){
        new API_Hotel().deleteHotel(hotelId);
      }
    }
  
     return (


      <div className='hotel-tab'>

      <div className='title-and-action'>
        <h3>Hotel :</h3>

        <form className="form">

  
              <div className='input'>
              <label for="name"></label>
              <input type="text" placeholder="Name" name="name" id="name" value={hotel.name} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
              <label for="address"></label>
              <input type="text" placeholder="Address" name="address" id="address" value={hotel.address} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
              <label for="phone"></label>
              <input type="number" placeholder="Phone" name="phone" id="phone" value={hotel.phone} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='btns'>
              <button type="submit" className="addBtn"   onClick={(e) => handleAdd(e)}><FontAwesomeIcon className='icon' icon={faUserPlus}/>Add</button>
              <button type="submit" className="editBtn"   onClick={(e) => handleEdit(e)}><FontAwesomeIcon className='icon' icon={faUserCheck}/>Save</button>
              </div>


          </form>

      </div>


    <div className="TableDiv">

        <div>
          <h4>Hotels Table View</h4>
          <hr></hr>
        </div>
    
        <div className="container p-5">
            
            <table id="hotel" class="table table-hover table-bordered">
            <thead>
              <tr>
               <th>Id</th>
               <th>Name</th>
               <th>Address</th>
               <th>Phone</th>
               <th>Action</th>
              </tr>
            </thead>
            <tbody>

            {hotels.map((e, i) => {
                          return (

                            <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.address}</td>
                            <td>{e.phone}</td>
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
  
export default Hotel;