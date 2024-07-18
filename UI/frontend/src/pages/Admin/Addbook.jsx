import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

const Addbook = () => {
    const bookCategories = [
        "Fantasy",
        "Romance",
        "Mystery and Thriller",
        "Science Fiction",
        "Historical",
        "Horror",
        "Non-fiction",
        "Self-Help",
    ];

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

    const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
    };

    const handleBookSubmitted = (event) => {
        event.preventDefault();
        const form = event.target;
        console.log(form.bookName);
        const bookName=form.bookName.value;
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
        console.log(bookObj);

        fetch("http://localhost:8080/savebooks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookObj),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                alert("Book uploaded successfully");
                form.reset();
            })
            .catch((error) => {
                console.error("Error uploading book:", error);
            });
    };


    
    return (
      <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Add book</h2>
        <Form onSubmit={handleBookSubmitted} className="flex flex-col gap-4 lg:w-[1180px] mx-auto">
        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="bookName" className="mb-2 block">Book title</Form.Label>
          <Form.Control id="bookName" name='bookName' type="text" placeholder="Book Name"  required className="rounded-md" />
        </Form.Group>

        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="author" className="mb-2 block">Author</Form.Label>
          <Form.Control id="author" name='author' type="text" placeholder="Author Name" required className="rounded-md" />
        </Form.Group>
        
        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="inputState" className="mb-2 block">Genre</Form.Label>
          <Form.Select id='inputState' name='genre' className='w-full rounded-md' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
            {bookCategories.map(option => <option key={option} value={option}>{option}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group>
        <Form.Label className="mb-2 block">Type</Form.Label>
        <br/>
  {['premium', 'normal'].map((type) => (
    <div key={`default-${type}`} className="mb-3 form-check-inline">
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

    <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="edition" className="mb-2 block">Edition</Form.Label>
          <Form.Control id="edition" name='edition' type="text" placeholder="edition" required className="rounded-md" />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="description" className="mb-2 block">Book Description</Form.Label>
          <Form.Control id="description" placeholder="Book Description" required as="textarea" rows={5} className='w-full' />
        </Form.Group>
        
        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="image" className="mb-2 block">Book image URL</Form.Label>
          <Form.Control id="image" name='image' type="text" placeholder="Book Image" required className="rounded-md" />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="url" className="mb-2 block">PDF URL</Form.Label>
          <Form.Control id="url" name='url' type="text" placeholder="Book PDF" required className="rounded-md" />
        </Form.Group>
        <Button type="submit" className='bg-blue-700 w-full px-5 py-2 hover:bg-blue-500 rounded mt-2'>Add</Button>
    

      </Form>
      </div>
    );
  };
  
  export default Addbook;
  

    
 