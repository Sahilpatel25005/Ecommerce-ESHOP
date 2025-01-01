import React from 'react'

function Cart({handleCart , isCartOpen}) {
  return (
    <> 
    <div className={` w-[100vw] h-full sm:w-[25vw] bg-white top-0 z-50 right-0 fixed sm:rounded-tl-md sm:rounded-bl-md p-6 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 `}>   
        <button className='bg-gray-200 p-2 rounded-[50%] top-2 right-2 fixed text-center w-[44px] text-2xl font-bold'  onClick={handleCart}>X</button>    
      <div className='mt-8'>
        <h1 className='text-black text-2xl font-medium text-center sm:text-3xl'>Bring Your Item in Cart.</h1>
      </div>
      <div className='fixed bottom-3 w-[88vw] flex flex-col gap-4'>
        <p className='sm:text-xl text-sm font-medium '>Total Items : <span className='sm:text-xl text-sm font-medium '>45</span> </p>
        <p className='sm:text-2xl font-medium mb-2'>TOTAL AMOUNT : <span className='sm:text-2xl text-sm font-medium '>2345678</span></p>
        <button className='sm:w-[22.5vw] w-full bg-green-600 sm:py-3 py-2 rounded-md text-xl font-bold sm:text-2xl'>Cheak Out</button>
      </div>
      </div>
    </>
  )
}

export default Cart
