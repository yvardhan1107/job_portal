import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const useAuth = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if user is already in state
                if (user) return;

                // Try to get user info from server using stored cookie
                const res = await axios.get(`${USER_API_END_POINT}/me`, { 
                    withCredentials: true 
                });
                
                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                console.log('User not authenticated:', error);
                // Clear any invalid user state
                dispatch(setUser(null));
            }
        };

        checkAuth();
    }, [dispatch, user]);

    return user;
};

export default useAuth;
