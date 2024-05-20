import { Provider } from 'react-redux';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header'
import Location from './components/Location'
import store from './redux/store';
import Home from './components/Home';
import Bidder from './components/Bidder';

function App() {
  return (
    <Provider store={store}>
        <Header />
        <Location />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bidder/:property_id' element={<Bidder />} />
      </Routes> 
      </BrowserRouter>
    </Provider>
  );
}

export default App;
