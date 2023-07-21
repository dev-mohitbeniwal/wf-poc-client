"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {signIn} from 'next-auth/react';
import Input from "../../components/Input";
import Button from "../../components/Button";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [age, setAge] = useState('');
    const [balance, setBalance] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();
        signIn('credentials', {redirect: false, username, password})
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/user/register`, {name, username, department, age, balance, password});
            console.log("Register User response: ", response);
        } catch(error) {
            console.log("Failed to register. Error: ", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {isLogin ? 'Sign in' : 'Sign up'}
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={isLogin ? handleLogin : handleRegister}>
                        {!isLogin && (
                            <>
                                <Input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <Input type="text" name="department" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                <Input type="number" name="age" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                <Input type="number" name="balance" placeholder="Balance in rupees" value={balance} onChange={(e) => setBalance(e.target.value)} />
                            </>
                        )}
                        <Input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="text" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button>{isLogin ? 'Sign in' : 'Sign up'}</Button>
                    </form>
                    <div>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            {isLogin ? 'Need an account?' : 'Already have an account?'}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? ' Sign up' : ' Sign in'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}