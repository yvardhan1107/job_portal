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
import { setLoading } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Phone, Upload, Briefcase, GraduationCap } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        file: ""
    });
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validate phone number - must be exactly 10 digits
        if (!input.phoneNumber || !/^\d{10}$/.test(input.phoneNumber)) {
            setPhoneError("Phone number must be exactly 10 digits");
            return;
        }
        setPhoneError("");
        
        // Validate passwords match
        if (!input.password || !input.confirmPassword) {
            setPasswordError("Both password fields are required");
            return;
        }
        
        if (input.password !== input.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        
        if (input.password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }
        
        setPasswordError("");
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 py-12'>
                <div className='max-w-md w-full space-y-8'>
                    {/* Header */}
                    <div className='text-center'>
                        <div className='mx-auto h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4'>
                            <Briefcase className='h-6 w-6 text-white' />
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900'>Create your account</h2>
                        <p className='mt-2 text-sm text-gray-600'>
                            Join thousands of job seekers and recruiters
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler} className='mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100'>
                        <div className='space-y-4'>
                            {/* Full Name */}
                            <div>
                                <Label htmlFor="fullname" className='text-sm font-medium text-gray-700 mb-2 block'>
                                    Full Name
                                </Label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                                    <Input
                                        id="fullname"
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your full name"
                                        className='pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                            </div>

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

                            {/* Phone Number */}
                            <div>
                                <Label htmlFor="phoneNumber" className='text-sm font-medium text-gray-700 mb-2 block'>
                                    Phone Number
                                </Label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your phone number"
                                        className={`pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${phoneError ? 'border-red-500' : ''}`}
                                        required
                                    />
                                </div>
                                {phoneError && <p className='text-red-500 text-sm mt-1'>{phoneError}</p>}
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
                                        placeholder="Create a password"
                                        className={`pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${passwordError ? 'border-red-500' : ''}`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <Label htmlFor="confirmPassword" className='text-sm font-medium text-gray-700 mb-2 block'>
                                    Confirm Password
                                </Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={input.confirmPassword}
                                        name="confirmPassword"
                                        onChange={changeEventHandler}
                                        placeholder="Confirm your password"
                                        className={`pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${passwordError ? 'border-red-500' : ''}`}
                                        required
                                    />
                                </div>
                                {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
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
                                            id="student-role"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="student-role"
                                            className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                input.role === 'student'
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
                                            id="recruiter-role"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="recruiter-role"
                                            className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                                input.role === 'recruiter'
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

                            {/* Profile Photo Upload */}
                            <div>
                                <Label htmlFor="file" className='text-sm font-medium text-gray-700 mb-2 block'>
                                    Profile Photo (Optional)
                                </Label>
                                <div className='relative'>
                                    <input
                                        id="file"
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className='sr-only'
                                    />
                                    <label
                                        htmlFor="file"
                                        className='flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200'
                                    >
                                        <Upload className='h-5 w-5 mr-2 text-gray-400' />
                                        <span className='text-sm text-gray-600'>
                                            {input.file ? input.file.name : 'Upload profile photo'}
                                        </span>
                                    </label>
                                </div>
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
                                    Creating account...
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Create Account
                                </Button>
                            )}
                        </div>

                        {/* Login Link */}
                        <div className='text-center'>
                            <p className='text-sm text-gray-600'>
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className='font-semibold text-blue-600 hover:text-blue-700 transition-colors'
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup