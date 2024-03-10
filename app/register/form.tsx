'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from '../utils/loader';
import axios from 'axios';

interface IFormInput {
    email: string;
    password: string;
    cpassword: string;
}

const formSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(4, 'Password length should be at least 4 characters')
        .max(12, 'Password cannot exceed more than 12 characters'),
    cpassword: Yup.string()
        .required('Confirm Password is required')
        .min(4, 'Password length should be at least 4 characters')
        .max(12, 'Password cannot exceed more than 12 characters')
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export default function Form() {
    const preloader = Loader();
    const [error, seterror] = useState('');
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        mode: 'onTouched',
        resolver: yupResolver(formSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        preloader.setactivate(true);

        await axios
            .post(`/api/auth/register`, {
                email: data.email,
                password: data.password,
            })
            .then((response) => {
                if (response.data?.error?.code == '23505') {
                    seterror(
                        'This email is already registered, please try a different one.'
                    );
                } else {
                    router.push('/');
                    router.refresh();
                }
                preloader.setactivate(false);
            });
    };

    return (
        <>
            {preloader.HTML}
            <form
                className='text-black flex flex-col gap-2 mx-auto max-w-md mt-10 border-solid border-2 border-current p-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className='border border-black px-1'
                    type='text'
                    placeholder='E-mail'
                    {...register('email')}
                />
                {errors.email && (
                    <p className='text-red-500 text-xs italic' role='alert'>
                        {errors.email.message}
                    </p>
                )}

                <input
                    className='border border-black px-1'
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                />
                {errors.password && (
                    <p className='text-red-500 text-xs italic' role='alert'>
                        {errors.password.message}
                    </p>
                )}

                <input
                    className='border border-black px-1'
                    type='password'
                    placeholder='Confirm password'
                    {...register('cpassword')}
                />
                {errors.cpassword && (
                    <p className='text-red-500 text-xs italic' role='alert'>
                        {errors.cpassword.message}
                    </p>
                )}
                <button
                    className='bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded'
                    type='submit'
                >
                    Register
                </button>
                {error && (
                    <p className='text-red-500 text-xs italic' role='alert'>
                        {error}
                    </p>
                )}
            </form>
        </>
    );
}
