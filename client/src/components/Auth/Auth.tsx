import { TextField, Button, Typography, Link } from '@mui/material';
import { Box } from '@mui/system';
import { Form, Formik } from 'formik'
import React from 'react'
import { shemaLogin, shemaRegister } from '../../validators/form.validators';

export const Auth = () => {
    const [isLogin, setIsLogin] = React.useState(false)
    let initialValues = {
        email: '',
        password: '',
        confirmPass: ''
    }

    return (
        <Box m={5}>
            <h1>{!isLogin ? 'Signin' : 'Signup'}</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                    actions.resetForm()
                }}
                validationSchema={isLogin ? shemaRegister : shemaLogin}
            >
                {({ values, handleChange, errors, setFieldTouched,
                    touched, isValid, handleSubmit }) => (
                    <Form>
                        <TextField
                            margin='normal'
                            variant="outlined"
                            fullWidth
                            id="email"
                            name="email"
                            label="E-mail"
                            value={values.email}
                            onChange={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <TextField
                            margin='normal'
                            variant="outlined"
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={() => setFieldTouched('password')}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        {isLogin &&
                            <TextField
                                margin='normal'
                                variant="outlined"
                                fullWidth
                                id="confirmPass"
                                name="confirmPass"
                                label="Confirm password"
                                type="password"
                                value={values.confirmPass}
                                onChange={handleChange}
                                onBlur={() => setFieldTouched('confirmPass')}
                                error={touched.confirmPass && Boolean(errors.confirmPass)}
                                helperText={touched.confirmPass && errors.confirmPass}
                            />}
                        <Button
                            color="success"
                            variant="contained"
                            fullWidth type="submit"
                            disabled={!isValid}
                            onClick={() => handleSubmit}
                        >
                            Submit
                        </Button>
                        <Typography
                            m={1}
                            variant="body2"
                        >
                            {!isLogin ?
                                'Don\'t have an account?' :
                                'Do you already have an account?'}
                            <Button
                                size="small"
                                onClick={() => setIsLogin(!isLogin)}

                            >
                                {!isLogin ?
                                    'Go to Registrer' :
                                    'Go to Login'}
                            </Button>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </Box>

    )
}
