export const checkValidData = (email, password, name) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    const isNameValid = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(name)
    

    if (!isEmailValid) return "Email id is not valid"
    if (!isPasswordValid) return "Password is not valid"
    if(isNameValid) return "Name is not valid"
    
    return null;
}