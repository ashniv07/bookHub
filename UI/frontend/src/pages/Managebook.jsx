// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import axios from '../setupAxios';

// const Managebook = () => {
//     const [allBooks, setAllBooks] = useState([]);
//     const [editBookId, setEditBookId] = useState(null);
//     const [updatedBook, setUpdatedBook] = useState({});

//     useEffect(() => {
//         axios.get("/books-not-del")
//             .then(res => setAllBooks(res.data))
//             .catch(error => console.error('Error fetching books:', error.message)); 
//     }, []);

//     const handleEdit = (book) => {
//         setEditBookId(book.bookId);
//         setUpdatedBook(book);
//     };

//     const handleSave = (id) => {
//         const { bookId,createdAt,createdBy,modifiedAt,modifiedBy,isDeleted, ...fieldsToUpdate } = updatedBook;

//         axios.patch(`/updatebook/${id}`, fieldsToUpdate)
//             .then(() => {
//                 setAllBooks(prevBooks => prevBooks.map(book => (book.bookId === id ? updatedBook : book)));
//                 setEditBookId(null);
//             })
//             .catch(error => {
//                 console.error('Error updating book:', error.message);
//             });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedBook(prevBook => ({ ...prevBook, [name]: value }));
//     };

//     const handleDelete = (id) => {
//       axios.delete(`/soft-delete/${id}`)
//       .then(() => {
          
//           setAllBooks(prevBooks => prevBooks.filter(book => book.bookId !== id));
//       })
//       .catch(error => {
//           console.error('Error deleting book:', error.message);
          
//       });
//   };
  

//     return (
//         <div className="manage"style={{display:"flex"}}>
//             <Sidebar/>
//         <div className="container my-12 " style={{ width: "calc(100% - 200px)", marginLeft:'200px' }}>
//             <h2 className="mb-4 text-3xl font-bold">Manage Your Books</h2>

//             <table className="table table-striped table-bordered">
//                 <thead>
//                     <tr>
//                         <th scope="col">No</th>
//                         <th scope="col">Book Name</th>
//                         <th scope="col">Author Name</th>
//                         <th scope="col">Genre</th>
//                         <th scope="col">Type</th>
//                         <th scope="col">Edition</th>
//                         <th scope="col">Description</th>
//                         <th scope="col">Image</th>
//                         <th scope="col">Pdf</th>
//                         <th scope="col">Edit or Manage</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {allBooks.map((book, index) => (
//                         <tr key={book.bookId}>
//                             <td>{index + 1}</td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <input
//                                         type="text"
//                                         name="bookName"
//                                         value={updatedBook.bookName || ''}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     book.bookName
//                                 )}
//                             </td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <input
//                                         type="text"
//                                         name="author"
//                                         value={updatedBook.author || ''}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     book.author
//                                 )}
//                             </td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <input
//                                         type="text"
//                                         name="genre"
//                                         value={updatedBook.genre || ''}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     book.genre
//                                 )}
//                             </td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <input
//                                         type="text"
//                                         name="type"
//                                         value={updatedBook.type || ''}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     book.type
//                                 )}
//                             </td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <input
//                                         type="text"
//                                         name="edition"
//                                         value={updatedBook.edition || ''}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     book.edition
//                                 )}
//                             </td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <input
//                                         type="text"
//                                         name="description"
//                                         value={updatedBook.description || ''}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     book.description
//                                 )}
//                             </td>
//                             <td>
//                                 <img src={book.image} className="w-50 h-25" alt={book.bookName} />
//                             </td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <input
//                                         type="text"
//                                         name="url"
//                                         value={updatedBook.url || ''}
//                                         onChange={handleChange}
//                                     />
//                                 ) : (
//                                     book.url
//                                 )}
//                             </td>
//                             <td>
//                                 {editBookId === book.bookId ? (
//                                     <button
//                                         onClick={() => handleSave(book.bookId)}
//                                         className="btn btn-success me-2"
//                                     >
//                                         Save
//                                     </button>
//                                 ) : (
//                                     <button
//                                         onClick={() => handleEdit(book)}
//                                         className="btn btn-success me-2"
//                                     >
//                                         Edit
//                                     </button>
//                                 )}
//                                  <button
//                                   onClick={() => handleDelete(book.bookId)}
//                                           className="btn btn-danger"
//                                 >
//                                      Delete
//                                     </button> 
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </div>
//     );
// };

