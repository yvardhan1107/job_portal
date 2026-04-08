import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth);
    
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                // Only fetch jobs if user is authenticated
                if (!user) {
                    console.log('User not authenticated, skipping job fetch');
                    return;
                }
                
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
                // If authentication fails, clear jobs
                dispatch(setAllJobs([]));
            }
        }
        fetchAllJobs();
    },[user, searchedQuery])
}

export default useGetAllJobs