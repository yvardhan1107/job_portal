import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Briefcase, GraduationCap } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full space-y-8'>
                    {/* Header */}
                    <div className='text-center'>
                        <div className='mx-auto h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4'>
                            <Briefcase className='h-6 w-6 text-white' />
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900'>Welcome back</h2>
                        <p className='mt-2 text-sm text-gray-600'>
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} className='mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
                        <div className='space-y-4'>
                            {/* Email */}
                            <div>
                                <Label htmlFor="email" className='text-sm font-medium text-gray-700 mb-2 block'>
                                    Email Address
                                </Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className='pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <Label htmlFor="password" className='text-sm font-medium text-gray-700 mb-2 block'>
                                    Password
                                </Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className='pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-3 block'>
                                    I am a
                                </Label>
                                <RadioGroup className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            id="student"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="student"
                                            className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${input.role === 'student'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                                }`}
                                        >
                                            <GraduationCap className='h-5 w-5 mr-2' />
                                            <span className='font-medium'>Student</span>
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            id="recruiter"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="recruiter"
                                            className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${input.role === 'recruiter'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                                }`}
                                        >
                                            <User className='h-5 w-5 mr-2' />
                                            <span className='font-medium'>Recruiter</span>
                                        </label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            {loading ? (
                                <Button
                                    type="button"
                                    disabled
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl"
                                >
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                    Signing in...
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>

                        {/* Sign Up Link */}
                        <div className='text-center'>
                            <p className='text-sm text-gray-600'>
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className='font-semibold text-blue-600 hover:text-blue-700 transition-colors'
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login