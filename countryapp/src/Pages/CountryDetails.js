import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import classes from "./CountryDetails.module.css";
import "./CountryDetails.module.css";
import ArrowLeftSharp from "@mui/icons-material/ArrowLeftSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Place from "@mui/icons-material/Place";
import Tooltip from "@mui/material/Tooltip";

const CountryDetails = () => {
  const [isItemLoading, setIsItemLoading] = useState(true);
  const [loadedCountryDataItem, setLoadedCountryDataItem] = useState([]);

  const { countryname } = useParams();
  const navigateToHome = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/" + countryname)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const countryData = data.map((item) => {
          return {
            flag: item.flags.png,
            name: item.name.common,
            capital: item.capital[0],
            region: item.region,
            subregion: item.subregion,
            population: item.population,
            latLang: item.latlng,
            maps: item.maps.googleMaps
          };
        });
        setIsItemLoading(false);
        setLoadedCountryDataItem(countryData);
      });
  }, [countryname]);

  if (isItemLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  function backHomeHandler() {
    navigateToHome("/", { replace: true });
  }

  return (
    <Card className={classes.countrydatacard} sx={{ maxWidth: 600 }}>
      {loadedCountryDataItem.filter(item =>item.name === countryname).map((item,index) => {
        return (
          <div key={index} >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="country">
                  {item.name.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.name}
              subheader={item.capital}
            />
            <div className={classes.flagpos}>
              <CardMedia
                component="img"
                height="300"
                image={item.flag}
                alt="country flag"
              />
            </div>
            <CardContent className={classes.description}>
              <Typography variant="body2" color="text.secondary">
                The country belongs to{" "}
                <span className={classes.highlighttext}>{item.region}</span>{" "}
                region and a{" "}
                <span className={classes.highlighttext}>{item.subregion}</span>{" "}
                sub-region. Located at the{" "}
                <span className={classes.highlighttext}>{item.latLang[0]}</span>{" "}
                &deg;N and{" "}
                <span className={classes.highlighttext}>{item.latLang[1]}</span>{" "}
                &deg;W, this country has a population of{" "}
                <span className={classes.highlighttext}>{item.population}</span>{" "}
                and it has gained the independent, according to CIA World
                Factbook.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="backtohome" onClick={backHomeHandler}>
                <ArrowLeftSharp />
              </IconButton>
              <Tooltip title='Navigate to google maps'>
                <IconButton aria-label="Place" onClick={()=>{
                    window.open(item.maps);
                }}>
                  <Place />
                </IconButton>
              </Tooltip>
              <div className={classes.ExpandMore}>
                <ExpandMoreIcon />
              </div>
            </CardActions>
          </div>
        );
      })}
    </Card>
  );
};

export default CountryDetails;
