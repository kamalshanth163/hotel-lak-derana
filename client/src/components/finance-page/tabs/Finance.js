import React, { useState, useEffect } from 'react';
  import '../../styles/Finance.css';
  import API_Finance from '../../../APIs/API_Finance';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';
  
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

        </div>

    );
  }
  
export default Finance;