import React, { useState, useEffect } from 'react';
import '../../styles/CustomerPage.css';
import API_Customer from '../../../APIs/API_Customer';
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
      $('#customer').DataTable(
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
  })

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
    console.log(e)
    e.preventDefault();
    new API_Customer().postCustomer(customer).then(data => {
      console.log(data)
      setCustomer(initialCustomer);
    });
  }

  const handleEdit = (e) => {
    e.preventDefault();
    new API_Customer().updateCustomer(customer).then(data => {
      setCustomer(initialCustomer);
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

    <div>

      <div className='title-and-action'>
        <h3>Customer :</h3>

        <form className="form">

              <div className='input'>
              <label for="name"></label>
              <input type="text" placeholder="Name" name="name" id="name" value={customer.name} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
              <label for="address"></label>
              <input type="text" placeholder="Address" name="address" id="address" value={customer.address} required onChange={(e)=>handleChange(e)} />
              </div>

              <div className='input'>
              <label for="phone"></label>
              <input type="number" placeholder="Phone" name="phone" id="phone" value={customer.phone} required onChange={(e)=>handleChange(e)} />
              </div>

              <div className='btns'>
              <button type="submit" className="addBtn"   onClick={(e) => handleAdd(e)}><FontAwesomeIcon className='icon' icon={faUserPlus}/>Add</button>
              <button type="submit" className="editBtn"   onClick={(e) => handleEdit(e)}><FontAwesomeIcon className='icon' icon={faUserCheck}/>Save</button>
              </div>


          </form>

      </div>


    <div className="TableDiv">

        <div>
          <h4>Registred Customers Table View</h4>
          <hr></hr>
        </div>
    
        <div className="container p-5">
            
            <table id="customer" class="table table-hover table-bordered">
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

            {customers.map((e, i) => {
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


      <div className='ChartDiv'>

        <div>
          <h4>Registred Customers <br /> Graphical View</h4>
        <hr></hr>
        </div>

        <div className='chart'>
          <CusBarChart />
        </div>

      </div>
    </div>
  


    );
  }
// }
export default Customer;