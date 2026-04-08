import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { Briefcase, TrendingUp } from 'lucide-react';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
   
    return (
        <div className='bg-gray-50 py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <div className='inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4'>
                        <TrendingUp className='h-4 w-4 mr-2' />
                        Fresh Opportunities
                    </div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                        Latest <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Job Openings</span>
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Discover the most recent job opportunities from top companies and startups
                    </p>
                </div>

                {/* Jobs Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        allJobs.length <= 0 ? (
                            <div className="col-span-full">
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Briefcase className="h-12 w-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {!user ? "Please login to view available jobs" : "No jobs available at the moment"}
                                    </h3>
                                    <p className="text-gray-500">
                                        {!user ? "Sign in to explore thousands of job opportunities" : "Check back later for new opportunities"}
                                    </p>
                                </div>
                            </div>
                        ) : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                    }
                </div>

                {/* View All Button */}
                {allJobs.length > 0 && (
                    <div className='text-center mt-12'>
                        <button onClick={() => navigate("/jobs")} className='inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl'>
                            View All Jobs
                            <TrendingUp className='ml-2 h-5 w-5' />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LatestJobs