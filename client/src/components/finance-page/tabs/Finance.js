import React, { useState, useEffect } from 'react';
  import '../../styles/Finance.css';
  import API_Finance from '../../../APIs/API_Finance';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';
import DateTimeService from '../../../services/DateTimeService';
  
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

        <label for="type"><b>Type</b></label>
            <div className='input'>
              <select name="type" id="type" value={finance.type} required onChange={(e)=>handleChange(e)}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              <br></br>
              <br></br>
            </div>

            <div className='input'>
              <label for="income"><b>Income (LKR)</b></label>
              <input type="number" placeholder="Income (LKR)" name="income" id="income" value={finance.income} required onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='input'>
              <label for="expense"><b>Expense (LKR)</b></label>
              <input type="number" placeholder="Expense (LKR)" name="expense" id="expense" value={finance.expense} required onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='input'>
              <label for="payer"><b>Payer</b></label>
              <input type="text" placeholder="Payer" name="payer" id="payer" value={finance.payer} required onChange={(e)=>handleChange(e)}/>
            </div>
            <div className='input'>
              <label for="receiver"><b>Receiver</b></label>
              <input type="text" placeholder="Receiver" name="receiver" id="receiver" value={finance.receiver} required onChange={(e)=>handleChange(e)}/>
            </div>

            <div className='input'>
              <label for="description"><b>Description</b></label>
              <input type="text" placeholder="Description" name="description" id="description" value={finance.description} required onChange={(e)=>handleChange(e)}/>
            </div>

            <div className='input'>
              <label for="recorded_by"><b>Recorded By</b></label>
              <input type="number" placeholder="Recorded By" name="recorded_by" id="recorded_by" value={finance.recorded_by} required onChange={(e)=>handleChange(e)}/>
              <br></br>
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

            <div className="table-body">
                  <tr className="th-row">
                    <th>Id</th>
                    <th>Income (LKR)</th>
                    <th>Expense (LKR)</th>
                    <th>Payer</th>
                    <th>Receiver</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Recorded By</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th></th>
                  </tr>
                  {finances.map((e, i) => {
                    return (
                      <tr className="td-row">
                        <td>{e.id}</td>
                        <td>{e.income}</td>
                        <td>{e.expense}</td>
                        <td>{e.payer}</td>
                        <td>{e.receiver}</td>
                        <td>{e.type}</td>
                        <td>{e.description}</td>
                        <td>{e.recorded_by}</td>
                        <td>{new DateTimeService().getLocalDateTime(e.created_at).toLocaleString()}</td>
                        <td>{new DateTimeService().getLocalDateTime(e.updated_at).toLocaleString()}</td>
                        <td>
                          <button className="editBtn" onClick={() => handleEditAction(e)}>Edit</button>
                        </td>
                        <td>
                          <button className="deleteBtn" onClick={() => handleDelete(e.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })}
                </div>
          </table>
            
          </div>
      </div>

        </div>

    );
  }
  
export default Finance;