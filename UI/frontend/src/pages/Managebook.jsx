

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import axios from '../setupAxios';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment } from '@mui/material';
// import { AiFillEdit, AiFillDelete } from "react-icons/ai";
// import { Search } from '@mui/icons-material';

// const Managebook = () => {
//     const [allBooks, setAllBooks] = useState([]);
//     const [editBookId, setEditBookId] = useState(null);
//     const [updatedBook, setUpdatedBook] = useState({});
//     const [open, setOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filterGenre, setFilterGenre] = useState('');

//     useEffect(() => {
//         axios.get("/books-not-del")
//             .then(res => setAllBooks(res.data))
//             .catch(error => console.error('Error fetching books:', error.message));
//     }, []);

//     const handleEdit = (book) => {
//         setEditBookId(book.bookId);
//         setUpdatedBook(book);
//         setOpen(true);
//     };

//     const handleSave = () => {
//         const { bookId, createdAt, createdBy, modifiedAt, modifiedBy, isDeleted, ...fieldsToUpdate } = updatedBook;

//         axios.patch(`/updatebook/${editBookId}`, fieldsToUpdate)
//             .then(() => {
//                 setAllBooks(prevBooks => prevBooks.map(book => (book.bookId === editBookId ? updatedBook : book)));
//                 setEditBookId(null);
//                 setOpen(false);
//             })
//             .catch(error => {
//                 console.error('Error updating book:', error.message);
//             });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedBook(prevBook => ({ ...prevBook, [name]: value }));
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await axios.get(`/borrow/check-in-borrow-info/${id}`);
//             if (response.data.isInBorrowInfo || response.data.hasAccessGranted) {
//                 alert('Cannot delete the book as it is currently being borrowed and access is granted.');
//                 return;
//             }

