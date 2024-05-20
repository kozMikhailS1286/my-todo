import React from 'react';
import {useFormik} from 'formik';

const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: " "
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="Email">Email</label>
                <input
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    title='haha'
                />
                <label htmlFor="Password">Password</label>
                <input
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <label htmlFor="">Remember Me</label>
                <input
                    name="rememberMe"
                    type="checkbox"
                    onChange={formik.handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;