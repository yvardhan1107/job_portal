import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, MapPin, TrendingUp } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.3) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center'>
                    <div className='flex flex-col gap-8'>
                        {/* Badge */}
                        <div className='inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200'>
                            <TrendingUp className='h-4 w-4 text-blue-600 mr-2' />
                            <span className='text-blue-700 font-semibold text-sm'>#1 Job Portal Platform</span>
                        </div>

                        {/* Main Heading */}
                        <div className='space-y-4'>
                            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                                Find Your <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Dream Job</span>
                                <br />
                                <span className='text-gray-700'>Today</span>
                            </h1>
                            <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                                Connect with top companies and discover opportunities that match your skills and aspirations.
                                Your next career move starts here.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className='max-w-2xl mx-auto'>
                            <div className='flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-xl border border-gray-200'>
                                <div className='flex-1 flex items-center px-4 py-3'>
                                    <Search className='h-5 w-5 text-gray-400 mr-3' />
                                    <input
                                        type="text"
                                        placeholder='Job title, keywords, or company'
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className='flex-1 outline-none text-gray-900 placeholder-gray-500'
                                        onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                    />
                                </div>
                                <div className='flex items-center px-4 py-3 border-l border-gray-200'>
                                    <MapPin className='h-5 w-5 text-gray-400 mr-3' />
                                    <input
                                        type="text"
                                        placeholder='Location'
                                        className='outline-none text-gray-900 placeholder-gray-500'
                                    />
                                </div>
                                <Button
                                    onClick={searchJobHandler}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <Search className='h-5 w-5 mr-2' />
                                    Search Jobs
                                </Button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto pt-8'>
                            <div className='text-center'>
                                <div className='text-3xl font-bold text-gray-900'>10K+</div>
                                <div className='text-sm text-gray-600'>Active Jobs</div>
                            </div>
                            <div className='text-center'>
                                <div className='text-3xl font-bold text-gray-900'>500+</div>
                                <div className='text-sm text-gray-600'>Companies</div>
                            </div>
                            <div className='text-center'>
                                <div className='text-3xl font-bold text-gray-900'>50K+</div>
                                <div className='text-sm text-gray-600'>Job Seekers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection