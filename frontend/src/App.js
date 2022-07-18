import './App.css';

import { Routes, Route } from 'react-router-dom';
import { Users } from './users/pages/Users';
import { NewPlace } from './places/pages/NewPlace';
import { UserPlaces } from './places/pages/UserPlaces';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';

function App() {
  return (
    <main>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />

        <Route path="*" element={<h1>The page was not found</h1>} />
      </Routes>
    </main>
  );
}

export default App;
