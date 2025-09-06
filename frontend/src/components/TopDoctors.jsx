import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

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

const TopDoctors = () => {
    const navigate = useNavigate();
    const {doctors, loadingDoctors } = useContext(AppContext);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 gap-6 px-3 sm:px-0'>
                {loadingDoctors
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                : doctors.slice(0,8).map((item,index)=>(
                    <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='w-full object-cover bg-blue-50' src={item.image} alt="doc_img" />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
        </div>
    )
}

export default TopDoctors