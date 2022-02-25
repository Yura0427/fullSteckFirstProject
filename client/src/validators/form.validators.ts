import * as yup from 'yup';

export const shemaLogin = yup.object().shape({
    email: yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password minimum 6 chars.')
        .max(10, 'Password should not excced 10 chars.')
        .required('Password is required'),
});

export const shemaRegister = yup.object().shape({
    email: yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup.string()
        .min(6, 'Password minimum 6 chars.')
        .max(10, 'Password should not excced 10 chars.')
        .required('Password is required'),
    confirmPass: yup.string()
        .required('Is required')
        .when("password", {
            is: (val: string) => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
                [yup.ref("password")],
                "Both password need to be the same"
            )
        })
});