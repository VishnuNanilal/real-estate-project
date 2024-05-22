import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Location from './components/Location'
import store from './redux/store';
import Home from './components/Home';
import Bidder from './components/Bidder';
import Register from './components/Register';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Location />
      <div className='main-cont'>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/bidder/:property_id' element={<ProtectedRoute><Bidder /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
