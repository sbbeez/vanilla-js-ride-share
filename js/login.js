const validateLoginFields = ({ username, password }) => {
  const errors = {};
  if (!username) {
    errors.username = true;
  } else {
    if (Number(username)) {
      if (username.length !== 10) errors.username = true;
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(username)) {
      errors.username = true;
    }
  }
  if (!password) {
    errors.password = true;
  }
  return errors;
};

const toggleLoginErrorMessages = errors => {
  const usernameErrorElement = document.getElementById("username-error");
  const passwordErrorElement = document.getElementById("password-error");
  usernameErrorElement.style.display = errors.username ? "block" : "none";
  passwordErrorElement.style.display = errors.password ? "block" : "none";
};

const verifyCredentials = async (username, password) => {
  try {
    let URL = `${BASE_URL}/commuters?`;
    if (Number(username)) {
      URL = `${URL}phone=${username}&password=${password}`;
    } else {
      URL = `${URL}emailid=${username}&password=${password}`;
    }
    const response = await fetch(URL);
    const data = await response.json();
    if (data[0]) {
      onLoginSuccess(data[0]);
    } else {
      onLoginFail();
    }
  } catch (err) {
    onLoginError();
  }
};

const onLoginSuccess = user => {
  const element = document.getElementById("login-error");
  element.style.display = "none";
  localStorage.setItem("@login_user_id", user.id);
  window.location.href = window.location.origin + "/views/home.html";
};

const onLoginFail = () => {
  const element = document.getElementById("login-error");
  element.innerHTML = "Invalid username/password";
  element.style.display = "block";
};

const onLoginError = () => {
  const element = document.getElementById("login-error");
  element.innerHTML = "Please try again later";
  element.style.display = "block";
};

const onLoginSubmit = event => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errors = validateLoginFields({ username, password });
  toggleLoginErrorMessages(errors);
  if (!errors.username && !errors.password) {
    verifyCredentials(username, password);
  }
  return false;
};
