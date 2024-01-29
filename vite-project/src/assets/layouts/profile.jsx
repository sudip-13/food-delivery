import "../styles/profile.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";
import md5 from 'md5';

// ... (imports)

function Profile() {
  const [fetch_email, setEmail] = useState('');
  const [jsonObject, setJsonObject] = useState('');
  const [hashEmail, setHashEmail] = useState('');
  const navigate = useNavigate();

  async function validation() {
    const cookies = await getCookieValueByName("cookie-1");
    try {
      await axios.get("http://localhost:3001/user/verifyjwt", {
        headers: {
          "cookie-1": cookies
        },
      })
        .then((result) => {
          if (result.data === 'welcome') {
            console.log('Welcome');
          } else {
            console.log("Unauthorized or Invalid token");
            navigate("/");
          }
        });
    } catch (error) {
      console.error(
        "You don't have permission to access these routes! Please log in first."
      );
      navigate("/");
    }
  }

  const generateEmailHash = (email) => {
    const hashedEmail = md5(email);
    setHashEmail(hashedEmail);
  };

  const fetchEmailProfileDetails = async () => {
    const token = await getCookieValueByName("cookie-1");
    let email = null;
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
          setEmail(email);
        });

      try {
        await axios
          .post("http://localhost:3001/user/getprofiledetails", { email })
          .then((result) => {

            const jsonObject = result.data
            setJsonObject(jsonObject)
          });
      } catch (error) {
        console.error("Internal server error !", error);
      }
    }
    catch (error) {
      console.log('Failed to fetch email', error);
    }
  };

  useEffect(() => {
    validation();
    fetchEmailProfileDetails();
    generateEmailHash(fetch_email);
  }, [fetch_email]);

  // Function to generate Gravatar URL based on email hash
  const getGravatarUrl = (emailHash) => {
    return `https://www.gravatar.com/avatar/${emailHash}?s=200&r=pg&d=identicon`;
  };
  const handleLogOut=async()=>{
    document.cookie = 'cookie-1' + 
    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    window.location.reload()
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-picture">
          <img src={getGravatarUrl(hashEmail)} alt="profile" />
        </div>
        <div className="user-details">
          <h2>{jsonObject.first_name} {jsonObject.last_name}</h2>
          <p><b>Email :</b> {fetch_email}</p>
          <p><b>Student Code : </b>{jsonObject.student_code}</p>
          <p><b>Department :</b> {jsonObject.department}</p>
        </div>
        <div className="edit-profile">
        <button onClick={() => handleLogOut()}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;