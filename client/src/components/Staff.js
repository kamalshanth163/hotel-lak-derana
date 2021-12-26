import React, { useState } from 'react';
import './styles/Admin.css'

const Staff = () => {
  var initialBook = {
    id: 0,
    title: "",
    author: "",
    isbn: "",
    price: 0,
  }
  const [book, setBook] = useState(initialBook);
  const [books, setBooks] = useState([]);

  const handleEditAction = () => {

  }

  const handleDelete = () => {
    
  }

  return (
    <div className="admin-page row">
      <table className="layout">
      <tr>
        <td className="left-col">
        <form className="form">
              <div class="container">
                <h1>Add a Book</h1>
                <label for="name"><b>Title</b></label>
                <input type="text" placeholder="Title" name="title" id="title" value={book.title} required />

                <label for="author"><b>Author</b></label>
                <input type="text" placeholder="Author" name="author" id="author" value={book.author} required />

                <label for="isbn"><b>ISBN</b></label>
                <input type="text" placeholder="ISBN number" name="isbn" id="isbn" value={book.isbn} required />
                
                <label for="price"><b>Price</b></label>
                <input type="number" placeholder="Price" name="price" id="price" value={book.price} required />
                <br></br>

                <button type="submit" className="addBookBtn" >Add</button>
              </div>        
            </form>
        </td>
        <td className="right-col">
            <div className="panel">
              <h1>Admin Panel</h1>
                  <table>
                    <div className="table-head">
                      <tr className="th-row">
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </div>
                    <div className="table-body">
                      {books.map((b, i) => {
                        return (
                          <tr className="td-row">
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.isbn}</td>
                            <td>{b.price}</td>
                            <td>
                              <button className="edit-btn btn" onClick={() => handleEditAction(b)}>Edit</button>
                              <button className="delete-btn btn" onClick={() => handleDelete(b.id)}>Delete</button>
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
  );
}

export default Staff;
