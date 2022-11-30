const labelCreator = (name, text) => {
    const label = document.createElement("label");
    label.for = name;
    label.innerHTML = text;
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
const emailI = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
const countryI = document.getElementById("country");
const countryError = document.querySelector("#country + span.error");
const zipcodeI = document.getElementById("zipcode");
const zipcodeError = document.querySelector("#zipcode + span.error");
const passwordI = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");
const passwordConfirmI = document.getElementById("confirmPassword");
const passwordConfirmError = document.querySelector(
    "#confirmPassword + span.error"
);
const formContents = [emailI, countryI, zipcodeI, passwordI, passwordConfirmI];
const formErrorContents = [
    emailError,
    countryError,
    zipcodeError,
    passwordError,
    passwordConfirmError,
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
    if (input === emailI) {
        if (emailI.validity.valueMissing) {
            emailError.textContent = "You need to enter e-mail address.";
        } else if (emailI.validity.typeMismatch) {
            emailError.textContent =
                "Entered value needs to be an e-mail address.";
        } else if (emailI.validity.tooShort) {
            emailError.textContent = `Email should be at least ${emailError.minLength} characters; you entered ${emailI.value.length}.`;
        }
        emailError.className = "error active";
    } else if (input === countryI) {
        if (countryI.validity.valueMissing) {
            countryError.textContent = "You need to enter a country.";
        } else if (countryI.validity.typeMismatch) {
            countryError.textContent = "Entered value needs to be an country.";
        } else if (countryI.validity.tooShort || countryI.validity.tooLong) {
            countryError.textContent = `Country length should be at least ${countryI.minLength} and at most ${countryI.maxLength} characters; you entered ${countryI.value.length}.`;
        }
        countryError.className = "error active";
    } else if (input === zipcodeI) {
        if (zipcodeI.validity.valueMissing) {
            zipcodeError.textContent = "You need to enter a zipcode.";
        } else if (zipcodeI.validity.typeMismatch) {
            zipcodeError.textContent = "Entered value needs to be a number.";
        } else if (zipcodeI.validity.tooShort || zipcodeI.validity.tooLong) {
            zipcodeError.textContent = `Zipcode length should be at least ${zipcodeI.minLength} and at most ${zipcodeI.maxLength} characters; you entered ${zipcodeI.value.length}.`;
        }
        zipcodeError.className = "error active";
    } else if (input === passwordI) {
        if (passwordI.validity.valueMissing) {
            passwordError.textContent = "You need to enter a password.";
        } else if (passwordI.validity.typeMismatch) {
            passwordError.textContent = "Entered value needs to be a number.";
        } else if (passwordI.validity.tooShort) {
            passwordError.textContent = `Password length should be at least ${passwordI.minLength} characters; you entered ${passwordI.value.length}.`;
        }
        passwordError.className = "error active";
    } else if (input === passwordConfirmI) {
        if (passwordConfirmI !== passwordI) {
            passwordConfirmError.textContent = "Password doesn't match";
        }
        passwordConfirmError.className = "error active";
    }
};
