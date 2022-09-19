import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const [imgname, setImg] = useState('')
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setImg(e.target.value);
    }

    return (
        <div className='bgimage'>
            <div>
                <div className='header'>
                    <h2 style={{ 'marginLeft': '10px', 'color': 'white', 'fontSize': '50px' }}> Images Dekho..!</h2>
                    <div className='buttuns'>
                        <button className='authentication' onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/')
                        }}>Sign Out</button> &nbsp;
                    </div>
                </div>
            </div>
            <div className='hero'>
                <h1>Stunning free images and royalty free stock</h1>
                <h3>Over 2.3 million + high quality images shared by our talented community.</h3>
                <input onChange={onChangeHandler} className='inputfield' type='text' placeholder='Search here for Images ' size='80' /><br />
                <button className='searchbutton' onClick={() => { imgname && navigate(`/search/${imgname}`) }}>Search</button>
            </div>

        </div>
    )
}

export default Home