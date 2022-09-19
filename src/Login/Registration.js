import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Grid, Paper } from '@material-ui/core';
import RegistrationImage from './Images/registrationlmage.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './Images/logo.png'


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
        fontSize: '40px',
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
    }

}));
//Using Yup Library for form validation
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Must be Required'),
    email: Yup.string().email().required('Email is Required'),
    phoneNumber: Yup.number().required('Phone Number is Required'),
    password: Yup.string().min(6, 'Too Short').max(10, 'Too long').required('Password is Required'),

})

//Alert function
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Registration() {
    const classes = useStyles();
    const navigate = useNavigate();
    const registrationUser = (values, reset) => {
        const gotoLogin = () => {
            navigate('/')
        }
        let users = JSON.parse(localStorage.getItem('users'));
        let exits = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === values.email) {
                exits = true;
            }
        }
        if (!exits) {
            let newArray = [...users];
            newArray.push(values);
            localStorage.setItem('users', JSON.stringify(newArray))
            setOpen(true);
            setMessage('User Added Successfully');
            setSeverity('success');
            reset();
            setTimeout(gotoLogin(), 10000)

        }
        else {
            setMessage('User Already Exits');
            setSeverity('error')
            setOpen(true)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('users') === null) {
            localStorage.setItem('users', JSON.stringify([]));
        }

    }, [])

    const formik = useFormik({
        initialValues: { name: '', email: '', phoneNumber: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            registrationUser(values, resetForm)
        }

    })


    //Alert Function
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


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
                            <img src={RegistrationImage} alt='Error' style={{marginLeft:'1px', borderRadius:'10px'}} width="100%" />
                        </Paper>
                    </Grid>
                    <Grid item xs={4} >
                        <Paper elevation={1} className={classes.form}>
                            <div>
                                <h2 className={classes.heading}>Registration</h2>
                                <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <TextField variant='outlined' placeholder='ex: Please Enter Your Name' id="name" label="Name" name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name} /><br />

                                    <TextField variant='outlined' placeholder='ex: abc@gmail.com' id="email" label="Email" name='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email} /><br />

                                    <TextField variant='outlined' placeholder='ex: Please Enter Your Phone Number' id="phoneNumber" label="Phone Nummber" name='phoneNumber'
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber} /><br />


                                    <TextField variant='outlined' placeholder='ex:John@123456' id="password" label="Password" name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password} /><br />

                                    <div >
                                        <Button className={classes.textBtn} variant='contained' color='primary' size='small' type='submit'> Registration </Button>
                                    </div>
                                    <p style={{ marginBottom: 10 }}>Already have an account <Link to='/'>Login</Link></p>
                                </form>
                            </div>

                        </Paper>
                    </Grid>
                </Grid>
            </center>
        </div >
    )
}
