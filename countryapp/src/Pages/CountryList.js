import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";

function createData(flag, name, region, population, languages, clickArrow) {
  return { flag, name, region, population, languages, clickArrow };
}

const handleChangePage = (event, newPage) => {
  //setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  //setRowsPerPage(parseInt(event.target.value, 10));
  //setPage(0);
};

const rows = [
  createData(
    "https://flagcdn.com/w320/in.png",
    "India",
    "Asia",
    1380004385,
    "English"
  ),
  createData(
    "https://flagcdn.com/w320/my.png",
    "Malaysia",
    "Asia",
    1380004385,
    "Malay"
  ),
];

const CountryList = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [loadedCountryData,setLoadedCountryData] = useState([]);

  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
       const countrys = data.map((item)=>{
            return {
                flag: item.flags.png,
                name: item.name.common,
                region: item.region,
                population: item.population,
                languages: item.languages
            };
        });
        //console.log(JSON.stringify(data[0].name.common));
        //console.log(countrys);
      setIsLoading(false);
      setLoadedCountryData(countrys);
    });  
  },[]);

  

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Flag</TableCell>
              <TableCell align="left">Name </TableCell>
              <TableCell align="left">Regions</TableCell>
              <TableCell align="left">Population</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadedCountryData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={row.flag} alt={row.name} height='60px' width='90px' />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.region}</TableCell>
                <TableCell align="left">{row.population}</TableCell>
                <TableCell align="left">
                    <ul>
                        {Object.values(row.languages || []).map(lang => <li>{lang}</li> )}
                    </ul>
                    </TableCell>
                <TableCell align="right">
                  <Button variant="text">Go</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={5}
        page={0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CountryList;
