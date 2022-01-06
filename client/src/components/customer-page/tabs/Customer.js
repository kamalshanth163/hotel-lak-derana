import React, { useState, useEffect } from 'react';
import '../../styles/CustomerPage.css'
import API_Customer from '../../../APIs/API_Customer';
import DateTimeService from '../../../services/DateTimeService';
  
  function Customer() {
    var initialCustomer = {
      id: "",
      name: "",
      address: "",
      phone: ""
    }
    const [customer, setCustomer] = useState(initialCustomer);
    const [customers, setCustomers] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllCustomers();
    }, [])
  
    const getAllCustomers = () => {
      new API_Customer().getAllCustomers().then(data => {
        setCustomers([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setCustomer({...customer, [name]: value});
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      new API_Customer().postCustomer(customer).then(data => {
        setCustomer(initialCustomer);
        getAllCustomers();
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Customer().updateCustomer(customer).then(data => {
        setCustomer(initialCustomer);
        getAllCustomers();
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setCustomer(model);
    }
  
    const handleDelete = (customerId) => {
      if(window.confirm("Are you sure you want to DELETE this Customer?")){
        new API_Customer().deleteCustomer(customerId);
      }
    }
  
    return (
      <div className="customer-page row">
        <div>
          <hr></hr>
          <h2>Manage Customers</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Customer</h3> : <h3>Edit Customer</h3>
                }
              <hr></hr>
              <label for="name"><b>Name</b></label>
              <input type="text" placeholder="Name" name="name" id="name" value={customer.name} required onChange={(e)=>handleChange(e)}/>
  
              <label for="address"><b>Address</b></label>
              <input type="text" placeholder="Address" name="address" id="address" value={customer.address} required onChange={(e)=>handleChange(e)}/>
  
              <label for="phone"><b>Phone</b></label>
              <input type="number" placeholder="Phone" name="phone" id="phone" value={customer.phone} required onChange={(e)=>handleChange(e)}/>
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
                        {customers.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{e.name}</td>
                              <td>{e.address}</td>
                              <td>{e.phone}</td>
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
  
export default Customer;