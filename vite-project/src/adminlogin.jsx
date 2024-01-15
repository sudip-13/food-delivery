import React, { useState } from 'react';

const AdminRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [aadharCard, setAadharCard] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAadharCard(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/admin/registration", {
        fullName,
        email,
        phoneNumber,
        aadharNumber,
        aadharCard
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
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Aadhar Number:
        <input type="text" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Upload Aadhar Card:
        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdminRegistrationForm;
