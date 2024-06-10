import { Provider } from 'react-redux';
import './App.css';
import './components/style/components.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Location from './components/Location'
import store from './redux/store';
import Home from './components/Home';
import Bidder from './components/Bidder';
import Register from './components/Register';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
import Settings from './components/Profile/Settings';
import Seller from './components/Seller';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Location />
        <div className='main-cont'>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path='/seller' element={<ProtectedRoute><Seller /></ProtectedRoute>}/>
            <Route path='/settings' element={<ProtectedRoute><Settings/></ProtectedRoute>} />
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/bidder/:property_id' element={<ProtectedRoute><Bidder /></ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider >
  );
}

export default App;
