import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {

    //Checking the Local Storage
    const isLogin = () => {
        if (localStorage.getItem('token')) {
            return true;
        }
        else {
            return false;
        }
    }

    //Router Creating
    if (isLogin()) {
        return <Component {...rest} />
    }
    else {

        return <Navigate to="/" />
    }

}
