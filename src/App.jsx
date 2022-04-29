import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import React from 'react'


function App() {

  const [books, setBooks] = useState([])
  const [bookTitle, setTitle] = useState('')
  const [bookDesc, setDesc] = useState('')

  const fetchData = () => {
    fetch("http://139.59.226.178:8081/api/books/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setBooks(data)
      })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "title": bookTitle,
        "description": bookDesc
      })
    }
    fetch("http://139.59.226.178:8081/api/books/",requestOptions)
    .then(response => {return response.json()})

    console.log(bookTitle);
    console.log(bookDesc);
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (

    <div>
      <div>
      {books.length > 0 && (
        <ul>
          {books.map(book => (
            <li key={book._id}>Book title :{book.title} BookDesc: {book.description}</li>
          ))}
        </ul>
      )}
      </div>
    

      <div>
        <form class="mb-4 flex" onSubmit={handleSubmit}>
          <div class="w-full max-w-xs">
            <div class="mb-4">
              <input class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" 
              onChange={(e) => setTitle(e.target.value)} 
              value = {bookTitle}
              placeholder="Book Title"/>
            </div>
            <div class="mb-6">
              <input class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              onChange={(e) => setDesc(e.target.value)} 
              value = {bookDesc}               
              placeholder="Book Description"/>
            </div>
        
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create</button>
          </div>
      </form>
      </div>

    </div>
  )
}

export default App
