import React, { useState, useEffect } from 'react';
  import '../../styles/InventoryPage.css'
  import API_Inventory from '../../../APIs/API_Inventory';
  import DateTimeService from '../../../services/DateTimeService';
  
  function Inventory() {
    var initialInventory = {
      id: 0,
      product: "",
      quantity: 0,
      price: 0,
      seller: "",
      department: "Bar",
      description: "",
      recorded_by: 0
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
      <div className="inventory-page row">
        <div>
          <hr></hr>
          <h2>Manage Inventories</h2>
        <table className="layout">
        <tr>
          <td className="left-col">
          <form className="form">
              <div class="container">
              {action === 'add' ? 
                  <h3>Add a Inventory</h3> : <h3>Edit Inventory</h3>
                }
              <hr></hr>

              <label for="product"><b>Product</b></label>
              <input type="text" placeholder="Product" name="product" id="product" value={inventory.product} required onChange={(e)=>handleChange(e)}/>
              
              <label for="quantity"><b>Quantity</b></label>
              <input type="number" placeholder="Qty" name="quantity" id="quantity" value={inventory.quantity} required onChange={(e)=>handleChange(e)}/>
              
              <label for="price"><b>Price (LKR)</b></label>
              <input type="number" placeholder="Price (LKR)" name="price" id="price" value={inventory.price} required onChange={(e)=>handleChange(e)}/>
              
              <label for="seller"><b>Seller</b></label>
              <input type="text" placeholder="Seller" name="seller" id="seller" value={inventory.seller} required onChange={(e)=>handleChange(e)}/>
               
              <label for="department"><b>Department</b></label>
              <select name="department" id="completed" value={inventory.department} required onChange={(e)=>handleChange(e)}>
                <option value="Bar">Bar</option>
                <option value="Administration">Administration</option>
                <option value="Human Resources">Human Resources</option>
              </select>
              <br></br>
              <br></br>

              <label for="description"><b>Description</b></label>
              <input type="text" placeholder="Description" name="description" id="description" value={inventory.description} required onChange={(e)=>handleChange(e)}/>
               
              <label for="recorded_by"><b>Recorded By</b></label>
              <input type="number" placeholder="Recorded By" name="recorded_by" id="recorded_by" value={inventory.recorded_by} required onChange={(e)=>handleChange(e)}/>
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
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Seller</th>
                          <th>Department</th>
                          <th>Description</th>
                          <th>Recorded By</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th></th>
                        </tr>
                        {inventories.map((e, i) => {
                          return (
                            <tr className="td-row">
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
  
export default Inventory;