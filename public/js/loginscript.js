const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const formdata ={
        
        password:RegistrationForm.psw.value,
       
        email:RegistrationForm.email.value
    }
    console.log(JSON.stringify(formdata))
    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(formdata)
    });
})
