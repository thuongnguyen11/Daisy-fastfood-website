import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { register } from '../store/auth.store';

import { phoneRegExp } from "../common/regex-patterns";
import Logo from "../assets/logo.png";


export default function Register() {

    const history = useHistory();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Tên không được để trống!"),
        phone_number: Yup.string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ.')
            .test(
                "len",
                "Số điện thoại không hợp lệ.",
                (val) =>
                    val &&
                    val.toString().length >= 9 &&
                    val.toString().length <= 11
            )
            .required("Số điện thoại không được để trống!"),
        password: Yup.string()
            .test(
                "len",
                "Mật khẩu phải dài hơn 6 kí tự.",
                (val) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("Mật khẩu không được để trống!"),
    });

    const handleRegister = (formValue) => {
        const { name, phone_number, password } = formValue;

        dispatch(register({ name, phone_number, password }))
            .unwrap()
            .then(() => {
                history.push('/menu');
            })
            .catch(() => {
            });
    };

    return (
        <>
            <div className="h-5/6 flex flex-col justify-center my-12 mb-16 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                        className="mx-auto"
                        src={Logo}
                        alt="Logo"
                    />
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Đăng ký tài khoản</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                        <Formik
                            initialValues={{ name: '', phone_number: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                handleRegister(values);
                            }}
                        >
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ và tên
                                    </label>

                                    <Field name="name" >
                                        {({
                                            field,
                                            form: { touched, errors },
                                            meta,
                                        }) => (
                                            <div>
                                                <input type="text" placeholder="Tên của bạn" {...field}
                                                    className={
                                                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" + (meta.touched && meta.error ? 'border-2 border-red-500' : '')
                                                    } />
                                                {meta.touched && meta.error && (
                                                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại
                                    </label>

                                    <Field name="phone_number" >
                                        {({
                                            field,
                                            form: { touched, errors },
                                            meta,
                                        }) => (
                                            <div>
                                                <input type="text" placeholder="Số điện thoại của bạn" {...field}
                                                    className={
                                                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" + (meta.touched && meta.error ? 'border-2 border-red-500' : '')
                                                    } />
                                                {meta.touched && meta.error && (
                                                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mật khẩu
                                    </label>

                                    <Field name="password">
                                        {({
                                            field,
                                            form: { touched, errors },
                                            meta,
                                        }) => (
                                            <div>
                                                <input type="password" placeholder="Mật khẩu" {...field}
                                                    className={
                                                        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" + (meta.touched && meta.error ? 'border-2 border-red-500' : '')
                                                    } />
                                                {meta.touched && meta.error && (
                                                    <div className="text-sm text-red-500 mt-1">{meta.error}</div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <div>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ">
                                        {
                                            loading
                                                ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                : null
                                        }
                                        Đăng ký
                                    </button>
                                </div>
                            </Form>
                        </Formik>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Đã có tài khoản?
                                        <Link to='login' className='ml-2 text-yellow-500 font-bold'>Đăng nhập ngay</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}