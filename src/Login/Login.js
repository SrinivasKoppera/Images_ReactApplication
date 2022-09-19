import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Grid, Paper } from '@material-ui/core';
import loginImage from './Images/loginimage3.jpg';
import loginlogo from './Images/loginlogo.jpg';
import logo from './Images/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '90%',
        },
    },

    heading: {
        textAlign: 'center',
        color: "green",
        fontSize: '28px',
        fontWeight: 900
    },
    textField: {
        width: '100%',

    },
    textBtn: {
        width: '100%',
        padding: theme.spacing(1, 2, 1, 2),
        margin: theme.spacing(2, 0)
    },
    form: {
        marginTop: theme.spacing(10)
    },


}));
//Using Yup Library for form validation
const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is Required'),
    password: Yup.string().min(6, 'Too Short').max(10, 'Too long').required('Password is Required'),

})

//Alert function
function Alert(props) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}



export default function Login() {
    const classes = useStyles();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('')
    const [message, setMessage] = useState('')


    const validUser = (values) => {
        const users = JSON.parse(localStorage.getItem('users'));
        let exits = false;
        let user = {}
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === values.email) {
                exits = true;
                user = users[i];
            }
        }
        if (!exits) {
            setSeverity('error');
            setMessage('User Doesnot exits');
            setOpen(true);
        }
        else {
            if (user.password === values.password) {
                localStorage.setItem('token', JSON.stringify(user))
                navigate('/home')
            }
            else {
                setSeverity('error');
                setMessage('Password Does not Match');
                setOpen(true);
            }
        }
    }

    //Alert Opening function


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            validUser(values)
        }

    })


    return (
        <div>
            <center>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>

                <Grid container spacing={2} >
                    <Grid item xs={8}  >
                        <Paper elevation={0} >
                            <h1 style={{ textAlign: 'start', marginLeft: '30px', marginBottom: '0px', marginTop: '5px' }}><img src={logo} alt='Error' /></h1>
                            <img src={loginImage} alt='Error' width="100%" style={{ marginLeft: '1px', borderRadius: '10px' }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={4} >
                        <Paper elevation={1}>
                            <div className={classes.form}>
                                <img src={loginlogo} width={300} alt='Error' />
                                <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>

                                    <TextField variant='outlined' placeholder='ex: abc@gmail.com' id="email" label="Email" name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email} /><br />

                                    <TextField variant='outlined' placeholder='ex:John@123456' id="password" label="Password" name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password} /><br />

                                    <div >
                                        <Button className={classes.textBtn} variant='contained' color='primary' size='small' type='submit'> Login </Button>
                                    </div>
                                    <p>You have no account please  <Link to='/registration'>Register Here</Link></p>
                                </form>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </center>
        </div >
    )
}
