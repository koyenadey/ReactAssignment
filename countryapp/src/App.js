import CountryList from "./Pages/CountryList";
import {Route, Routes} from 'react-router-dom';
import CountryDetails from './Pages/CountryDetails';
import { useParams } from 'react-router-dom';

function App() {

  function dataLoadHandler(){

  }

  return (
      <div>
        <div>
          <Routes>
            <Route path='/' element={<CountryList />}></Route>
            <Route path='/countrydetails/:countryname' element={<CountryDetails />} ></Route>
          </Routes>
        </div>
      </div>
  );
}

export default App;
