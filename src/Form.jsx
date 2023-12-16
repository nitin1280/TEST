import React, { useState } from 'react';
import "./App.css"

const Form = () => {
    
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    alternativeMobile: '',
    date: '',
    lastDate: '',
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [updateIndex,setUpdateIndex] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
   const handleSelectChange = (e) =>{
    setSelectedOption(e.target.value);
   }
  const handleUpdate = (index) =>{
    setFormData(submittedData[index]);
    setUpdateIndex(index);
  };

  const handleRemove = (index) =>{
    const updatedData = [...submittedData];
    updatedData.splice(index,1);
    setSubmittedData(updatedData);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Validate mobile number
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number';
      isValid = false;
    }

    // Validate alternative mobile number
    if (formData.alternativeMobile && !mobileRegex.test(formData.alternativeMobile)) {
      newErrors.alternativeMobile = 'Invalid alternative mobile number';
      isValid = false;
    }

    // Add your date validation logic here
    // Add your last date validation logic here

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if(updateIndex !== null){
        const updatedData = [...submittedData];
        updatedData[updateIndex] = formData;
        setUpdateIndex(null);
      } else{
        setSubmittedData([...submittedData,formData]);
      }
      // Form submission logic here
      setSubmittedData([...submittedData, formData]);

      // Clear form data
      setFormData({
        email: '',
        mobileNumber: '',
        alternativeMobile: '',
        date: '',
        lastDate: '',
      });
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };
  

  return (
    <>
    <div>
      <label className='test'>Test Type:</label>

<select value={selectedOption} onChange={handleSelectChange}>
<option value="">Select Test Type</option> 
  <option value="PHP">PHP</option> 
  <option value="Node js">Node JS</option>
  <option value="React">REACT JS</option>
  
</select>
      </div>
    <form onSubmit={handleSubmit}>
    <div>
        <label>Tester_Name:</label>
        <input type="text" name="" required/>
      </div>
      <div>
        <label>Tester_email_id:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label>Tester_Mobile_Number:</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
        {errors.mobileNumber && <div>{errors.mobileNumber}</div>}
      </div>
      <div>
        <label>Alternative No:</label>
        <input type="text" name="alternativeMobile" value={formData.alternativeMobile} onChange={handleChange} />
        {errors.alternativeMobile && <div>{errors.alternativeMobile}</div>}
      </div>
      <div>
        <label>Creation Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        {errors.date && <div>{errors.date}</div>}
      </div>
      <div>
        <label>Last Updation Date:</label>
        <input type="date" name="lastDate" value={formData.lastDate} onChange={handleChange} />
        {errors.lastDate && <div>{errors.lastDate}</div>}
      </div>
      {/* Add your date and last date fields with validation here */}
      <div>
        <button type="submit">SAVE</button>
      </div>
    </form>
    
      {/* Display submitted data in a table */}
      {submittedData.length > 0 && (
        <table className={selectedOption === "PHP"?"phpTable" : selectedOption === "Node js"?"nodeJsTable":"otherTable"}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Alternative Mobile</th>
              <th>Date</th>
              <th>Last Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.email}</td>
                <td>{data.mobileNumber}</td>
                <td>{data.alternativeMobile}</td>
                <td>{data.date}</td>
                <td>{data.lastDate}</td>
                <td>
                  <button onClick={() => handleUpdate(index)}>Update</button>
                  <button onClick={() => handleRemove(index)} className='Remove'>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </>
  );
};

export default Form;