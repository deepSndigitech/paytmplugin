// import React, { useState } from 'react';
// import './App.css';
// // import BirthdayMessage from './components/BirthdayMessage';
// // import Popup from './components/Popup';
// // import Gift from './components/Gift';

// function App() {
//   const [totalAmount, setTotalAmount] = useState("");

  
//   const handleChange = event => {
//     setTotalAmount(event.target.value);

//     console.log('value is:', event.target.value);
//   };


//   const submitPay=()=>{

//     function isMobileDevice() {
//       return /Mobi/i.test(navigator.userAgent);
//     }

//     // Usage example
//     if (isMobileDevice()) {
//       function performAction() {
//         window.location.href = `upi://pay?pn=Deeak&pa=9354940727@paytm&cu=INR&am=${totalAmount}`;
//       }
//       // this.closeModal();
//       performAction();
//     } else {
//       // alert("Desktop device");
//       alert("total amount is ",totalAmount)
//       // this.openModal()
//       console.log("Desktop device",totalAmount);
//     }




    
//   }



  

//   return (
//     <div className="App">
//     hello how are  is am fine 
        
//     <br />
//     <p>Enter Amount to Send </p>

//     <input placeholder="Enter Amount" type="number" onChange={handleChange} />

//     <button  onClick={()=>submitPay(100)}>Pay now </button>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import useDeepLink from 'react-use-deeplink';

const App = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    const uri = 'upi://pay?pn=Deeak&pa=9354940727@paytm&cu=INR&am';
    const supported = await useDeepLink.canOpen(uri);

    if (supported) {
      await useDeepLink.open(uri);
    } else {
      setPaymentStatus('UPI app not installed');
    }
  };

  useEffect(() => {
    const handleUPIResponse = (data) => {
      if (data.status === 'success') {
        setPaymentStatus('Payment successful');
      } else if (data.status === 'failed') {
        setPaymentStatus('Payment failed');
      } else {
        setPaymentStatus('Payment canceled');
      }
    };

    useDeepLink.addEventListener('upi-response', handleUPIResponse);

    return () => {
      useDeepLink.removeEventListener('upi-response', handleUPIResponse);
    };
  }, []);

  return (
    <div>
      <button onClick={handlePayment}>Pay with UPI</button>

      {paymentStatus && <p>Payment status: {paymentStatus}</p>}
    </div>
  );
};

export default App;