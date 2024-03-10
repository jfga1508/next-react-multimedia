'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Loader } from '../utils/loader';

interface IFormInput {
    email: string;
    password: string;
}

const formSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(4, 'Password length should be at least 4 characters')
        .max(12, 'Password cannot exceed more than 12 characters'),
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

        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (!response?.error) {
            router.push('/');
            router.refresh();
        } else {
            seterror('Wrong credentials info, please check and try again.');
        }
        preloader.setactivate(false);
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
                    {...register('email', {
                        required: 'Email Address is required.',
                    })}
                />
                {errors.email && (
                    <p
                        className='text-red-500 text-xs italic error-email'
                        role='alert'
                        title='Email alert'
                    >
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
                    <p
                        className='text-red-500 text-xs italic error-password'
                        role='alert'
                        title='Password alert'
                    >
                        {errors.password.message}
                    </p>
                )}

                <button
                    className='bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded'
                    type='submit'
                >
                    Login
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
