import React from "react";
import "../styles/profile.css";
import pic from '../images/profile.jpg'

function Profile() {
  return (
    <div className="profile">
      <div class="profile-container">
        <div class="profile-picture">
        <img src={pic} alt=" " />
        </div>
        <div class="user-details">
          <h2>NEHA SHARMA</h2>
          <p><b>Email :</b> rg370900@gmail.com</p>
          <p><b>Student Code : </b>BWU/BTA/21/052</p>
          <p><b>Sec : </b>A</p>
          <p><b>Depertment :</b> Computer Science and Engeneering</p>
          <p><b>Location :</b> Bankura</p>
        </div>
        <div class="edit-profile">
          <button>Log out</button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
