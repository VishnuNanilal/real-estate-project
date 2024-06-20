import { Provider } from 'react-redux';
import './App.css';
import './components/style/components.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Location from './components/Location'
import store from './redux/store';
import Home from './components/Home';
import Bidding from './components/Bidding';
import Register from './components/Register';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
import Settings from './components/Profile/Settings';
import Seller from './components/Seller';
import DashBoard from './components/DashBoard';
import Info from './components/Additional/Info';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <div className='background-image'>
            <Header />
            <Location />
            <main>
              <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/info/*' element={<Info />} />
                <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path='/seller' element={<ProtectedRoute><Seller /></ProtectedRoute>} />
                <Route path='/dashboard' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
                <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/bidder/:property_id' element={<ProtectedRoute><Bidding /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
      </BrowserRouter>
    </Provider >
  );
}

export default App;
