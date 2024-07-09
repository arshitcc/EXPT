import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Profile() {

  const user = useSelector(state => state.auth.user);

  return (

    <div className='bg-gray-900'>
        <div className='max-w-2xl mx-auto sm:max-w-screen-lg bg-gray-800 shadow-xl rounded-lg text-gray-900 '>
            <div className='grid grid-cols-1 md:grid-cols-3 p-4 items-center'>
                <div className='md:col-span-1 m-4'>
                    <div className="ml-4 w-64 relative border-4 border-white rounded-full overflow-hidden">
                        <img className="object-cover object-center h-64" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front'/>
                    </div>
                </div>
                <div className='md:col-span-2 m-4'>
                    <div className="flow-root py-3 shadow-sm">
                        <dl className="divide-y divide-gray-100 text-sm">
                            <div className="grid grid-cols-1 gap-1 p-3 bg-white sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Title</dt>
                            <dd className="text-gray-700 sm:col-span-2">Mr</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 bg-white sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">User Email</dt>
                            <dd className="text-gray-700 sm:col-span-2">{user.email}</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 bg-white sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Occupation</dt>
                            <dd className="text-gray-700 sm:col-span-2">Guitarist</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 p-3 bg-white sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Wallet Balance</dt>
                            <dd className="text-gray-700 sm:col-span-2">₹ {user.name}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile