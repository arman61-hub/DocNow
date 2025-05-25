import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  
  const navigate = useNavigate()

  const [state,setState] = useState('');

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const onSubmitHandler = async(event) => {
    event.preventDefault();

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
  
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
  
      } else {
  
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
  
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
  
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])


   // Navigate to Admin Login
  const redirectToAdminLogin = () => {
    navigate('/admin/login') // Assuming '/admin/login' is your admin login route
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center bg-gray-50 px-4'>
      <div className='flex flex-col gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 rounded-2xl text-zinc-700 text-sm shadow-lg border border-gray-200 bg-white'>
        <div className='flex items-center gap-2 text-2xl font-semibold justify-center'>
          {state === 'Sign Up' ? <UserPlus className='text-primary' /> : <LogIn className='text-primary' />}
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </div>
        <p className='text-center text-sm text-gray-500'>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <label className='flex items-center gap-2 mb-1'>
              <User size={16} /> Full Name
            </label>
            <input
              className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary'
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <label className='flex items-center gap-2 mb-1'>
            <Mail size={16} /> Email
          </label>
          <input
            className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <label className='flex items-center gap-2 mb-1'>
            <Lock size={16} /> Password
          </label>
          <input
            className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-primary'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-primary hover:bg-indigo-600 text-white w-full py-2 rounded-md text-base transition-all'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p className='text-sm text-center'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
              Login here
            </span>
          </p>
        ) : (
          <div className='text-sm text-center space-y-1'>
            <p>
              Create a new account?{' '}
              <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
                Click here
              </span>
            </p>
            <p>
              Login as{' '}
              <span onClick={redirectToAdminLogin} className='text-primary underline cursor-pointer'>
                Admin / Doctor
              </span>
            </p>
          </div>
        )}
      </div>
    </form>
  )
}

export default Login