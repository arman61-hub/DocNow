import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { Mail, Lock, Shield, Stethoscope } from 'lucide-react'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)

    const navigate = useNavigate() // Hook for navigation

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    console.log(data.token)
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    console.log(data.token)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center bg-gray-50 px-4'>
            <div className='flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 bg-white rounded-2xl shadow-md border border-gray-200 text-gray-700'>
                <div className='flex items-center gap-2 text-2xl font-semibold justify-center'>
                    {state === 'Admin' ? <Shield className="text-primary" /> : <Stethoscope className="text-primary" />}
                    <span className='text-primary'>{state}</span> Login
                </div>

                <div className='w-full'>
                    <label className='flex items-center gap-2 text-sm mb-1'>
                        <Mail size={16} />
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary'
                        type="email"
                        required
                    />
                </div>

                <div className='w-full'>
                    <label className='flex items-center gap-2 text-sm mb-1'>
                        <Lock size={16} />
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary'
                        type="password"
                        required
                    />
                </div>

                <button className='bg-primary hover:bg-indigo-600 text-white w-full py-2 rounded-md text-base transition-all'>
                    Login
                </button>

                <div className='text-center text-sm'>
                    {
                        state === 'Admin'
                            ? <>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></>
                            : <>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></>
                    }
                </div>
            </div>
        </form>
    )
}

export default Login
