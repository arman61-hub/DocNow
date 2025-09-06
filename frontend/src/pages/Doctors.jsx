import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="border border-blue-200 rounded-xl overflow-hidden animate-pulse">
    <div className="h-48 bg-blue-100 w-full"></div>
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-3 bg-gray-300 rounded"></div>
      </div>
      <div className="w-32 h-4 bg-gray-300 rounded"></div>
      <div className="w-24 h-3 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors, loadingDoctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    }
    else {
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    if(!loadingDoctors) applyFilter();
  }, [doctors, speciality, loadingDoctors])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        {/* Filters */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General Physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist'].map((spec, i) => (
            <p 
              key={i}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {loadingDoctors 
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />) 
            : filterDoc.map((item, index) => (
              <div 
                onClick={() => navigate(`/appointment/${item._id}`)} 
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
                key={index}
              >
                <img className='bg-blue-50' src={item.image} alt="doc_img" />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors