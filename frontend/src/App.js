import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Users } from './users/pages/Users';
import { NewPlace } from './places/pages/NewPlace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="places/new" element={<NewPlace />} />
        <Route path="*" element={<h1>The page was not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
