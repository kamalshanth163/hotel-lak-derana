import React, { useState, useEffect } from 'react';
  import '../../styles/Finance.css';
  import API_Finance from '../../../APIs/API_Finance';
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
    $('#finance').DataTable(
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

  
  function Finance() {
    var initialFinance = {
      id: "",
      amount: "",
      payer: "",
      description: "",
      recorded_by: ""
    }
    const [finance, setFinance] = useState(initialFinance);
    const [finances, setFinances] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllFinances();
    })
  
    const getAllFinances = () => {
      new API_Finance().getAllFinances().then(data => {
        setFinances([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setFinance({...finance, [name]: value});
    }
  
    const handleAdd = (e) => {
      console.log(finance)
      e.preventDefault();
      new API_Finance().postFinance(finance).then(data => {
        setFinance(initialFinance);
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Finance().updateFinance(finance).then(data => {
        setFinance(initialFinance);
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setFinance(model);
    }
  
    const handleDelete = (financeId) => {
      if(window.confirm("Are you sure you want to DELETE this Finance?")){
        new API_Finance().deleteFinance(financeId);
      }
    }
  
    return (


      <div className='finance-tab'>

          <div className='title-and-action'>
               <h3>Finance :</h3>

        <form className="form">


              <div className='input'> 
              <label for="amount"></label>
               <input type="number" placeholder="Amount" name="amount" id="amount" value={finance.amount} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
              <label for="payer"></label>
               <input type="text" placeholder="Payer" name="payer" id="payer" value={finance.payer} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
               <label for="description"></label>
               <input type="text" placeholder="Description" name="description" id="description" value={finance.description} required onChange={(e)=>handleChange(e)}/>
              </div>

              <div className='input'>
               <label for="recorded_by"></label>
               <input type="number" placeholder="Recorded By" name="recorded_by" id="recorded_by" value={finance.recorded_by} required onChange={(e)=>handleChange(e)}/>
              </div>


              <div className='btns'>
              <button type="submit" className="addBtn"   onClick={(e) => handleAdd(e)} ><FontAwesomeIcon className='icon' icon={faUserPlus} />Add</button>
              <button type="submit" className="editBtn"  onClick={(e) => handleEdit(e)} ><FontAwesomeIcon className='icon' icon={faUserCheck} />Save</button>
              </div>


            
          </form>

      </div>




    <div className="TableDiv">

        <div>
          <h4>Finances Table View</h4>
          <hr></hr>
        </div>
    
        <div className="container p-5">
            
            <table id="finance" class="table table-hover table-bordered ">
            <thead>
              <tr>
                          <th>Id</th>
                          <th>Amount</th>
                          <th>Payer</th>
                          <th>Description</th>
                          <th>Recorded By</th>
                          <th>Action</th>
              </tr>
            </thead>
            <tbody>

            {finances.map((e, i) => {
                          return (
                            <tr>

                                 <td>{e.id}</td>
                                 <td>{e.amount}</td>
                                 <td>{e.payer}</td>
                                 <td>{e.description}</td>
                                 <td>{e.recorded_by}</td>
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


      {/* <div className='ChartDiv'>

        <div>
      <h4>Attendances <br /> Graphical View</h4>
        <hr></hr>
        </div>

        <div className='chart'>
        <ResBarChart />
        </div>

      </div> */}
  
        </div>


















      // <div className="finance-page row">
      //   <div>
      //     <hr></hr>
      //     <h2>Manage Finances</h2>
      //   <table className="layout">
      //   <tr>
      //     <td className="left-col">
      //     <form className="form">
      //         <div class="container">
      //         {action === 'add' ? 
      //             <h3>Add a Finance</h3> : <h3>Edit Finance</h3>
      //           }
      //         <hr></hr>
      //         <label for="amount"><b>Amount (LKR)</b></label>
      //         <input type="number" placeholder="Amount (LKR)" name="amount" id="amount" value={finance.amount} required onChange={(e)=>handleChange(e)}/>

      //         <label for="payer"><b>Payer</b></label>
      //         <input type="text" placeholder="Payer" name="payer" id="payer" value={finance.payer} required onChange={(e)=>handleChange(e)}/>
              
      //         <label for="description"><b>Description</b></label>
      //         <input type="text" placeholder="Description" name="description" id="description" value={finance.description} required onChange={(e)=>handleChange(e)}/>
              
      //         <label for="recorded_by"><b>Recorded By</b></label>
      //         <input type="number" placeholder="Recorded By" name="recorded_by" id="recorded_by" value={finance.recorded_by} required onChange={(e)=>handleChange(e)}/>
      //         <br></br>
  
      //         {action === 'add' ? 
      //         <button type="submit" className="addBtn" onClick={(e) => handleAdd(e)}>Add</button> :
      //         <button type="submit" className="editBtn" onClick={(e) => handleEdit(e)}>Save</button>
      //         }
      //         </div>        
      //     </form>
      //     </td>
      //     <td className="right-col">
      //         <div className="panel">
      //               <table>
  
      //                 <div className="table-body">
      //                   <tr className="th-row">
      //                     <th>Id</th>
      //                     <th>Amount</th>
      //                     <th>Payer</th>
      //                     <th>Description</th>
      //                     <th>Recorded By</th>
      //                     <th></th>
      //                   </tr>
      //                   {finances.map((e, i) => {
      //                     return (
      //                       <tr className="td-row">
      //                         <td>{e.id}</td>
      //                         <td>{e.amount}</td>
      //                         <td>{e.payer}</td>
      //                         <td>{e.description}</td>
      //                         <td>{e.recorded_by}</td>
      //                         <td>
      //                           <button className="edit-btn btn" onClick={() => handleEditAction(e)}>Edit</button>
      //                         </td>
      //                         <td>
      //                           <button className="delete-btn btn" onClick={() => handleDelete(e.id)}>Delete</button>
      //                         </td>
      //                       </tr>
      //                     )
      //                   })}
      //                 </div>
      //                 </table> 
      //         </div>
      //     </td>
      //   </tr>
      // </table>       
      // </div>
  
      //   </div>
    );
  }
  
export default Finance;