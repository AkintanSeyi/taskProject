# Connect Web3 Wallet to your ReactJS app 

# Dependencies
Taiwind css
web3
ethers
react-router-dom
web-vitals
@web3-react/core
@web3-react/injected-connector

# Steps

1: I wrapped my <App/> file in Web3ReactProvider from @web3-react/core whic makes us to be able to use web3
2: Made use of React-router-dom for routing 
3: Made use of useWeb3React from '@web3-react/core to get some of it variables e.g activate, account, deactivate,
4 : We make an connectWallet to connect our wallet with our react app
5 : We go to the Dashboard page
6: We have the disconnect button , to disconnect our wallet
7: We have the Sign Message button , When we click we get an textarea to be able to sign in an message on our wallet
8: We have an Validate Sign message when you click on sign message 
9: We get succesful or Invalid Sign message when me filled the validation form 
10: We made the React App responsive on Smaller screen 