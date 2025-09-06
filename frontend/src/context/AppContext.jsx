import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = import.meta.env.VITE_CURRENCY
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [loadingDoctors, setLoadingDoctors] = useState(true);

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

    
    // Getting Doctors using API
    const getDoctorsData = async () => {
        try {
            setLoadingDoctors(true);
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoadingDoctors(false); 
        }
    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        doctors,getDoctorsData,loadingDoctors,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
    }


    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
        else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;