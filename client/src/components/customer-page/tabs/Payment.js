  import React, { useState, useEffect } from 'react';
  import '../../styles/PaymentPage.css'
  import API_Payment from '../../../APIs/API_Payment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';
// import {CusBarChart} from '../../charts/customerbar';
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
      $('#payment').DataTable(
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

  
  function Payment() {
    var initialPayment = {
      id: "",
      date_checked_in: new Date().toDateString(),
      date_checked_out: new Date().toDateString(),
      reservation_fee: "",
      hotel_fee: "",
      paid: "",
      due: "",
      completed: "",
      customer_id: "",
      room_id: ""
    }
    const [payment, setPayment] = useState(initialPayment);
    const [payments, setPayments] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllPayments();
    })
  
    const getAllPayments = () => {
      new API_Payment().getAllPayments().then(data => {
        setPayments([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setPayment({...payment, [name]: value});
    }
  
    const handleAdd = (e) => {
      console.log(payment)
      e.preventDefault();
      new API_Payment().postPayment(payment).then(data => {
        setPayment(initialPayment);
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Payment().updatePayment(payment).then(data => {
        setPayment(initialPayment);
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setPayment(model);
    }
  
    const handleDelete = (paymentId) => {
      if(window.confirm("Are you sure you want to DELETE this Payment?")){
        new API_Payment().deletePayment(paymentId);
      }
    }
  
    return (
      
      <div className='payment-tab'>

          <div className='title-and-action'>
               <h3>Payment :</h3>

        <form className="form">

          <div className='div1'>

            

          <div className='input'>
                <label for="date_checked_in">Date Checked In</label>
                <input type="date" placeholder="Date Checked In" name="date_checked_in" id="date_checked_in" value={payment.date_checked_in} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
                 <label for="date_checked_out">Date Checked Out</label>
               <input type="date" placeholder="Date Checked Out" name="date_checked_out" id="date_checked_out" value={payment.date_checked_out} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
               <label for="reservation_fee"></label>
               <input type="number" placeholder="Reservation Fee" name="reservation_fee" id="reservation_fee" value={payment.reservation_fee} required onChange={(e)=>handleChange(e)}/>
              </div>

          </div>

          <div className='div2'> 

          <div className='input'>
                <label for="hotel_fee"></label>
                <input type="number" placeholder="Hotel Fee" name="hotel_fee" id="hotel_fee" value={payment.hotel_fee} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
                <label for="paid"></label>
                <input type="number" placeholder="Paid Amount" name="paid" id="paid" value={payment.paid} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
               <label for="due"></label>
               <input type="number" placeholder="Due Amount" name="due" id="due" value={payment.due} required onChange={(e)=>handleChange(e)}/>
              </div>
          
          </div>

          <div className='div3'>  

          <div className='input'>
              <label for="completed">Completed</label>
               <select name="completed" id="completed" value={payment.completed} required onChange={(e)=>handleChange(e)}>
                 <option value="1">Yes</option>
                 <option value="0">No</option>
               </select>
              </div>

              <div className='input'>
                <label for="customer_id"></label>
                <input type="number" placeholder="Customer Id" name="customer_id" id="customer_id" value={payment.customer_id} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
                <label for="room_id"></label>
                <input type="number" placeholder="Room Id" name="room_id" id="room_id" value={payment.room_id} required onChange={(e)=>handleChange(e)}/>
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
          <h4>Payments Table View</h4>
          <hr></hr>
        </div>
    
        <div className="container p-5">
            
            <table id="payment" class="table table-hover table-bordered">
            <thead>
              <tr>

              <th>Id</th>
                           <th>Date Checked In</th>
                           <th>Date Checked Out</th>
                           <th>Reservation Fee (LKR)</th>
                           <th>Hotel Fee (LKR)</th>
                           <th>Paid (LKR)</th>
                           <th>Due (LKR)</th>
                           <th>Completed</th>
                           <th>Customer Id</th>
                           <th>Room Id</th>
                           <th>Action</th>
              </tr>
            </thead>
            <tbody>

            {payments.map((e, i) => {
                          return (
                            <tr>

                                <td>{e.id}</td>
                                <td>{new Date(e.date_checked_in).toDateString()}</td>
                                <td>{new Date(e.date_checked_out).toDateString()}</td>
                                <td>{e.reservation_fee}</td>
                                <td>{e.hotel_fee}</td>
                                <td>{e.paid}</td>
                                <td>{e.due}</td>
                                <td>{e.completed}</td>
                                <td>{e.customer_id}</td>
                                <td>{e.room_id}</td>
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
  
export default Payment;