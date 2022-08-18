import './App.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';
import { Users } from './users/pages/Users';
import { NewPlace } from './places/pages/NewPlace';
import { UserPlaces } from './places/pages/UserPlaces';
import { MainNavigation } from './shared/components/Navigation/MainNavigation';
import { UpdatePlace } from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const navigator = useNavigate();

  const login = (uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    navigator('/', { replace: true });
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      <main>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          {isLoggedIn && <Route path="/places/new" element={<NewPlace />} />}
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<h1>The page was not found</h1>} />
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
