import { Provider } from 'react-redux';
import './App.css';
import Header from './components/Header'
import Location from './components/Location'
import Map from './components/Map'
import Register from './components/Register';
import SignIn from './components/SignIn';
import SellerRegister from './components/SellerRegister';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Location />
        <Register />
        <SellerRegister />
        <SignIn />
        <Map />
      </div>
    </Provider>
  );
}

export default App;
