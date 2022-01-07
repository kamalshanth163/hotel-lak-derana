import React, { useState, useEffect } from 'react';
  import '../../styles/InventoryPage.css'
  import API_Inventory from '../../../APIs/API_Inventory';
  import DateTimeService from '../../../services/DateTimeService';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserPlus,faUserCheck} from '@fortawesome/free-solid-svg-icons';

  function Inventory() {
    var initialInventory = {
      id: "",
      product: "",
      quantity: "",
      price: "",
      seller: "",
      department: "Bar",
      description: "",
      recorded_by: ""
    }
    const [inventory, setInventory] = useState(initialInventory);
    const [inventories, setInventories] = useState([]);
    const [action, setAction] = useState("add");
  
    useEffect(() => {
      getAllInventories();
    }, [])
  
    const getAllInventories = () => {
      new API_Inventory().getAllInventories().then(data => {
        setInventories([...data]);
      });
    }
  
    const handleChange = (e) => {
      var name = e.target.name;
      var value = e.target.value;
      setInventory({...inventory, [name]: value});
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      new API_Inventory().postInventory(inventory).then(data => {
        setInventory(initialInventory);
        getAllInventories();
      });
    }
  
    const handleEdit = (e) => {
      e.preventDefault();
      new API_Inventory().updateInventory(inventory).then(data => {
        setInventory(initialInventory);
        getAllInventories();
      });
      setAction("add");
    }
  
    const handleEditAction = (model) => {
      setAction("edit");
      setInventory(model);
    }
  
    const handleDelete = (inventoryId) => {
      if(window.confirm("Are you sure you want to DELETE this Inventory?")){
        new API_Inventory().deleteInventory(inventoryId).then(data => {
          getAllInventories();
        });
      }
    }
  
    return (
      <div className="inventory-tab">

      <div className='title-and-action'>
           <h3>Inventory :</h3>

    <form className="form">

    <div className='div1'> 

        <div className='input'> 
          <label for="product"></label>
          <input type="text" placeholder="Product" name="product" id="product" value={inventory.product} required onChange={(e)=>handleChange(e)}/>
        </div>

          <div className='input'>
            <label for="quantity"></label>
            <input type="number" placeholder="Qty" name="quantity" id="quantity" value={inventory.quantity} required onChange={(e)=>handleChange(e)}/>
          </div>

          <div className='input'>
            <label for="price"></label>
            <input type="number" placeholder="Price (LKR)" name="price" id="price" value={inventory.price} required onChange={(e)=>handleChange(e)}/>
          </div>

    </div>
    <div className='div2'> 

          <div className='input'>
            <label for="seller"></label>
            <input type="text" placeholder="Seller" name="seller" id="seller" value={inventory.seller} required onChange={(e)=>handleChange(e)}/>
          </div>

          <div className='input'>
            <label for="department"><b>Department</b></label>
              <select name="department" id="completed" value={inventory.department} required onChange={(e)=>handleChange(e)}>
                <option value="Bar">Bar</option>
                <option value="Administration">Administration</option>
                <option value="Human Resources">Human Resources</option>
              </select>
          </div>

          <div className='input'>    
            <label for="description"></label>
            <input type="text" placeholder="Description" name="description" id="description" value={inventory.description} required onChange={(e)=>handleChange(e)}/>
        </div>

    </div>

    <div className='div3'> 
        <div className='input'>
          <label for="recorded_by"></label>
          <input type="number" placeholder="Recorded By" name="recorded_by" id="recorded_by" value={inventory.recorded_by} required onChange={(e)=>handleChange(e)}/>
        </div>
    </div>

    <div className='btns'>
        <button type="submit" className="addBtn" onClick={(e) => handleAdd(e)}><FontAwesomeIcon className='icon' icon={faUserPlus} />Add</button>
        <button type="submit" className="editBtn" onClick={(e) => handleEdit(e)}><FontAwesomeIcon className='icon' icon={faUserCheck} />Save</button>
    </div>

      </form>

  </div>

<div className="TableDiv">

    <div>
      <h4>Inventory Table View</h4>
      <hr></hr>
    </div>

    <div className="container p-5">
        
        <table id="inventory" class="table table-hover table-bordered ">
        <thead>
          <tr>
          <th>Id</th>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Seller</th>
                          <th>Department</th>
                          <th>Description</th>
                          <th>Recorded By</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                           <th>Action</th>
          </tr>
        </thead>
        <tbody>

        {inventories.map((e, i) => {
                      return (
                        <tr>
                              <td>{e.id}</td>
                              <td>{e.product}</td>
                              <td>{e.quantity}</td>
                              <td>{e.price}</td>
                              <td>{e.seller}</td>
                              <td>{e.department}</td>
                              <td>{e.description}</td>
                              <td>{e.recorded_by}</td>
                              <td>{new DateTimeService().getLocalDateTime(e.created_at).toLocaleString()}</td>
                              <td>{new DateTimeService().getLocalDateTime(e.updated_at).toLocaleString()}</td>
                          <td>
                            <button className={`deleteBtn ${e.completed ? "disable" : ""}`} onClick={() => handleDelete(e.id)} disabled={e.completed}><FontAwesomeIcon className='icon' icon={faUserPlus} />Delete</button>
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
  
export default Inventory;