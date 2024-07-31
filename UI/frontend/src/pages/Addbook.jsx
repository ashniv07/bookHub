import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/Sidebar';
import axios from '../setupAxios';
import { FaBook } from 'react-icons/fa';  // Import an icon

const Addbook = () => {
    const bookCategories = [
        "Fantasy",
        "Romance",
        "Thriller",
        "Science Fiction",
        "Study Materials",
        "Horror",
        "Comic",
        "Self-Help",
    ];

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

    const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
    };

    const handleBookSubmitted = (event) => {
        event.preventDefault();
        const form = event.target;
        const bookName = form.bookName.value;
        const author = form.author.value;
        const genre = form.genre.value;
        const type = form.type.value;
        const edition = form.edition.value;
        const description = form.description.value;
        const image = form.image.value;
        const url = form.url.value;

        const bookObj = {
            bookName,
            author,
            genre,
            type,
            edition,
            description,
            image,
            url
        };

        axios.post("/savebooks", bookObj)
            .then((res) => {
                alert("Book uploaded successfully");
                form.reset();
            })
            .catch((error) => {
                console.error("Error uploading book:", error);
            });
    };

    return (
        <div className='d-flex' style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #e9ecef)'}}>
            <Sidebar />
            <div className='d-flex flex-column align-items-center justify-content-center mt-3 py-4' style={{ width: "calc(100% - 200px)", marginLeft:'200px' }}>
                <div className='text-center mb-4'>
                    <h2 className='d-inline-flex align-items-center mb-3'>
                        <FaBook className='me-3' />
                        Add A New Book
                    </h2>
                </div>
                <div className='w-50 p-5 shadow-lg' style={{ maxWidth: '1000px', borderRadius: '8px', background:'#ffffff', border: '1px solid black' }}>
                    <Form onSubmit={handleBookSubmitted} className="d-flex flex-column gap-4">
                        <Form.Group>
                            <Form.Label htmlFor="bookName" className="mb-3 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>Book title</Form.Label>
                            <Form.Control id="bookName" name='bookName' type="text" placeholder="Book Name" required className="rounded-md" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="author" className="mb-3 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>Author</Form.Label>
                            <Form.Control id="author" name='author' type="text" placeholder="Author Name" required className="rounded-md" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="inputState" className="mb-3 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>Genre</Form.Label>
                            <Form.Select id='inputState' name='genre' className='w-full rounded-md' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                                {bookCategories.map(option => <option key={option} value={option}>{option}</option>)}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="mb-4 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>Type</Form.Label>
                            <br />
                            {['premium', 'normal'].map((type) => (
                                <div key={`default-${type}`} className="mb-3 ">
                                    <Form.Check
                                        type="radio"
                                        id={`default-${type}`}
                                        name="type"
                                        value={type}
                                        label={type.charAt(0).toUpperCase() + type.slice(1)}
                                    />
                                </div>
                            ))}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="edition" className="mb-3 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>Edition</Form.Label>
                            <Form.Control id="edition" name='edition' type="text" placeholder="edition" required className="rounded-md" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="description" className="mb-3 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>Book Description</Form.Label>
                            <Form.Control id="description" placeholder="Book Description" required as="textarea" rows={5} className='w-full' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="image" className="mb-3 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>Book image URL</Form.Label>
                            <Form.Control id="image" name='image' type="text" placeholder="Book Image" required className="rounded-md" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="url" className="mb-3 block" style={{ fontSize: '20px', fontWeight: 'bold' }}>PDF URL</Form.Label>
                            <Form.Control id="url" name='url' type="text" placeholder="Book PDF" required className="rounded-md" />
                        </Form.Group>
                        <Button type="submit" className="bg-purple-600 text-white px-5 py-2 hover:bg-purple-500 rounded mt-4"
                        style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', margin: '0 auto' }} >
                        Add
                      </Button>       
                        </Form>
                </div>
            </div>
        </div>
    );
};

export default Addbook;
