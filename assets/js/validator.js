export default function Validator(options) {
    var selectorRules = {};
    var formElement = document.querySelector(options.form);
    function getParent(element, selector) {
        // return ('.' + element.className).split(" ").shift() == options.formGroupSelector ? element : getParent(element.parentElement)
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    //hàm thay đổi giao diện cảnh báo cho input đầu vào
    function validElement(inputElement, check = true) {
        if (check) {
            getParent(inputElement, options.formGroupSelector).classList.add("invalid");
        } else {
            getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector).innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
        }
    }
    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var formMessage = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errormessage;
        const rules = selectorRules[rule.selector];
        for (let i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errormessage = rules[i](
                        formElement.querySelector(rule.selector + ":checked")
                    );
                    break
                default:
                    errormessage = rules[i](inputElement.value);
            }
            if (errormessage) {
                break;
            }
            // console.log(errormessage);
        }
        if (errormessage) {
            formMessage.innerText = errormessage;
            validElement(inputElement, true)

        } else {
            validElement(inputElement, false)
        }
        return !errormessage
    }
    // Thực hiện validate lên 1 hoặc nhiều phần tử được chọn
    if (formElement) {
        formElement.onsubmit = (e) => {
            var checkError = true;
            e.preventDefault();
            options.rules.forEach(rule => {
                var inputElements = formElement.querySelectorAll(rule.selector);
                Array.from(inputElements).forEach(inputElement => {
                    if (!validate(inputElement, rule)) {
                        checkError = validate(inputElement, rule);
                    }
                })
            })
            if (checkError) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    // console.log(Array.from(enableInputs))
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        console.log(input);
                        switch (input.type) {
                            case 'radio':
                                values[input.type] ? {} : values[input.type] = formElement.querySelector('input[name]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {})
                    options.onSubmit(formValues);
                }
                else
                    formElement.submit();
            }

        }
        options.rules.forEach(rule => {
            Array.isArray(selectorRules[rule.selector]) ? selectorRules[rule.selector].push(rule.test) : selectorRules[rule.selector] = [rule.test];
            var inputElements = formElement.querySelectorAll(rule.selector);
            // console.log(inputElements)
            Array.from(inputElements).forEach(inputElement => {
                inputElement.onblur = function () {
                    // console.log('input')
                    validate(inputElement, rule);
                }
                inputElement.oninput = function () {
                    getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector).innerText = "";
                    getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
                }
            })

            //console.log(inputElements)
        });
    }

    //function test

}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Please fill out this field *';
        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value == getConfirmValue() ? undefined : message || 'Wrong value confirm not true *';
        }
    }
}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.match('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$') ? undefined : message || 'Wrong value gmail *';
        }
    }
}
Validator.isMin = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value, minVal = min) {
            return value.length > min ? undefined : message || `Minimum ${minVal} characters required *`;
        }
    }
}


/***
 * Các bước dự kiến
 * Thành quả 1 hàm function có các tham số truyền vào :
 * Validator(id_form,form-group,form-messeage,rules[Validator.isRequired,Validator.isEmail,Validator.isPassword,Validator.isConfirmed])
 * B1:Tạo 1 hàm function Validator - hàm chính
 * B2:Tạo một hàm validate gồm có 2 đối số truyên vào là
 * đỗi số chứa các phần tử cần kiểm tra(cụ thể ở đây là những phần tử
 * với cái tên truyền vào hàm thuộc để check như isRequired())
 * =>mục đích của hàm này là thực hiện chạy function test trong rule để nhận lấy 
 * giá trị errormessage = undefined nếu đúng ngược lại thì 1 dòng text cảnh báo rồi
 * sau đó đưa dòng text ấy hiển thị qua form-message cho người dùng biết.
 * B4:Thực hiện lặp qua mỗi rules rồi import vào mảng mới selectorRules
 * B5: Đồng thời xử lý trường hợp blur khỏi input thì sẽ chạy lại validate
 * để check ngay lập tức
 * B6: Xử lý huỷ đi cảnh báo của element khi người dùng
 * nhập vào input
 */