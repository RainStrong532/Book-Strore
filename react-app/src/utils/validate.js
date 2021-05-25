export const validatePassword = (password)=>{
    // const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const re8Char = /^[0-9a-zA-Z]{8,}$/;
    const reDigit = /\d+/g;
    const reLowChar = /[a-z]+/g;
    const reUpChar = /[A-Z]+/g;
    if(!re8Char.test(String(password))){
        return "Mật khẩu phải lớn hơn hoặc bằng 8 ký tự";
    }
    if(!reDigit.test(String(password))){
        return "Mật khẩu phải chứa ít nhất một ký tự số";
    }
    if(!reLowChar.test(String(password))){
        return "Mật khẩu phải chứa ít nhất một ký tự thường";
    }
    if(!reUpChar.test(String(password))){
        return "Mật khẩu phải chứa ít nhất một ký tự hoa";
    }
    return null;
}

export const validateEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePhoneNumber(phone) {
    const regex1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const regex2 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    return (regex1.test(phone) || regex2.test(phone));
  }

export function validateFields(data){
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            if(data[key].length === 0){
                return "Thiếu thông tin " + key + "!";
            }
        }
    }
    return null;
}