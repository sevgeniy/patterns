export default class Validator {
    constructor(options) {
        this.options = options;
        this.errorMessages = [];
    }

    validate(data) {
        let isValid = true;
        this.errorMessages = [];

        for (let field in data) {
            if (!data.hasOwnProperty(field)) {
                continue;
            }

            let validationName = this.options[field];
            if (!validationName) {
                // this field has no validation rules
                continue;
            }

            let fieldValidator = Validator.types[validationName];
            if (!fieldValidator) {
                throw new Error(
                    `Validator doesn't have definition for ${validationName} rule`
                );
            }

            if (!fieldValidator.isValid(field, data[field])) {
                isValid = false;
                this.errorMessages.push(fieldValidator.errorMessage);
            }
        }

        return isValid;
    }
}

Validator.types = {
    isNotNullOrEmpty: {
        isValid(name, value) {
            if (!value) {
                this.errorMessage = `Field ${name} has incorrect value, it should be not null or empty`;
                return false;
            }

            return true;
        },
    },
    isNumber: {
        isValid(name, value) {
            if (value.trim() === '' || isNaN(value)) {
                this.errorMessage = `Field ${name} has incorrect value, it should be number`;
                return false;
            }

            return true;
        },
    },
};
