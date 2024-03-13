import React , {useState , useRef}from 'react'
import { MdMessage } from "react-icons/md";
import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers";


const Dashboard = () => {
    const resultBox = useRef();
    const [signatures, setSignatures] = useState([]);
 
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState();
    
    const [messagebox, setmessagebox] = useState("number")
    const [validatemessage, setvalidatemessage] = useState(false)
    const {  account, deactivate } = useWeb3React()

    const signMessage = async ({ setError, message }) => {
        try {
         
          if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");
      
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const signature = await signer.signMessage(message);
          const address = await signer.getAddress();
      
          return {
            message,
            signature,
            address
          };
        } catch (err) {
          setError(err.message);
        }
      };

      
const verifyMessage = async ({ message, address, signature }) => {
    try {
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      if (signerAddr !== address) {
        return false;
      }
  
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

      
  const handleVerification = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSuccessMsg();
    setError();
    const isValid = await verifyMessage({
      setError,
      message: data.get("message"),
      address: data.get("address"),
      signature: data.get("signature")
    });

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

      
  const handleSign = async (e) => {
    e.preventDefault();
   const data = new FormData(e.target);
    setError();
    const sig = await signMessage({
      setError,
      message: data.get("message")
    });
    if (sig) {
      setSignatures([...signatures, sig]);
    }
  };
    const disconnectWallet = async () => {
        try {
          await deactivate()
        } catch (error) {
    
        }
      }

    const handlemessage = () => {
setmessagebox("textbox")
setvalidatemessage(false)
setSuccessMsg("")
setError("")
    }
  return (
    
    <section   className='w-screen '>
     <div className='w-screen px-4 h-[10vh]  md:flex-col md:mt-8 flex justify-between items-center'>
       
        <h1  className='text-2xl font-bold uppercase underline '>
            Dashboard
        </h1>
        <div  className='flex item-center justify-center mt-4' >
            <div  onClick={handlemessage} className='mb-2 flex items-center justify-center w-fit  md:mr-7  py-2 px-2  mr-3 rounded-[50%] h-fit border-2'>
            <MdMessage  className='text-2xl   cursor-pointer   ' />
            </div>
      
        <button  onClick={disconnectWallet} className="w-fit  mr-4 text-white h-10 rounded-md capitalize font-bold px-4  bg-blue-700  md:mr-4" >Disconnect Wallet</button>
 {messagebox == "textbox" &&       <button  onClick={() => setmessagebox("number")} className="w-fit  mr-4 text-white h-10 rounded-md capitalize font-bold px-4  bg-blue-700" >cancel</button>}

        </div>
        {messagebox == "textbox" &&  <button  onClick={() => setvalidatemessage(true)}  className="w-fit py-2 mr-4 text-white h-10 rounded-md capitalize font-bold px-4  bg-blue-700  md:mr-4" >Validate signature</button>}

     </div>

{
    messagebox == "number" &&<div className='mt-10   md:px-2 md:text-sm    flex  md:flex-col items-center justify-center'>
 <span className='font-bold text-2xl md:mb-4  md:text-lg uppercase mr-6 text-green-700'>
account :
  </span>

 <textarea
                  type="text"
                  readOnly
                  ref={resultBox}
                  className="textarea w-[50%] h-fit textarea-bordered focus:ring focus:outline-none"
                  placeholder="Generated signature"
                  value={account}
                />
                 </div>
     
}


{messagebox == "textbox" && 
<form  onSubmit={ validatemessage == false ? handleSign : handleVerification} >

<div className='  mt-20 h-fit flex flex-col items-center justify-center '>
    <div className='border-2   sm:w-[92%] sm:px-4 md:w-[80%]  p-4  h-fit  w-[60%]'>
    {
            validatemessage == false &&    <textarea   name="message" type="text"  className='border-2    w-[100%] p-2' cols = "50" rows="4" placeholder='Sign Message'  />
      
          }      {
            validatemessage == true && 
            <>
              <textarea   name="message" type="text"  className='border-2  mb-4  w-[100%] p-2' cols = "50" rows="4"  placeholder="Message"  />
              <textarea   name="signature" type="text"  className='border-2  mb-4   w-[100%] p-2' cols = "50" rows="4" placeholder="Signature"  />
              <input  name="address" type="text"  className='border-2  mb-4  w-[100%] p-2'   placeholder="Signer address"  />
     
            </>
        }
    <button   type='submit' className='w-[100%]  cursor-pointer h-fit  mt-3 font-bold py-2 text-white uppercase bg-blue-700 rounded-md border-none'>
    {
            validatemessage == true ?  "validate signature"  :  "sign message" }
        </button>

        <div className="p-4 mt-4">
        
          <p  className='text-center text-2xl text-red-900  uppercase font-bold'>{error}</p>
          
          <p  className='text-center  text-2xl text-green-900  uppercase font-bold'>{successMsg}</p>
      
        </div>

        {signatures.map((sig, idx) => {
          return (
            <div className="p-2 h-fit   " >
              
                <p   className=''>
                <span  className='font-bold uppercase'>
                MESSAGE {idx + 1}
                    </span>  :  <textarea
                  type="text"
                  readOnly
                  ref={resultBox}
                  className="textarea w-full h-fit textarea-bordered focus:ring focus:outline-none"
                  placeholder="Generated signature"
                  value={sig.message}
                />
                </p>
                <div  className='h-fit'>
                <span  className='font-bold  uppercase'>
                signer
                    </span>  
                    : 
                    <textarea
                  type="text"
                  readOnly
                  ref={resultBox}
                  className="textarea w-full h-fit textarea-bordered focus:ring focus:outline-none"
                  placeholder="Generated signature"
                  value={sig.address}
                />
                    
                      </div>
                    <span  className='font-bold  uppercase'>
                signature
                    </span>: <textarea
                  type="text"
                  readOnly
                  ref={resultBox}
                  className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                  placeholder="Generated signature"
                  value={sig.signature}
                />
          
            </div>
          );
        })}

    </div>
 
</div>
</form>

       
    }


    </section>
  
  )
}

export default Dashboard