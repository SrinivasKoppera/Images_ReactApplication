import { Navigate } from 'react-router-dom';
export default function PublicRoute({ component: Component, ...rest }) {

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

        return <Navigate to='/home' />
    }
    else {
        return <Component {...rest} />
    }
}
