import React, { useState, useEffect } from 'react';
  import '../../styles/AdminPage.css'
  import API_Hotel from '../../../APIs/API_Hotel';
  
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
      <div className="hotel-page row">
        <div>
          <hr></hr>
          <h2>Manage Hotels</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Hotel</h3> : <h3>Edit Hotel</h3>
                }
              <hr></hr>
              <label for="name"><b>Name</b></label>
              <input type="text" placeholder="Name" name="name" id="name" value={hotel.name} required onChange={(e)=>handleChange(e)}/>
  
              <label for="address"><b>Address</b></label>
              <input type="text" placeholder="Address" name="address" id="address" value={hotel.address} required onChange={(e)=>handleChange(e)}/>
  
              <label for="phone"><b>Phone</b></label>
              <input type="number" placeholder="Phone" name="phone" id="phone" value={hotel.phone} required onChange={(e)=>handleChange(e)}/>
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
                          <th>Name</th>
                          <th>Address</th>
                          <th>Phone</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th></th>
                        </tr>
                        {hotels.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{e.name}</td>
                              <td>{e.address}</td>
                              <td>{e.phone}</td>
                              <td>{new Date(e.created_at).toLocaleString()}</td>
                              <td>{new Date(e.updated_at).toLocaleString()}</td>
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
  
export default Hotel;