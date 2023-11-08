import React, { useState } from 'react';
import './App.css';
// import BirthdayMessage from './components/BirthdayMessage';
// import Popup from './components/Popup';
// import Gift from './components/Gift';

function App() {
  const [totalAmount, setTotalAmount] = useState("");

  
  const handleChange = event => {
    setTotalAmount(event.target.value);

    console.log('value is:', event.target.value);
  };


  const submitPay=()=>{

    function isMobileDevice() {
      return /Mobi/i.test(navigator.userAgent);
    }

    // Usage example
    if (isMobileDevice()) {
      function performAction() {
        window.location.href = `upi://pay?pn=Deeak&pa=amzn0011573832@apl&cu=INR&am=${totalAmount}`;
    
      }
      // this.closeModal();
      performAction();
    } else {
      // alert("Desktop device");
      alert("total amount is ",totalAmount)
      // this.openModal()
      console.log("Desktop device",totalAmount);
    }




    
  }



  

  return (
    <div className="App">
    Make Payment For Test 
            <br />
    <p>Enter Amount to Send </p>

    <input placeholder="Enter Amount" type="number" onChange={handleChange} />

    <button  onClick={()=>submitPay(100)}>Pay now </button>
    </div>
  );
}

export default App;

