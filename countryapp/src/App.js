import CountryList from "./Pages/CountryList";
import {Route, Routes} from 'react-router-dom';
import CountryDetails from './Pages/CountryDetails';
import { useState } from 'react';
import NavigationBar from "./Components/NavigationBar";

function App() {

  const [searchData,setSearchData] = useState(''); 

  function searchHandler(event){
    setSearchData(event.target.value);
  }
  return (
      <div>  
        <div>
          <Routes>
            <Route path='/' element={<><NavigationBar onSearch={searchHandler} /><CountryList searchTextName={searchData} /></>}></Route>
            <Route path='/countrydetails/:countryname' element={<CountryDetails />} ></Route>
          </Routes>
        </div>
      </div>
  );
}

export default App;
