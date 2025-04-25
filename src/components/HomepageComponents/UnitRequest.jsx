import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const UnitRequestModal = ({ isOpen, onClose, unitDetails, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const form = useRef();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Prepare EmailJS data
        const templateParams = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          unitNumber: unitDetails?.unitNumber,
          unitType: unitDetails?.unitType,
          rent: unitDetails?.rent,
          requestDate: new Date().toLocaleDateString()
        };

        // Send email using EmailJS
        await emailjs.send(
          'service_jle7hb2', // Replace with your EmailJS service ID
          'template_536pmzc', // Replace with your EmailJS template ID
          templateParams,
          'a_7XF03RA_XZHQreO' // Replace with your EmailJS public key
        );
        
        // Also call the original onSubmit if needed
        await onSubmit({
          ...formData,
          unitId: unitDetails._id,
          unitNumber: unitDetails.unitNumber,
          buildingId: unitDetails.buildingId,
          requestDate: new Date().toISOString()
        });
        
        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            message: '',
          });
        }, 2000);
        
      } catch (error) {
        console.error("Error submitting request:", error);
        setErrors({ submit: "Failed to submit your request. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="bg-blue-600 text-white p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Request Unit Details</h3>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Unit Info Banner */}
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Unit Number</p>
              <p className="font-medium">{unitDetails?.unitNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium">{unitDetails?.unitType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rent</p>
              <p className="font-medium">₹{unitDetails?.rent}/mo</p>
            </div>
          </div>
        </div>
        
        {/* Form Area */}
        {submitSuccess ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Request Submitted!</h4>
            <p className="text-gray-600">We've received your request and will contact you shortly.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your 10-digit phone number"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific requirements or questions?"
              ></textarea>
            </div>
            
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg">
                {errors.submit}
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : "Submit Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UnitRequestModal;