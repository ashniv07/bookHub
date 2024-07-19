import React, { useState, useEffect } from 'react';

const Managebook = () => {
    const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/findbooks")
      .then(res => res.json())
      .then(data => setAllBooks(data));
  }, []);

//   const handleDelete = (id) => {
//     fetch(`http://localhost:8080/soft-delete${id}`, {
//       method: 'DELETE',
//     })
//     .then(res => res.json())
//     .then(data => {
//       alert("Book is deleted successfully");
//       setAllBooks(allBooks.filter(book => book.bookId !== id));
//     }); 
//   };
  return (
       <div className="container my-12">
  <h2 className="mb-4 text-3xl font-bold">Manage Your Books</h2>

  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Book Name</th>
        <th scope="col">Author Name</th>
        <th scope="col">Genre</th>
        <th scope="col">Type</th>
        <th scope="col">Edition</th>
        <th scope="col">Description</th>
        <th scope="col">Image</th>
        <th scope="col">Pdf</th>
        <th scope="col">Edit or Manage</th>
      </tr>
    </thead>
    <tbody>
      {allBooks.map((book, index) => (
        <tr key={book.bookId}>
          <td>{index + 1}</td>
          <td>{book.bookName}</td>
          <td>{book.author}</td>
          <td>{book.genre}</td>
          <td>{book.type}</td>
          <td>{book.edition}</td>
          <td>{book.description}</td>
          <td ><img src={book.image} class="w-50 h-25"/></td>
          <td>{book.url}</td>
    
          <td>
            {/* <Link
              className="btn btn-primary me-2"
              to={`/admin/dashboard/edit-books/${book._id}`}
            >
              Edit
            </Link> */}
            <button
              onClick={() => handleDelete(book._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


  )
}

export default Managebook
