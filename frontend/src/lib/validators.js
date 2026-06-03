// validators.js

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateOTP = (otp) => {
  // 6 digits
  return /^\d{6}$/.test(otp);
};

export const validatePhoneNumber = (phone) => {
  // Basic validation for phone numbers
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateName = (name) => {
  // At least 2 characters, no numbers
  return /^[a-zA-Z\s]{2,}$/.test(name);
};

export const validateCompanyName = (company) => {
  // At least 2 characters
  return company && company.trim().length >= 2;
};

export const validatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  return strength;
};

export const getPasswordStrengthLabel = (strength) => {
  if (strength <= 2) return 'Weak';
  if (strength <= 4) return 'Good';
  return 'Strong';
};

export const validateForm = (fields) => {
  const errors = {};
  
  Object.entries(fields).forEach(([key, config]) => {
    const { value, validator, required = true, message = `${key} is invalid` } = config;
    
    if (required && !value) {
      errors[key] = `${key} is required`;
    } else if (value && validator && !validator(value)) {
      errors[key] = message;
    }
  });
  
  return { isValid: Object.keys(errors).length === 0, errors };
};
