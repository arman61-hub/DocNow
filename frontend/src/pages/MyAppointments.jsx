import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  // Verify Stripe payment after redirect
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('payment') === 'success' && params.get('session_id')) {
      const sessionId = params.get('session_id')
      verifyStripePayment(sessionId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const verifyStripePayment = async (sessionId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/verifyStripePayment',
        { sessionId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
      navigate('/my-appointments', { replace: true })
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) setAppointments(data.appointments.reverse())
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPayRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPayRazorpay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Redirect to Stripe Checkout
  const appointmentStripeCheckout = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/create-checkout-session',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success && data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.message || 'Failed to create Stripe checkout session')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="doc_img" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted &&
                <button className='sm:min-w-48 py-2 border border-[#DADADA] rounded text-stone-500 bg-indigo-50'>Paid</button>
              }
              {!item.cancelled && !item.payment && !item.isCompleted &&
                <>
                  <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online (Razorpay)</button>
                  <button onClick={() => appointmentStripeCheckout(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-purple-600 hover:text-white transition-all duration-300'>Pay Online (Stripe)</button>
                </>
              }
              {!item.cancelled && !item.isCompleted &&
                <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
              }
              {item.cancelled && !item.isCompleted &&
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>
              }
              {item.isCompleted &&
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
