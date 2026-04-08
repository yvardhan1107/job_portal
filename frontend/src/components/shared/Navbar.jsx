import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Briefcase, Building2, Home, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <nav className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <Link to="/" className='flex items-center space-x-2'>
                            <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                                <Briefcase className='h-5 w-5 text-white' />
                            </div>
                            <span className='text-2xl font-bold text-gray-900'>
                                Job<span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Portal</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <ul className='flex items-center space-x-8'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link to="/admin/companies" className='flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium'>
                                                <Building2 className='h-4 w-4 mr-2' />
                                                Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/jobs" className='flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium'>
                                                <Briefcase className='h-4 w-4 mr-2' />
                                                Jobs
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/" className='flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium'>
                                                <Home className='h-4 w-4 mr-2' />
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/jobs" className='flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium'>
                                                <Briefcase className='h-4 w-4 mr-2' />
                                                Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/browse" className='flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium'>
                                                <Search className='h-4 w-4 mr-2' />
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>

                    {/* User Actions */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {
                            !user ? (
                                <div className='flex items-center space-x-3'>
                                    <Link to="/login">
                                        <Button variant="outline" className='px-6 py-2 border-gray-300 hover:border-blue-500 hover:text-blue-600'>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200'>
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className='relative h-10 w-10 rounded-full p-0 hover:bg-gray-100'>
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-6" align="end">
                                        <div className='space-y-4'>
                                            <div className='flex items-center space-x-3'>
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                </Avatar>
                                                <div className='flex-1 min-w-0'>
                                                    <h4 className='font-semibold text-gray-900 truncate'>{user?.fullname}</h4>
                                                    <p className='text-sm text-gray-500 truncate'>{user?.email}</p>
                                                    <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1'>
                                                        {user?.role}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className='border-t border-gray-200 pt-4 space-y-2'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <Button variant="ghost" className='w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50'>
                                                            <User2 className='h-4 w-4 mr-3' />
                                                            <Link to="/profile" className='flex-1 text-left'>View Profile</Link>
                                                        </Button>
                                                    )
                                                }
                                                <Button 
                                                    onClick={logoutHandler} 
                                                    variant="ghost" 
                                                    className='w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50'
                                                >
                                                    <LogOut className='h-4 w-4 mr-3' />
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMobileMenu}
                            className='p-2'
                        >
                            {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className='md:hidden border-t border-gray-200 bg-white'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <Link 
                                            to="/admin/companies" 
                                            className='flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Building2 className='h-4 w-4 mr-3' />
                                            Companies
                                        </Link>
                                        <Link 
                                            to="/admin/jobs" 
                                            className='flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Briefcase className='h-4 w-4 mr-3' />
                                            Jobs
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            to="/" 
                                            className='flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Home className='h-4 w-4 mr-3' />
                                            Home
                                        </Link>
                                        <Link 
                                            to="/jobs" 
                                            className='flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Briefcase className='h-4 w-4 mr-3' />
                                            Jobs
                                        </Link>
                                        <Link 
                                            to="/browse" 
                                            className='flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Search className='h-4 w-4 mr-3' />
                                            Browse
                                        </Link>
                                    </>
                                )
                            }
                            
                            {!user && (
                                <div className='pt-4 space-y-2'>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className='w-full'>Login</Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className='w-full bg-gradient-to-r from-blue-600 to-purple-600'>Sign Up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar