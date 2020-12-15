const getFormValues = () => {
  const registerFormElements = document.getElementById("register-form")
    .elements;
  const formValues = {};
  for (let i = 0; i < registerFormElements.length; i++) {
    if (registerFormElements[i].type !== "submit") {
      formValues[registerFormElements[i].name] = registerFormElements[i].value;
    }
  }
  return formValues;
};

const validateForm = values => {
  const errors = {};
  if (!values.fullname) {
    errors.fullname = true;
  }
  if (!values.password) {
    errors.password = true;
  }
  if (!values.repassword || values.password !== values.repassword) {
    errors.repassword = true;
  }
  if (!values.phone || !Number(values.phone) || values.phone.length !== 10) {
    errors.phone = true;
  }
  if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.emailid)) {
    errors.emailid = true;
  }
  return errors;
};

const toggleErrors = errors => {
  const fullnameErrorElement = document.getElementById("fullname-error");
  fullnameErrorElement.style.display = errors.fullname ? "block" : "none";

  const passwordErrorElement = document.getElementById("password-error");
  passwordErrorElement.style.display = errors.password ? "block" : "none";

  const repasswordErrorElement = document.getElementById("repassword-error");
  repasswordErrorElement.style.display = errors.repassword ? "block" : "none";

  const emailidErrorElement = document.getElementById("emailid-error");
  emailidErrorElement.style.display = errors.emailid ? "block" : "none";

  const phoneErrorElement = document.getElementById("phone-error");
  phoneErrorElement.style.display = errors.phone ? "block" : "none";
};

const registerUser = async values => {
  try {
    delete values.repassword;
    await fetch(`${BASE_URL}/commuters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    onRegisterSuccess();
  } catch (err) {
    console.log(err);
    onRegisterError();
  }
};

const onRegisterSuccess = () => {
  const element = document.getElementById("register-error");
  element.style.display = "none";
  window.history.go(-1);
};

const onRegisterError = () => {
  const element = document.getElementById("register-error");
  element.innerHTML = "Service Down, Please try again later!";
  element.style.display = "block";
};

const onRegisterSubmit = event => {
  const values = getFormValues();
  const errors = validateForm(values);
  toggleErrors(errors);
  if (!Object.values(errors).length) {
    registerUser(values);
  }
  return false;
};
