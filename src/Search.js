import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    headingStyele:{
        fontStyle:'italic',
        fontSize:'23px',
        backgroundColor:'#093145',
        color:'#EFD469',
        borderRadius:'10px'
        
        
        
    }
}))


export default function Search() {
    const params = useParams();
    const [data, setData] = useState([])
    const classes = useStyles();

    useEffect(() => {
        axios.get(`https://pixabay.com/api/?key=7685538-ea988db1f25ef51f3d2df1490&q=${params.imgname}&image_type=photo`)
            .then(res => setData(res.data.hits))

    }, []);

    return (
        <div className='search'>
            <h1 style={{ color: 'green', fontWeight: 900, fontStyle: 'italic' }}>🎈🎆🎇✨WELCOME TO SRINIVAS IMAGES STORE✨🎇🎆🎈</h1>
            <div className='row'>
                {data && data.map(imgObj => {
                    return <>
                        <div >
                            <img key={imgObj.id} src={imgObj.largeImageURL} alt='Error' height='600px' width='100%' />
                        </div>
                        <div className={classes.headingStyele}>
                            <h3>Image : - {imgObj.tags}</h3>
                        </div>
                    </>
                })}
            </div>
        </div>
    )
}
