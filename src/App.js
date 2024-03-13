
import './App.css';
import { useWeb3React } from '@web3-react/core';


import {Route , Routes} from  "react-router-dom";
import Homepage from './components/wallet/Homepage';
import Dashboard from './components/wallet/Dashboard';

function App() {


  const { activate, account, deactivate, active , chainId } = useWeb3React()





  return (
   <div className='w-[100vw] overflow-hidden'>
   
<Routes>
          {active ?  <Route path = "/" element  = {<Dashboard/>}   />   :     <Route path = "/" element  = {<Homepage />}   />  }

            </Routes>
   </div>
  );
}

export default App;
