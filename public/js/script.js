const RegistrationForm = document.getElementById('register-form')

RegistrationForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const formdata ={
        firstname:RegistrationForm.fname.value,
        lastname:RegistrationForm.lname.value,
        password:RegistrationForm.psw.value,
        address:RegistrationForm.address.value,
        email:RegistrationForm.email.value
    }
    console.log(JSON.stringify(formdata))
    fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(formdata)
    });
})
