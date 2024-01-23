import React, { useState } from 'react';
import '../styles/adminsignup.css'
import axios from 'axios'

const AdminRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [aadharCard, setAadharCard] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const formdata=new FormData()
      formdata.append("fullName",fullName)
      formdata.append("email",email)
      formdata.append("phoneNumber",phoneNumber)
      formdata.append("aadharNumber",aadharNumber)
      formdata.append("aadharCard",aadharCard)
      
      // console.log(aadharCard)
      const result=await axios.post("http://localhost:3001/admin/signup", formdata,{
        headers:{"Content-Type":"multipart/form-data"}
      });
      console.log("User registered successfully");
    } catch (error) {
      console.log("Error!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Aadhar Number:
        <input type="text" onChange={(e) => setAadharNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Upload Aadhar Card:
        <input type="file" accept="application/pdf" onChange={(e)=>setAadharCard(e.target.files[0])}  />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdminRegistrationForm;