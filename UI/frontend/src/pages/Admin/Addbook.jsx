import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

const Addbook = () => {
    const bookCategories = [
        "Fiction",
        "Fantasy",
        "Romance",
        "Mystery and Thriller",
        "Science Fiction",
        "Historical",
        "Horror",
        "Non-fiction",
        "Romatasy",
        "Bibliography",
        "Autobiography",
        "Self-Help",
        "Kids"
      ];
    
      const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
    
      const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
      };
    
      const handleBookSubmitted = (event) => {
        event.preventDefault();
        const form = event.target;
        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const imageURL = form.imageURL.value;
        const category = form.category.value;
        const bookDescription = form.bookDescription.value;
        const bookPDFURL = form.bookPDFURL.value;
        
        const bookObj={
            bookTitle,authorName,imageURL,category,bookDescription,bookPDFURL
        }
        console.log(bookObj);
       
        fetch(" ",
        {method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(bookObj)
        }).then(res=>res.json()).then(data=>{
            // console.log(data);
            alert("Book uploaded successfully");
            form.reset();
        })
      };
    
    return (
      <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Add book</h2>
        <Form onSubmit={handleBookSubmitted} className="flex flex-col gap-4 lg:w-[1180px] mx-auto">
        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="bookTitle" className="mb-2 block">Book title</Form.Label>
          <Form.Control id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" required className="rounded-md" />
        </Form.Group>

        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="authorName" className="mb-2 block">Author</Form.Label>
          <Form.Control id="authorName" name='authorName' type="text" placeholder="Author Name" required className="rounded-md" />
        </Form.Group>
        
        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="inputState" className="mb-2 block">Genre</Form.Label>
          <Form.Select id='inputState' name='category' className='w-full rounded-md' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
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
        name="bookType"
        value={type}
        label={type.charAt(0).toUpperCase() + type.slice(1)} 
      />
    </div>
  ))}
    </Form.Group>

    <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="authorName" className="mb-2 block">Edition</Form.Label>
          <Form.Control id="authorName" name='authorName' type="text" placeholder="Author Name" required className="rounded-md" />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="bookDescription" className="mb-2 block">Book Description</Form.Label>
          <Form.Control id="bookDescription" placeholder="Book Description" required as="textarea" rows={5} className='w-full' />
        </Form.Group>
        
        <Form.Group className='flex flex-wrap gap-8'>
          <Form.Label htmlFor="imageURL" className="mb-2 block">Book image URL</Form.Label>
          <Form.Control id="imageURL" name='imageURL' type="text" placeholder="Book Image" required className="rounded-md" />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="bookPDFURL" className="mb-2 block">PDF URL</Form.Label>
          <Form.Control id="bookPDFURL" name='bookPDFURL' type="text" placeholder="Book PDF" required className="rounded-md" />
        </Form.Group>
        <Button type="submit" className='bg-blue-700 w-full px-5 py-2 hover:bg-blue-500 rounded mt-2'>Add</Button>
    

      </Form>
      </div>
    );
  };
  
  export default Addbook;
  

    
 