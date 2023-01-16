import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from './CountryList.module.css';
import TableSortLabel from '@mui/material/TableSortLabel';


const CountryList = ({searchTextName}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [loadedCountryData, setLoadedCountryData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currPage, setCurrPage] = useState(0);
  const navigatePage = useNavigate();
  
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const countrys = data.map((item) => {
          return {
            flag: item.flags.png,
            name: item.name.common,
            region: item.region,
            population: item.population,
            languages: item.languages,
          };
        });
        setIsLoading(false);
        setLoadedCountryData(countrys);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  const offset = currPage * itemsPerPage;
  const limit = offset + itemsPerPage;
  const handleChangePage = (event, pagenumber) => {
    setCurrPage(pagenumber);
  };
  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
  };
  return (
    <div>
      <TableContainer className={classes.tablelook}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableRow}>Flag</TableCell>
              <TableCell className={classes.tableRow} align="left">
              <TableSortLabel active={true} direction='asc'onClick={()=>{
                const sortedName = loadedCountryData.sort((n1,n2)=>n1.name.localeCompare(n2.name));
                setLoadedCountryData(sortedName);
              }}>
                Name
              </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableRow} align="left">Regions</TableCell>
              <TableCell className={classes.tableRow} align="left">Population</TableCell>
              <TableCell className={classes.tableRow} align="left">Language</TableCell>
              <TableCell className={classes.tableRow} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadedCountryData.filter((itemSearch)=>itemSearch.name.toLowerCase().includes(searchTextName.toLowerCase())).slice(offset,limit).map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={row.flag}
                    alt={row.name}
                    height="60px"
                    width="90px"
                  />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.region}</TableCell>
                <TableCell align="left">{row.population}</TableCell>
                <TableCell align="left">
                  <ul>
                    {Object.values(row.languages || []).map((lang,index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell align="right">
                  <Button variant="text" onClick={()=>{
                    navigatePage('/countrydetails/'+row.name,{replace: true});
                  }}>
                    &#10148;
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination className={classes.paginationlook}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={loadedCountryData.length}
        rowsPerPage={itemsPerPage}
        page={currPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
      
    </div>
  );
};

export default CountryList;