// export default Managebook;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from '../setupAxios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Managebook = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [editBookId, setEditBookId] = useState(null);
    const [updatedBook, setUpdatedBook] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("/books-not-del")
            .then(res => setAllBooks(res.data))
            .catch(error => console.error('Error fetching books:', error.message)); 
    }, []);

    const handleEdit = (book) => {
        setEditBookId(book.bookId);
        setUpdatedBook(book);
        setOpen(true);
    };

    const handleSave = () => {
        const { bookId, createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, ...fieldsToUpdate } = updatedBook;

        axios.patch(`/updatebook/${editBookId}`, fieldsToUpdate)
            .then(() => {
                setAllBooks(prevBooks => prevBooks.map(book => (book.bookId === editBookId ? updatedBook : book)));
                setEditBookId(null);
                setOpen(false);
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
        axios.delete(`/soft-delete/${id}`)
            .then(() => {
                setAllBooks(prevBooks => prevBooks.filter(book => book.bookId !== id));
            })
            .catch(error => {
                console.error('Error deleting book:', error.message);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="manage" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, width: "calc(100% - 200px)", marginLeft: '200px', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '30px' }}>Manage Your Books</h1>
                </div>
                {allBooks.length === 0 ? (
                    <p className='text-center'>No books available</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table table-striped table-bordered table-hover column-spacing mt-4" style={{ width: '100%', border: '2px solid black', borderCollapse: 'collapse' }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{ border: '2px solid black' }}>No</th>
                                    <th style={{ border: '2px solid black' }}>Book Name</th>
                                    <th style={{ border: '2px solid black' }}>Author Name</th>
                                    <th style={{ border: '2px solid black' }}>Genre</th>
                                    <th style={{ border: '2px solid black' }}>Type</th>
                                    <th style={{ border: '2px solid black' }}>Edition</th>
                                    <th style={{ border: '2px solid black' }}>Description</th>
                                    <th style={{ border: '2px solid black' }}>Image</th>
                                    <th style={{ border: '2px solid black', width: '10%' }}>Pdf</th>
                                    <th style={{ border: '2px solid black' }}>Edit</th>
                                    <th style={{ border: '2px solid black' }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBooks.map((book, index) => (
                                    <tr key={book.bookId}>
                                        <td style={{ border: '2px solid black' }}>{index + 1}</td>
                                        <td style={{ border: '2px solid black' }}>{book.bookName}</td>
                                        <td style={{ border: '2px solid black' }}>{book.author}</td>
                                        <td style={{ border: '2px solid black' }}>{book.genre}</td>
                                        <td style={{ border: '2px solid black' }}>{book.type}</td>
                                        <td style={{ border: '2px solid black' }}>{book.edition}</td>
                                        <td style={{ border: '2px solid black' }}>
                                            <div
                                                style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {book.description}
                                            </div>
                                        </td>
                                        <td style={{ border: '2px solid black' }}>
                                            <img src={book.image} className="w-50 h-25" alt={book.bookName} />
                                        </td>
                                        <td style={{ border: '2px solid black', width: '10%' }}>
                                            {book.url.length > 20 ? `${book.url.substring(0, 20)}...` : book.url}
                                        </td>
                                        <td style={{ border: '2px solid black' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEdit(book)}
                                                startIcon={<AiFillEdit />}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                        <td style={{ border: '2px solid black' }}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDelete(book.bookId)}
                                                startIcon={<AiFillDelete />}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="bookName"
                        label="Book Name"
                        type="text"
                        fullWidth
                        value={updatedBook.bookName || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="author"
                        label="Author"
                        type="text"
                        fullWidth
                        value={updatedBook.author || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="genre"
                        label="Genre"
                        type="text"
                        fullWidth
                        value={updatedBook.genre || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="type"
                        label="Type"
                        type="text"
                        fullWidth
                        value={updatedBook.type || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="edition"
                        label="Edition"
                        type="text"
                        fullWidth
                        value={updatedBook.edition || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={updatedBook.description || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="url"
                        label="PDF URL"
                        type="text"
                        fullWidth
                        value={updatedBook.url || ''}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Managebook;
