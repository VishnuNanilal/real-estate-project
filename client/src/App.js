import './App.css';
import Header from './components/Header'
import Location from './components/Location'
import Map from './components/Map'
import Register from './components/Register';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <Header/>
      <Location/>
      <Register />
      <SignIn/>
      <Map/>
    </div>
  );
}

export default App;