//             await axios.delete(`/soft-delete/${id}`);
//             setAllBooks(prevBooks => prevBooks.filter(book => book.bookId !== id));
//         } catch (error) {
//             console.error('Error deleting book:', error.message);
//         }
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const filteredBooks = allBooks.filter(book => {
//         const matchesSearchQuery = book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             book.genre.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesFilterGenre = filterGenre ? book.genre === filterGenre : true;
//         return matchesSearchQuery && matchesFilterGenre;
//     });

//     return (
//         <div className="manage" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
//             <Sidebar />
//             <div style={{ flexGrow: 1, width: "calc(100% - 200px)", marginLeft: '200px', padding: '20px' }}>
//                 <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '50px' }}>
//                     <h1 style={{ fontSize: '2rem', display: 'inline-block', marginBottom: '20px' }}>Manage Your Books</h1>
//                     <div style={{ marginBottom: '20px' }}>
//                         <TextField
//                             variant="outlined"
//                             placeholder="Search..."
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Search />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             style={{ marginRight: '10px', width: '300px' }}
//                         />
//                         <TextField
//                             select
//                             label="Filter by Genre"
//                             value={filterGenre}
//                             onChange={(e) => setFilterGenre(e.target.value)}
//                             SelectProps={{
//                                 native: true,
//                             }}
//                             variant="outlined"
//                             style={{ width: '200px' }}
//                         >
//                             <option value="">All Genres</option>
//                             {Array.from(new Set(allBooks.map(book => book.genre))).map(genre => (
//                                 <option key={genre} value={genre}>{genre}</option>
//                             ))}
//                         </TextField>
//                     </div>
//                 </div>
//                 {filteredBooks.length === 0 ? (
//                     <p className='text-center'>No books available</p>
//                 ) : (
//                     <div style={{ overflowX: 'auto' }}>
//                         <table className="table table-striped table-bordered table-hover column-spacing mt-4" style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', borderCollapse: 'separate', borderSpacing: '0' }}>
//                             <thead>
//                                 <tr style={{ backgroundColor: 'black', color: 'white' }}>
//                                     <th style={{ padding: '10px' }}>No</th>
//                                     <th style={{ padding: '10px' }}>Book Name</th>
//                                     <th style={{ padding: '10px' }}>Author Name</th>
//                                     <th style={{ padding: '10px' }}>Genre</th>
//                                     <th style={{ padding: '10px' }}>Type</th>
//                                     <th style={{ padding: '10px' }}>Edition</th>
//                                     <th style={{ padding: '10px' }}>Description</th>
//                                     <th style={{ padding: '10px' }}>Image</th>
//                                     <th style={{ padding: '10px' }}>Pdf</th>
//                                     <th style={{ padding: '10px' }}>Edit</th>
//                                     <th style={{ padding: '10px' }}>Delete</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredBooks.map((book, index) => (
//                                     <tr key={book.bookId} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
//                                         <td style={{ padding: '10px' }}>{index + 1}</td>
//                                         <td style={{ padding: '10px' }}>{book.bookName}</td>
//                                         <td style={{ padding: '10px' }}>{book.author}</td>
//                                         <td style={{ padding: '10px' }}>{book.genre}</td>
//                                         <td style={{ padding: '10px' }}>{book.type}</td>
//                                         <td style={{ padding: '10px' }}>{book.edition}</td>
//                                         <td style={{ padding: '10px', maxWidth: '200px' }}>
//                                             <div
//                                                 style={{
//                                                     overflow: 'hidden',
//                                                     textOverflow: 'ellipsis',
//                                                     display: '-webkit-box',
//                                                     WebkitLineClamp: 2,
//                                                     WebkitBoxOrient: 'vertical',
//                                                 }}
//                                             >
//                                                 {book.description}
//                                             </div>
//                                         </td>
//                                         <td style={{ padding: '10px' }}>
//                                             <img src={book.image} className="w-50 h-25" alt={book.bookName} />
//                                         </td>
//                                         <td style={{ padding: '10px' }}>
//                                             {book.url.length > 20 ? `${book.url.substring(0, 20)}...` : book.url}
//                                         </td>
//                                         <td style={{ padding: '10px' }}>
//                                             <Button
//                                                 variant="contained"
//                                                 color="primary"
//                                                 onClick={() => handleEdit(book)}
//                                                 startIcon={<AiFillEdit />}
//                                             >
//                                                 Edit
//                                             </Button>
//                                         </td>
//                                         <td style={{ padding: '10px' }}>
//                                             <Button
//                                                 variant="contained"
//                                                 color="error"
//                                                 onClick={() => handleDelete(book.bookId)}
//                                                 startIcon={<AiFillDelete />}
//                                             >
//                                                 Delete
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Edit Book</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         name="bookName"
//                         label="Book Name"
//                         type="text"
//                         fullWidth
//                         value={updatedBook.bookName || ''}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         name="author"
//                         label="Author"
//                         type="text"
//                         fullWidth
//                         value={updatedBook.author || ''}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         name="genre"
//                         label="Genre"
//                         type="text"
//                         fullWidth
//                         value={updatedBook.genre || ''}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         name="type"
//                         label="Type"
//                         type="text"
//                         fullWidth
//                         value={updatedBook.type || ''}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         name="edition"
//                         label="Edition"
//                         type="text"
//                         fullWidth
//                         value={updatedBook.edition || ''}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         name="description"
//                         label="Description"
//                         type="text"
//                         fullWidth
//                         multiline
//                         rows={4}
//                         value={updatedBook.description || ''}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         margin="dense"
//                         name="url"
//                         label="PDF URL"
//                         type="text"
//                         fullWidth
//                         value={updatedBook.url || ''}
//                         onChange={handleChange}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSave} color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default Managebook;


import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from '../setupAxios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment } from '@mui/material';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Search } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Managebook = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [editBookId, setEditBookId] = useState(null);
    const [updatedBook, setUpdatedBook] = useState({});
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterGenre, setFilterGenre] = useState('');

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

    const handleDelete = async (id) => {
        try {
            const response = await axios.get(`/borrow/check-in-borrow-info/${id}`);
            if (response.data.isInBorrowInfo || response.data.hasAccessGranted) {
                toast.error('Cannot delete the book as it is currently being borrowed and access is granted.');
                return;
            }

            await axios.delete(`/soft-delete/${id}`);
            setAllBooks(prevBooks => prevBooks.filter(book => book.bookId !== id));
            toast.success('Book deleted successfully.');
        } catch (error) {
            console.error('Error deleting book:', error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredBooks = allBooks.filter(book => {
        const matchesSearchQuery = book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilterGenre = filterGenre ? book.genre === filterGenre : true;
        return matchesSearchQuery && matchesFilterGenre;
    });

    return (
        <div className="manage" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, width: "calc(100% - 200px)", marginLeft: '200px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '2rem', display: 'inline-block' }}>Manage Your Books</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ width: '300px' }}
                        />
                        <TextField
                            select
                            label="Filter by Genre"
                            value={filterGenre}
                            onChange={(e) => setFilterGenre(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            style={{ width: '200px' }}
                        >
                            <option value="">All Genres</option>
                            {Array.from(new Set(allBooks.map(book => book.genre))).map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </TextField>
                    </div>
                </div>
                {filteredBooks.length === 0 ? (
                    <p className='text-center'>No books available</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table table-striped table-bordered table-hover column-spacing mt-4" style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', borderCollapse: 'separate', borderSpacing: '0' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                                    <th style={{ padding: '10px' }}>No</th>
                                    <th style={{ padding: '10px' }}>Book Name</th>
                                    <th style={{ padding: '10px' }}>Author Name</th>
                                    <th style={{ padding: '10px' }}>Genre</th>
                                    <th style={{ padding: '10px' }}>Type</th>
                                    <th style={{ padding: '10px' }}>Edition</th>
                                    <th style={{ padding: '10px' }}>Description</th>
                                    <th style={{ padding: '10px' }}>Image</th>
                                    <th style={{ padding: '10px' }}>Pdf</th>
                                    <th style={{ padding: '10px' }}>Edit</th>
                                    <th style={{ padding: '10px' }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map((book, index) => (
                                    <tr key={book.bookId} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                                        <td style={{ padding: '10px' }}>{index + 1}</td>
                                        <td style={{ padding: '10px' }}>{book.bookName}</td>
                                        <td style={{ padding: '10px' }}>{book.author}</td>
                                        <td style={{ padding: '10px' }}>{book.genre}</td>
                                        <td style={{ padding: '10px' }}>{book.type}</td>
                                        <td style={{ padding: '10px' }}>{book.edition}</td>
                                        <td style={{ padding: '10px', maxWidth: '200px' }}>
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
                                        <td style={{ padding: '10px' }}>
                                            <img src={book.image} className="w-50 h-25" alt={book.bookName} />
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            {book.url.length > 20 ? `${book.url.substring(0, 20)}...` : book.url}
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleEdit(book)}
                                                startIcon={<AiFillEdit />}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                        <td style={{ padding: '10px' }}>
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
                        value={updatedBook.description || ''}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                    <TextField
                        margin="dense"
                        name="image"
                        label="Image URL"
                        type="text"
                        fullWidth
                        value={updatedBook.image || ''}
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Managebook;
