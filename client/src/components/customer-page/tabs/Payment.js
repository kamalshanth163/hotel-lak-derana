import React, { useState, useEffect } from 'react';
  import '../../styles/CustomerPage.css'
  import API_Payment from '../../../APIs/API_Payment';
  
  function Payment() {
    var initialPayment = {
      id: 0,
      date_checked_in: new Date().toDateString(),
      date_checked_out: new Date().toDateString(),
      reservation_fee: 0,
      hotel_fee: 0,
      paid: 0,
      due: 0,
      completed: 0,
      customer_id: 0,
      room_id: 0
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
      <div className="payment-page row">
        <div>
          <hr></hr>
          <h2>Manage Payments</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Payment</h3> : <h3>Edit Payment</h3>
                }
              <hr></hr>
              <label for="date_checked_in"><b>Date Checked In</b></label>
              <input type="date" placeholder="Date Checked In" name="date_checked_in" id="date_checked_in" value={payment.date_checked_in} required onChange={(e)=>handleChange(e)}/>
              <br></br>
              <br></br>

              <label for="date_checked_out"><b>Date Checked Out</b></label>
              <input type="date" placeholder="Date Checked Out" name="date_checked_out" id="date_checked_out" value={payment.date_checked_out} required onChange={(e)=>handleChange(e)}/>
              <br></br>
              <br></br>

              <label for="reservation_fee"><b>Reservation Fee (LKR)</b></label>
              <input type="number" placeholder="Reservation Fee" name="reservation_fee" id="reservation_fee" value={payment.reservation_fee} required onChange={(e)=>handleChange(e)}/>
              
              <label for="hotel_fee"><b>Hotel Fee (LKR)</b></label>
              <input type="number" placeholder="Hotel Fee" name="hotel_fee" id="hotel_fee" value={payment.hotel_fee} required onChange={(e)=>handleChange(e)}/>
              
              <label for="paid"><b>Paid Amount (LKR)</b></label>
              <input type="number" placeholder="Paid Amount (Rs)" name="paid" id="paid" value={payment.paid} required onChange={(e)=>handleChange(e)}/>
              
              <label for="due"><b>Due Amount (LKR)</b></label>
              <input type="number" placeholder="Due Amount (Rs)" name="due" id="due" value={payment.due} required onChange={(e)=>handleChange(e)}/>
              
              <label for="completed"><b>Completed</b></label>
              <select name="completed" id="completed" value={payment.completed} required onChange={(e)=>handleChange(e)}>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <br></br>
              <br></br>

              <label for="customer_id"><b>Customer Id</b></label>
              <input type="number" placeholder="Customer Id" name="customer_id" id="customer_id" value={payment.customer_id} required onChange={(e)=>handleChange(e)}/>
              
              <label for="room_id"><b>Room Id</b></label>
              <input type="number" placeholder="Room Id" name="room_id" id="room_id" value={payment.room_id} required onChange={(e)=>handleChange(e)}/>
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
                          <th>Date Checked In</th>
                          <th>Date Checked Out</th>
                          <th>Reservation Fee (LKR)</th>
                          <th>Hotel Fee (LKR)</th>
                          <th>Paid (LKR)</th>
                          <th>Due (LKR)</th>
                          <th>Completed</th>
                          <th>Customer Id</th>
                          <th>Room Id</th>
                          <th></th>
                        </tr>
                        {payments.map((e, i) => {
                          return (
                            <tr className="td-row">
                              <td>{e.id}</td>
                              <td>{new Date(e.date_checked_in).toDateString()}</td>
                              <td>{new Date(e.date_checked_out).toDateString()}</td>
                              <td>{e.reservation_fee}</td>
                              <td>{e.hotel_fee}</td>
                              <td>{e.paid}</td>
                              <td>{e.due}</td>
                              <td>{e.completed ? "Yes" : "No"}</td>
                              <td>{e.customer_id}</td>
                              <td>{e.room_id}</td>
                              <td>
                                <button className="edit-btn btn" onClick={() => handleEditAction(e)}>Edit</button>
                              </td>
                              <td>
                                <button className={`delete-btn btn ${e.completed ? "disable" : ""}`} onClick={() => handleDelete(e.id)} disabled={e.completed}>Delete</button>
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
  
export default Payment;