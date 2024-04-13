import React from 'react';
import Button from '../components/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
      <h1>Hello Marc</h1>
      <Button></Button>
    </div>
)

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <Link  to="/">home</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
