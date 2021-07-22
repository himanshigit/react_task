import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  typography: {
    padding: theme.spacing(2),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  paper: {
    height: 190,
    width: 150,
  },

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  justify_center:{
    display: "flex",
    justifyContent: "center",
  },

  padding: {
    padding: theme.spacing(2,2),
  },

  favouriteColor: {
    color: "red",
  },
  
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  padding_favourites: {
    padding: "24px",
  },

  title_style: {
    fontSize: "12px",
    fontWeight: "700",
    verticalAlign: "super",
    marginLeft: "2px",
  },

  label_style: {
    fontSize: "18px",
    fontWeight: "700",
    verticalAlign: "super",
    marginLeft: "2px",
  },

  vertically_top: {
    verticalAlign: 'top',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ListMovies = () => {

  const classes = useStyles();

  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [key, setKey] = useState(0);
  const [anchor, setAnchor] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rating, setRating] = useState(0);
  const [favourites, setFavourites] = useState([]);
  const [comment, setComment] = useState('');

  const handleClick = (event,key) => {
    setAnchorEl(event.currentTarget);
    setKey(key);
  };

  const handleClose = () => {
    setAnchorEl(null);
    values[key].favourite=true;
    values[key].rating=rating;
    values[key].comments=comment;
    favourites.includes(values[key]) ? console.log(true) : setFavourites(favourites.concat(values[key]));
    setComment('');
    setRating(0);
    setValues(values);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const getMovies = function (event){
    let url = 'https://omdbapi.com/?s='+event.target.value+'&apikey=a988130c&type=movie&page=1';
    fetch(url).then(res => res.json()).then(
      (result) => {
        result.Search !== undefined ?
        setValues(result.Search.map(item=> { return {...item, favourite : false, rating: 0, comments: ""}})) : setValues([])
        setCount(Math.round(result.totalResults/10))
        setSearchResult(event.target.value)
      }
    );
  }

  const handleFavourite = function(key){
    favourites.splice(key,1);
    setFavourites([...favourites]);
  }


  const onPageChange = function (event){
    let url = 'https://omdbapi.com/?s='+searchResult+'&apikey=a988130c&type=movie&page='+event.target.textContent;
    fetch(url).then(res => res.json()).then(
      (result) => {
        result.Search !== undefined ?
        setValues(result.Search) : setValues([])
      }
    );
  }

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          onClick={()=>setAnchor(true)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Favourites List
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            type="text"
            onChange={(event) => getMovies(event)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={10} className={classes.padding}>
          {values.map(function(item,key){
            return(
              <React.Fragment key={key}>
                  <Grid key={key} item>
                  <img className={classes.paper} src={item.Poster} alt="No Preview Available !"/>
                  <Grid key={key} item>
                    <p className={classes.title_style}>{item.Title}</p>
                    <Button aria-describedby={id} variant="contained" color="primary" onClick={(event)=>handleClick(event,key)}>
                      Favourite Movie
                    </Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                        <label className={classes.label_style}>
                          Comment and Rate:
                          <InputBase
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            type="text"
                            onChange={(event) => setComment(event.target.value)}
                            inputProps={{ 'aria-label': 'search' }}
                          />
                        </label>
                        <Rating
                          name="simple-controlled"
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(event.target.value)
                          }}
                        />
                    </Popover>
                  </Grid>
                </Grid>
              </React.Fragment>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
      <Drawer anchor="left" open={anchor} onClose={()=>setAnchor(false)}>
        {
          favourites.map(function(item,key){
            return (
              <React.Fragment key={key}>
                <div className={classes.padding_favourites}>
                  <img className={classes.paper} src={item.Poster} alt="No Preview Available !"/>
                  <CancelIcon className={classes.vertically_top} onClick={()=>handleFavourite(key)}></CancelIcon>
                  <p className={classes.title_style}>{item.Title}</p>
                  <Rating
                    name="simple-controlled"
                    value={item.rating}
                  />
                  <p className={classes.title_style}>{item.comments}</p>
                </div>
              </React.Fragment>
            )
          })
        }
      </Drawer>
    {count>0 && <Pagination className={classes.justify_center} onClick={(event) => onPageChange(event)} count={count}/>}
  </div>
  );
}


export default ListMovies;

