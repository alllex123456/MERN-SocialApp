import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Users } from './users/pages/Users';
import { NewPlace } from './places/pages/NewPlace';
import { Places } from './places/pages/Places';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';

function App() {
  return (
    <main>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/new" element={<NewPlace />} />

        <Route path="*" element={<h1>The page was not found</h1>} />
      </Routes>
    </main>
  );
}

export default App;
