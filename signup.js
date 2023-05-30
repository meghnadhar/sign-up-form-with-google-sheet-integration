const form=document.getElementById("signup-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const inputs=document.querySelectorAll("input");
const submit_btn= document.getElementById("signupbtn");

inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      const formControl = input.parentElement;
      const span = formControl.querySelector("span");
      span.style.visibility='hidden';
      input.classList.remove("err", "success");
    });
  });

form.addEventListener('submit',(e)=>{
    // The preventDefault() method stops the form from submitting and prevents the page from refreshing.
    e.preventDefault();

    if(validateInputs()){
        document.getElementById("sign-in-text").innerText = "Logging In..";
        submit_btn.disabled = true;
        submitFunc();
    }
});


function validateInputs(){

    var emailValue = email.value.trim();
    var passwordValue = password.value.trim();
    let isValid = true;
    if(emailValue===""){
        const errorMsg="Email is required";
        errorFunc('email',errorMsg);
        isValid=false;
    }
    else if(passwordValue===""){
        const errorMsg="Password is required";
        errorFunc('password',errorMsg);
        isValid=false;
    }
    return isValid;
}

function errorFunc(id,msg){
    const inputfield= document.getElementById(id);
    const parentField = inputfield.parentElement;
    const span = parentField.querySelector("span");
    span.textContent=msg;
    inputfield.classList.add("err");
    span.style.visibility='visible';
}

function submitFunc(){
    let data = new FormData(form);
    //FormData creates a new object that contains all values of all the form fields

    fetch('https://script.google.com/macros/s/AKfycbwm_GxeeBnY7jTtTi6UuhCBP_VrgdVIghpwXU76umTE2UXy_wFjg7NyjdGt9ZLl92VM9A/exec',{
        method:'POST',body:data
    }).then(res=>res.text().then(restext=>{
        document.getElementById("success-msg").innerText=restext;
        form.reset();
        submit_btn.disabled = false;
    }))
}