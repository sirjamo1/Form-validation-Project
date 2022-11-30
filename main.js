const labelCreator = (name, text) => {
    const label = document.createElement("label");
    label.for = name;
    label.innerHTML = `${text} <span style="color:red;">*</span>`;
    return label;
};
const inputCreator = (name, type, placeholder, required, min, max) => {
    const input = document.createElement("input");
    input.name = name;
    input.type = type;
    input.id = name;
    input.placeholder = placeholder;
    input.required = required;
    if (min > 0) {
        input.minLength = min;
    }
    if (max > 0) {
        input.maxLength = max;
    }
    if (name === "zipcode") {
        input.oninput = () => {
            input.value = input.value.replace(/[^0-9]/gi, "");
        };
    }
    return input;
};
const spanErrorCreator = () => {
    const spanError = document.createElement("span");
    spanError.className = "error";
    spanError.ariaLive = "polite";
    return spanError;
};
const renderForm = () => {
    const form = document.createElement("form");
    form.id = form;
    form.noValidate = true;
    form.appendChild(labelCreator("email", "Please enter your email"));
    form.appendChild(inputCreator("email", "email", "Enter e-mail", true));
    form.appendChild(spanErrorCreator());
    form.appendChild(labelCreator("country", "Please enter your country"));
    form.appendChild(
        inputCreator("country", "text", "Enter country", true, 4, 56)
    );
    form.appendChild(spanErrorCreator());
    form.appendChild(labelCreator("zipcode", "Please enter your zip code"));
    form.appendChild(
        inputCreator("zipcode", "text", "Enter zipcode", true, 4, 4)
    );
    form.appendChild(spanErrorCreator());
    form.appendChild(labelCreator("password", "Please enter your password"));
    form.appendChild(
        inputCreator("password", "password", "Enter password", true, 8)
    );
    form.appendChild(spanErrorCreator());
    form.appendChild(
        labelCreator("confirmPassword", "Please confirm password")
    );
    form.appendChild(
        inputCreator("confirmPassword", "password", "Confirm password", true, 8)
    );
    form.appendChild(spanErrorCreator());
    const button = document.createElement("button");
    button.type = "submit";
    button.innerHTML = "Submit";
    form.appendChild(button);
    return form;
};

document.body.appendChild(renderForm());

const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
const countryInput = document.getElementById("country");
const countryError = document.querySelector("#country + span.error");
const zipcodeInput = document.getElementById("zipcode");
const zipcodeError = document.querySelector("#zipcode + span.error");
const passwordInput = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");
const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordError = document.querySelector(
    "#confirmPassword + span.error"
);
const formContents = [
    emailInput,
    countryInput,
    zipcodeInput,
    passwordInput,
    confirmPasswordInput,
];
const formErrorContents = [
    emailError,
    countryError,
    zipcodeError,
    passwordError,
    confirmPasswordError,
];
for (let i = 0; i < formContents.length; i += 1) {
    formContents[i].addEventListener("input", (e) => {
        if (formContents[i].validity.valid) {
            formErrorContents[i].textContent = "";
            formErrorContents[i].className = "error";
        } else {
            showError(formContents[i]);
        }
    });
}

form.addEventListener("submit", (event) => {
    for (let i = 0; i < formContents.length; i += 1) {
        if (!formContents[i].validity.valid) {
            showError(formContents[i]);
            event.preventDefault();
        }
    }
});

const showError = (input) => {
    if (input === emailInput) {
        if (emailInput.validity.valueMissing) {
            emailError.textContent = "You need to enter e-mail address.";
        } else if (emailInput.validity.typeMismatch) {
            emailError.textContent =
                "Entered value needs to be an e-mail address.";
        } else if (emailInput.validity.tooShort) {
            emailError.textContent = `Email should be at least ${emailError.minLength} characters; you entered ${emailInput.value.length}.`;
        }
        emailError.className = "error active";
    } else if (input === countryInput) {
        if (countryInput.validity.valueMissing) {
            countryError.textContent = "You need to enter a country.";
        } else if (countryInput.validity.typeMismatch) {
            countryError.textContent = "Entered value needs to be an country.";
        } else if (
            countryInput.validity.tooShort ||
            countryInput.validity.tooLong
        ) {
            countryError.textContent = `Country length should be at least ${countryInput.minLength} and at most ${countryInput.maxLength} characters; you entered ${countryInput.value.length}.`;
        }
        countryError.className = "error active";
    } else if (input === zipcodeInput) {
        if (zipcodeInput.validity.valueMissing) {
            zipcodeError.textContent = "You need to enter a zipcode.";
        } else if (zipcodeInput.validity.typeMismatch) {
            zipcodeError.textContent = "Entered value needs to be a number.";
        } else if (
            zipcodeInput.validity.tooShort ||
            zipcodeInput.validity.tooLong
        ) {
            zipcodeError.textContent = `Zipcode length should be at least ${zipcodeInput.minLength} and at most ${zipcodeInput.maxLength} characters; you entered ${zipcodeInput.value.length}.`;
        }
        zipcodeError.className = "error active";
    } else if (input === passwordInput) {
        if (passwordInput.validity.valueMissing) {
            passwordError.textContent = "You need to enter a password.";
        } else if (passwordInput.validity.typeMismatch) {
            passwordError.textContent = "Entered value needs to be a number.";
        } else if (passwordInput.validity.tooShort) {
            passwordError.textContent = `Password length should be at least ${passwordInput.minLength} characters; you entered ${passwordInput.value.length}.`;
        }
        passwordError.className = "error active";
    } else if (input === confirmPasswordInput) {
        if (confirmPasswordInput !== passwordInput) {
            confirmPasswordError.textContent = "Password doesn't match";
        }
        confirmPasswordError.className = "error active";
    }
};
