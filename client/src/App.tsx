import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios';
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [newPost, setNewPost] = useState('');

  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const response = await axios.get('http://localhost:3080/api/posts/all');
      setPosts(response.data);

      console.log(response.data);
    } catch {
      // do nothing
    }
  }

  async function onSubmitPost(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3080/api/posts', {
        bodyText: newPost,
        username: username,
      })
    } catch {
      // do nothing
    }
  }

  useEffect(() => {
    getPosts();
  }, [])
  return (
    <div className="App" onSubmit={onSubmitPost}>
      <form action="submit">
        <input type="text" placeholder="Post" onChange={(e) => setNewPost(e.target.value)}/>
        <input type="text"  placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <button type='submit'>Login</button>
      </form>
      <h1>{username} + {newPost}</h1>
      <ul>
        {posts.map((post) => {
          return <p>{post.bodyText}</p>
        })}
      </ul>
    </div>
  )
}

export default App
