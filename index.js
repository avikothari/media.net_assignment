let form_data;

let id = (id) => document.getElementById(id);

const form = id("form"),
  email = id("email"),
  first_name = id("first_name"),
  last_name = id("last_name"),
  address = id("address"),
  country = id("country"),
  state = id("state"),
  zipcode = id("zipcode"),
  mobile = id("mobile"),
  phone = id("phone")

/**Utility Funciions */
addEventListener("input", (e) => {
  form_data = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : {}

  form_data[e.target.id] = e.target.value;

  localStorage.setItem("formData", JSON.stringify(form_data));

  if (e.target.id === 'email')
    validateEmail();
  else if (e.target.id === 'first_name' || e.target.id === 'last_name')
    validateName(e.target.id);
  else if (e.target.id === 'address')
    validateAddress();
  else if (e.target.id === 'country')
    validateCountry();
  else if (e.target.id === 'state')
    validateState();
  else if (e.target.id === 'zipcode')
    validateZipCode()
  else if (e.target.id === 'mobile')
    validateMobileNumber()
  else if (e.target.id === 'phone')
    validateMobileNumber()


});


const isRequired = (value) => (value === "" ? false : true);

const validEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validZipCode = (zipcode) => {
  const re = /^[1-9][0-9]{5}$/;
  return re.test(zipcode)
}

const validPhone = (phone) => {
  const re = /^\+?\d{0,13}/;

  return re.test(phone);
}

const isValid = (input) => {
  const formField = input.parentElement;

  input.classList.remove("error");

  formField.querySelector("span").innerText = "";
};

const isInvalid = (input, message) => {
  const formField = input.parentElement;

  input.classList.add("error");

  formField.querySelector("span").innerText = message;
};

/**Utility Funciions */


const validateEmail = () => {
  let valid = false;
  const value = email.value.trim();
  if (!isRequired(value)) {
    isInvalid(email, "Please enter your email");
  } else if (!validEmail(value)) {
    isInvalid(email, "Email is not valid");
  } else {
    isValid(email);
    valid = true;
  }
  return valid;
};

const validateName = (key) => {
  let valid = false;
  let input = key === "first_name" ? first_name : last_name;
  const value = input.value.trim();
  if (!isRequired(value)) {
    isInvalid(
      input,
      'Please enter your ' + (key === "first_name" ? "first" : "last") + " name"
    );
  } else {
    isValid(input);
    valid = true;
  }

  return valid;
};

const validateAddress = () => {
  let valid = false;

  const value = address.value.trim();
  if (!isRequired(value)) {
    isInvalid(address, "Please enter your address");
  } else {
    isValid(address);
    valid = true;
  }

  return valid;
};

const validateCountry = () => {
  let valid = false;

  const value = country.value.trim();
  if (!isRequired(value)) {
    isInvalid(country, "Please select your country");
  } else {
    isValid(country);
    valid = true;
  }

  return valid;
};

const validateState = () => {
  let valid = false;
  const value = state.value.trim();
  if (!isRequired(value)) {
    isInvalid(state, "Please select your state");
  } else {
    isValid(state);
    valid = true;
  }

  return valid;
};

const validateZipCode = () => {
  let valid = false;
  const value = zipcode.value.trim();
  if (!isRequired(value)) {
    isInvalid(zipcode, "Please enter the zipcode");
  } else if (!validZipCode(value)) {
    isInvalid(zipcode, "Zipcode is not valid");
  } else {
    isValid(zipcode);
    valid = true;
  }
  return valid;
}

const validateMobileNumber = () => {
  let valid = false;
  const value = mobile.value.trim();
  if (!isRequired(value)) {
    isInvalid(mobile, "Please enter the mobile number");
  } else if (!validPhone(value)) {
    isInvalid(mobile, "Mobile number is not valid");
  } else {
    isValid(mobile);
    valid = true;
  }
  return valid;
}

const validatePhoneNumber = () => {
  let valid = false;
  const value = phone.value.trim();
  if (!isRequired(value)) {
    isInvalid(phone, "Please enter the phone number");
  } else if (!validPhone(value)) {
    isInvalid(phone, "Phone number is not valid");
  } else {
    isValid(phone);
    valid = true;
  }
  return valid;
}


/**Patch Form Values */
document.addEventListener("DOMContentLoaded", function (event) {
  if (JSON.parse(localStorage.getItem('formData'))) {

    const form_data = JSON.parse(localStorage.getItem('formData'))

    if (form_data.email) email.value = form_data.email;
    if (form_data.first_name) first_name.value = form_data.first_name;
    if (form_data.last_name) last_name.value = form_data.last_name;
    if (form_data.address) address.value = form_data.address;
    if (form_data.country) country.value = form_data.country;
    if (form_data.state) state.value = form_data.state;
    if (form_data.zipcode) zipcode.value = form_data.zipcode;
    if (form_data.mobile) mobile.value = form_data.mobile;
    if (form_data.phone) phone.value = form_data.phone;
  }

});

/**Submit Form Date */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isEmailValid = validateEmail(),
    isFirstNameValid = validateName("first_name"),
    isLastNameValid = validateName("last_name"),
    isAddressValid = validateAddress(),
    isCountryValid = validateCountry(),
    isStateValid = validateState(),
    isZipCodeValid = validateZipCode(),
    isMobileNumberValid = validateMobileNumber(),
    isPhoneNumberValid = validatePhoneNumber()


  if (isEmailValid && isFirstNameValid && isLastNameValid && isAddressValid
    && isCountryValid && isStateValid && isZipCodeValid && isMobileNumberValid && isPhoneNumberValid) {
    alert('Form Data updated successfully!!')
    localStorage.removeItem('formData')
    form.reset()
  }

});
