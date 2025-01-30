import { setMaxLength } from "./helpers";
import {
  isNumber,
  validateEmail,
  validateName,
  validatePassword,
} from "./validatorUtils";

export function validateIdRule(field) {
  return {
    required: `${field} is required`,
    validate: (value) =>
      isNumber(value) ||
      `${field}
must be number`,
    min: {
      value: 1,
      message: `${field} is inValid. ${field}
    must be greater than 0.`,
    },
  };
}

export function validateTextRule(field) {
  return {
    required: `${field} is required`,
    validate: (value) =>
      !isNumber(value) ||
      `${field}
must be Text`,
  };
}

export function required(field) {
  const rule = {
    required: `${field} is required`,
  };
  return rule;
}
export function validateNameRule(field, required = true) {
  const rule = {
    maxLength: setMaxLength(20, `${field}`),
    validate: (value) =>
      !value ||
      validateName(value.trim()) ||
      `${field}
can only contain letters, numbers, and hyphens`,
  };

  if (required) rule.required = `${field} is required`;
  return rule;
}

export function validatePasswordRule(field) {
  return {
    required: `${field} is required`,
    maxLength: setMaxLength(20, field),
    validate: (value) =>
      validatePassword(value.trim()) ||
      `${field}
must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character`,
  };
}

export function validateConfirmPasswordRule(getValues) {
  return {
    required: "Confirm Password is required",

    validate: (value) =>
      value.trim() === getValues()?.password?.trim() ||
      "Passwords do not match",
  };
}

export function validateGenderRule() {
  return {
    required: "Gender is required",
    validate: (value) =>
      value === "Male" || value === "Female" || "Invalid gender selection",
  };
}

export function validateBirthdateRule(minDate, maxDate) {
  return {
    required: "Date of birth is required",
    min: {
      value: minDate,
      message: `Date of birth cannot be earlier than ${minDate}`,
    },
    max: {
      value: maxDate,
      message: `Date of birth cannot be later than ${maxDate}.`,
    },
  };
}

export function validDateRule(startDate) {
  return {
    min: {
      value: startDate,
      message: `Date of end period cannot be earlier than ${startDate}`,
    },
  };
}

export function validateFeesRule(fees) {
  return {
    required: `Fees is required`,
    validate: (value) => isNumber(value) || `fees must be number`,
  };
}

export function validateAddressRule() {
  return {
    required: "Address is required",
    maxLength: setMaxLength(500, "address"),
  };
}

export function validatePhoneRule(field) {
  return {
    required: `${field} is required`,
    validate: (value) => {
      if (!isFinite(value)) return "You should enter numbers only";
      if (value.length < 9 || value.length > 13) {
        return "Phone number should be between 9 and 13 digits";
      }
      return true;
    },
  };
}

export function validateEmailRule() {
  return {
    required: "Email is required",
    validate: (value) => validateEmail(value.trim()) || "Email is not valid",
  };
}

export function validateUserNameRule(isSame) {
  return {
    required: "Username is required",
    validate: () => {
      if (isSame) {
        return "UserName must be Unique";
      }
      return true;
    },
  };
}

export function validateMemberRule(isActive) {
  return {
    required: "Member ID is required",
    validate: () => {
      if (!isActive) {
        return "Memebr is not Active choose another member";
      }
      return true;
    },
  };
}

export function validateInstuctorRule(isSame) {
  return {
    required: "Instructor ID is required",
    validate: () => {
      if (isSame) {
        return "Memebr is has the same instructor choose another instructor";
      }
      return true;
    },
  };
}

export function validateRule({
  isMemberActive,
  hasActivePeriod,
  isNotPaid,
  RankIDForValidate,
  context,
}) {
  const messages = {
    required: "Member ID is required",
    notActive: "Member is not active, choose another member",
    hasPeriod: "This member already has an active period, choose another one",
    notPaid: "You have a period not paid yet, first pay for it",
    noPeriod: "This member does not have an active period, choose another one",
    maxTests:
      "You cannot take a new test because you have finished all tests. Now you are a Karate leader",
    stillDays:
      "The current period or another is still active, and you have remaining days in it.",
  };

  return {
    required: messages.required,
    validate: () => {
      if (!isMemberActive) {
        return messages.notActive;
      }

      switch (context) {
        case "validatePeriodRule":
          if (hasActivePeriod) return messages.hasPeriod;
          if (isNotPaid) return messages.notPaid;
          break;

        case "validateTestRule":
          if (RankIDForValidate === 17) return messages.maxTests;
          if (!hasActivePeriod) return messages.noPeriod;
          if (isNotPaid) return messages.notPaid;
          break;

        case "validateRenewPeriodRule":
          if (hasActivePeriod) return messages.stillDays;
          if (isNotPaid) return messages.notPaid;
          break;

        default:
          break;
      }

      return true;
    },
  };
}
