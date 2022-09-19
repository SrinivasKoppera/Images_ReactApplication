
import React from 'react';
import errorImage from './Images/error.jpeg';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
  btn: {
    color: 'white',
    padding: '10px',
    fontWeight: 'bolder',
    marginBottom: '20px',
    backgroundColor: 'red',
    border: 'none',
    borderRadius: '5px',
  },
  


}))
export default function Notfound() {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div>
      <center>
        <h1 style={{ color: 'red', fontSize: '50px' }}>Opps Error : 404</h1>
        <img src={errorImage} alt='Error' />
        <button className={classes.btn} onClick={() => { navigate('/home') }}>Go to Home Page</button>
      </center>
    </div>
  )
}
