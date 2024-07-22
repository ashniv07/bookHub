import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

const Managebook = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [editBookId, setEditBookId] = useState(null);
    const [updatedBook, setUpdatedBook] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/findbooks")
            .then(res => res.json())
            .then(data => setAllBooks(data))
            .catch(error => console.error('Error fetching books:', error.message));
    }, []);

    const handleEdit = (book) => {
        setEditBookId(book.bookId);
        setUpdatedBook(book);
    };

    const handleSave = (id) => {
        const { bookId,createdAt,createdBy,modifiedAt,modifiedBy,isDeleted, ...fieldsToUpdate } = updatedBook;

        fetch(`http://localhost:8080/updatebook/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fieldsToUpdate)
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }
                // Update the book in the state with the new data
                setAllBooks(prevBooks => prevBooks.map(book => (book.bookId === id ? updatedBook : book)));
                setEditBookId(null);
            })
            .catch(error => {
                console.error('Error updating book:', error.message);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook(prevBook => ({ ...prevBook, [name]: value }));
    };

    const handleDelete = (id) => {
      fetch(`http://localhost:8080/soft-delete/${id}`, {
          method: 'DELETE',
      })
      .then(async (res) => {
          if (res.ok) {
              // Remove the book from the state
              setAllBooks(prevBooks => prevBooks.filter(book => book.bookId !== id));
          } else {
              const errorText = await res.text();
              throw new Error(errorText);
          }
      })
      .catch(error => {
          console.error('Error deleting book:', error.message);
          // Optionally display a user-friendly message or alert
      });
  };
  

    return (
        <div className="manage"style={{display:"flex"}}>
            <Sidebar/>
        <div className="container my-12 " style={{width:"80%"}}>
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
                            <td>
                                {editBookId === book.bookId ? (
                                    <input
                                        type="text"
                                        name="bookName"
                                        value={updatedBook.bookName || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    book.bookName
                                )}
                            </td>
                            <td>
                                {editBookId === book.bookId ? (
                                    <input
                                        type="text"
                                        name="author"
                                        value={updatedBook.author || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    book.author
                                )}
                            </td>
                            <td>
                                {editBookId === book.bookId ? (
                                    <input
                                        type="text"
                                        name="genre"
                                        value={updatedBook.genre || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    book.genre
                                )}
                            </td>
                            <td>
                                {editBookId === book.bookId ? (
                                    <input
                                        type="text"
                                        name="type"
                                        value={updatedBook.type || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    book.type
                                )}
                            </td>
                            <td>
                                {editBookId === book.bookId ? (
                                    <input
                                        type="text"
                                        name="edition"
                                        value={updatedBook.edition || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    book.edition
                                )}
                            </td>
                            <td>
                                {editBookId === book.bookId ? (
                                    <input
                                        type="text"
                                        name="description"
                                        value={updatedBook.description || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    book.description
                                )}
                            </td>
                            <td>
                                <img src={book.image} className="w-50 h-25" alt={book.bookName} />
                            </td>
                            <td>
                                {editBookId === book.bookId ? (
                                    <input
                                        type="text"
                                        name="url"
                                        value={updatedBook.url || ''}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    book.url
                                )}
                            </td>
                            <td>
                                {editBookId === book.bookId ? (
                                    <button
                                        onClick={() => handleSave(book.bookId)}
                                        className="btn btn-success me-2"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="btn btn-success me-2"
                                    >
                                        Edit
                                    </button>
                                )}
                                 <button
                                  onClick={() => handleDelete(book.bookId)}
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
        </div>
    );
};

export default Managebook;
