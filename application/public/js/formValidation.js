function usernameValidation(string){
    let counter = 0;

    // check to make sure string isn't empty
    if (string.length < 3){
        // console.log("Username must be 3 or more alphanumeric characters");
        window.alert("Username must be 3 or more alphanumeric characters");
        return false;
    }

    // if not empty, set first character of string and validate
    let firstChar = string[0];
    if(!firstChar.match(/[a-z]/i)){
        window.alert("Username must begin with a character");
        return false;
    }

    // if we reach here, iterate through string and verify at least 3 alphanumeric characters
    for (let index = 0; index < string.length; index ++){
        if(string[index].match(/[a-z]/i)){
            counter ++;
        }
    }

    if (counter < 3)
    {
        window.alert("Username must contain 3 or more alphanumeric characters");
        return false;
    }

};

function passwordValidation(string){
    let upper = false;
    let number = false;
    let special = false;

    if (string.length < 8)
    {
        window.alert("Password must be at least 8 or more characters");
        return false;
    }

    for (let index = 0; index < string.length; index ++)
    {
        if (!isNaN(string[index] * 1)){
            number = true;
        }
        else{
            if (string[index] == string[index].toUpperCase()){
                upper = true;
            }
            if(containsSpecial(string[index])){
                special = true;
            }
        }
    }

    if(upper == false)
    {
        window.alert("Password must contain an Uppercase Character");
        return false;
    }
    if (number == false)
    {
        window.alert("Password must contain a Number");
        return false;
    }
    if (special == false)
    {
        window.alert("Password must contain an Special Character")
    }
}

// special character check
function containsSpecial(ch){
    return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(ch);
}

function registrationValidation() {
    let username = document.forms["registration"]["username"].value;
    let password = document.forms["registration"]["password"].value;
    let confirmpw = document.forms["registration"]["confirmpw"].value;
    usernameValidation(username);
    passwordValidation(password);

    if(password !== confirmpw)
    {
        window.alert("Passwords do not match!");
    }
}

