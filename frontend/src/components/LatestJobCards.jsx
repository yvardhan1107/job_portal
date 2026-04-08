import React from 'react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, Users, DollarSign, ArrowRight } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    
    const getJobTypeColor = (jobType) => {
        switch(jobType?.toLowerCase()) {
            case 'full-time': return 'bg-green-100 text-green-700 border-green-200'
            case 'part-time': return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'contract': return 'bg-orange-100 text-orange-700 border-orange-200'
            case 'remote': return 'bg-purple-100 text-purple-700 border-purple-200'
            default: return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden'
        >
            {/* Header */}
            <div className='p-6 pb-4'>
                <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Avatar className='h-10 w-10'>
                                <AvatarImage src={job?.company?.logo} />
                            </Avatar>
                            <div>
                                <h3 className='font-semibold text-gray-900 text-lg'>{job?.company?.name}</h3>
                                <div className='flex items-center text-gray-500 text-sm'>
                                    <MapPin className='h-4 w-4 mr-1' />
                                    {job?.location || 'Remote'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center text-gray-400 group-hover:text-blue-600 transition-colors'>
                        <ArrowRight className='h-5 w-5' />
                    </div>
                </div>

                {/* Job Title */}
                <h2 className='font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
                    {job?.title}
                </h2>

                {/* Description */}
                <p className='text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4'>
                    {job?.description}
                </p>
            </div>

            {/* Tags */}
            <div className='px-6 pb-4'>
                <div className='flex flex-wrap gap-2 mb-4'>
                    <Badge className={`${getJobTypeColor(job?.jobType)} border font-medium`}>
                        {job?.jobType}
                    </Badge>
                    <Badge className='bg-blue-100 text-blue-700 border-blue-200 font-medium'>
                        {job?.experienceLevel} exp
                    </Badge>
                </div>

                {/* Job Details */}
                <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div className='flex items-center text-gray-600'>
                        <Users className='h-4 w-4 mr-2 text-gray-400' />
                        <span>{job?.position} positions</span>
                    </div>
                    <div className='flex items-center text-gray-600'>
                        <DollarSign className='h-4 w-4 mr-2 text-gray-400' />
                        <span className='font-semibold text-green-600'>{job?.salary}LPA</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className='px-6 py-4 bg-gray-50 border-t border-gray-100'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center text-gray-500 text-sm'>
                        <Clock className='h-4 w-4 mr-1' />
                        <span>Posted recently</span>
                    </div>
                    <div className='text-blue-600 font-semibold text-sm group-hover:text-blue-700'>
                        Apply Now →
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards