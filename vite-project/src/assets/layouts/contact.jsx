import React, { useState } from "react";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <div className="text-contact">
          <h5>CONTACT US</h5>
        </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>

        <div className="company-location">
          <h3>Our Canteen Location</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eaque
          libero blanditiis consequuntur corrupti quam illo, odio deleniti
          necessitatibus assumenda.
        </div>
      </div>
    </div>
  );
};

export default Contact;
