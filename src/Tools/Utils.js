
const ValidateEmail = email => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.length === 0 || email.match(validRegex)
}

const ValidatePassword = pwd => {
  return pwd.length === 0 || pwd.length >= 4
}

const SanitazeInput = input => {
  return input
}

const ValidateRoboCode = (value1, value2, response) => {
  return response.length === 0 || value1 + value2 === +response
}
const GetRandomInt = max => {
  return Math.floor(Math.random() * max);
}

const ValidValidationCode = code => {
  return code.length === 8
}

const ValidResetPwdCode = code => {
  return code.length === 6
}

const ValidateString = input => {
  var validRegex = /^[A-Za-z]+$/;
  return input.length === 0 || input.match(validRegex)
}
export {ValidateEmail, ValidatePassword, SanitazeInput, GetRandomInt, ValidateRoboCode, ValidateString, ValidValidationCode, ValidResetPwdCode }