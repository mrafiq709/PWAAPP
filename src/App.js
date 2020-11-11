import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setLoading(true);
    axios.get('/json/data.json').then(res => {
      setTimeout(()=>{
        setBooks(res.data);
        setLoading(false);
      }, 1000)
      
    });
  }, []);

  const refresh = () => {
    setBooks([]);
    setLoading(true);

    axios.get('/json/data.json').then(res => {
      setTimeout(()=>{
        setBooks(res.data);
        setLoading(false);
      }, 1000)
      
    });
  }

  return (
    <section className="container">
      {loading ? <h1>Loading</h1> : (<div>
        <h1>Playing counting</h1>
        <button onClick={() => setCount(count + 1)}>Counting: </button> <span>{count}</span>
        <h1>Blogs</h1>
        <button onClick={refresh}>refresh</button>
        <div>
          {books.map(b => (
            <div key={b.title} className="item">
              <h2>{b.title}</h2>
              <p><span style={{ color: 'grey' }}>Author: {b.author}</span></p>
              <p><span style={{ color: 'grey' }}>Genre: {b.genre}</span></p>
              <p style={{ color: 'grey' }}> {b.content} </p>

            </div>
          ))}
        </div>
      </div>
    )}
    </section>
  );
}

export default App;
