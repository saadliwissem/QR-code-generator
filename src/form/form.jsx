import React, { useState } from "react";
import "./form.css";


export const Form = () => {
  const QRCode = require("qrcode");
  
  //a function that verifies if url is correct
  const [isvaliduri,setIsvaliduri]=useState(false)
  function isValidUrl(url) {
    //this function use the string argement and create a url with it if th URL function return an error that means that url is incorrect
    try {
      new URL(url);
      
      return true;
    } catch (error) {
    
      return false;
    }
  }
  //function that generates a QR code
  const generateQR = async (text) => {
    try {
      await QRCode.toDataURL(text).then((response) => {
        setSrc(response) ;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [url, setUrl] = useState("https://saadli-wissem.vercel.app/");
  const [src, setSrc] = useState("");
  //function that takes the input value and create a QR code using the previous function
  const hundlesubmit = () => {
    console.log(generateQR(url));
  };
  const hundleChange = (e) => {
    if(isValidUrl("https://"+e.target.value)){
        
        setUrl(e.target.value);
        setIsvaliduri(true)
        console.log(url);
    }
    else{
        setIsvaliduri(false)
    }
  };
  return (
    <div>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form>
            <label className="label" aria-hidden="true">enter url</label>
            <input
              type="text"
              name="url"
              placeholder="url"
              onChange={hundleChange}
            />
            <label className="btn" onClick={hundlesubmit}>get QR code</label>
            {isvaliduri?  <img src={src} alt="enter a url" />:<p>please enter a valid url</p> }
          </form>
        </div>
      </div>
    </div>
  );
};
