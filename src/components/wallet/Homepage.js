import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { injected } from './Connectors';
const Homepage = () => {
  const { activate } = useWeb3React()


    const connectWallet = async () => {
        try {
          await activate(injected)
        } catch (error) {
       console.log(error);
        }
      }
  
    
  return (
    <div className="flex flex-col mt-10 md:h-screen items-center justify-center">


      <h1  className='capitalize  sm:text-2xl mb-4 md:text-3xl text-center font text-5xl '>
connect your web3 wallet
      </h1>

   


 <button className='w-fit px-4  md:text-sm cursor-pointer h-fit  mt-3 font-bold py-3 text-white uppercase bg-blue-700 rounded-md border-none' onClick={connectWallet}>Connect Wallet</button>
    
    
    </div>
  )
}

export default Homepage