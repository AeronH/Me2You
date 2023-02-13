import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import homePage from './pages/homePage';
import createPostPage from './pages/createPostPage';
import postPage from './pages/postPage';
import accountPage from './pages/accountPage';

function App() {
  return (
    <div className="App bg-red-200 h-screen">
      <Router>
        <Route path="/home" component={homePage} />
        <Route path="/post/:id" component={postPage} />
        <Route path="/create" component={createPostPage} />
      </Router>
    </div>
  )
}

export default App
