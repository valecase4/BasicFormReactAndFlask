import { useEffect, useState } from 'react'
import './MyForm.css'

function MyForm() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [formStatus, setFormStatus] = useState("typing")


    // Validate first name and last name
    function checkTextInput(inputValue) {
        if (inputValue === "" || inputValue.length > 30) {
            return false
        } else {
            for (let i = 0; i < inputValue.length; i++) {
                let char = inputValue[i].toLowerCase()

                let charCode = char.charCodeAt(0)
                
                if (charCode < 97 || charCode > 122) {
                    return false
                }
            }
        }

        return true
    }

    function handleSubmitForm(e) {
        e.preventDefault()

        const errorMsg = document.querySelector(".error-msg")

        let isValidFirstName = checkTextInput(firstName)
        let isValidLastName = checkTextInput(lastName)
        let isValidAge = age != ""

        if (isValidFirstName && isValidLastName && isValidAge) {
            setFormStatus("sending")

            async function addUser() {
                const data = {
                    firstName,
                    lastName,
                    age
                }

                const url = "http://127.0.0.1:5000/add_user"

                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }

                const response = await fetch(url, options)
            }

            addUser()
            
            setTimeout(() => {
                setFormStatus("typing")
                setFirstName("")
                setLastName("")
                setAge("")
            }, 3000)
        } else {
            setFormStatus("error")
            console.log(formStatus)

            errorMsg.classList.remove("disabled")
            errorMsg.classList.add("enabled")

            setTimeout(() => {
                errorMsg.classList.remove("enabled")
                errorMsg.classList.add("disabled")
            }, 5000)
        }
    }

    useEffect(() => {
        const ageInput = document.querySelector(".ageInput")

        const initialOption = document.createElement("option")

        initialOption.value = ""
        initialOption.text = ""

        ageInput.appendChild(initialOption)

        for (let i=1; i<100; i++) {
            let newOption = document.createElement("option")

            newOption.value = `${i}`
            newOption.text = `${i}`

            ageInput.appendChild(newOption)
        }
    }, [])

    return (
        <>
            <div className="error-msg disabled">
                <p>Please ensure all fields all filled out correctly.</p>
            </div>
            <div className='container'>
                <form
                onSubmit={e => handleSubmitForm(e)}
                >
                    <div className="form-row">
                        <div className="label-container">
                            <label htmlFor="firstName">First Name: </label>
                        </div>
                        <div className="input-container">
                            <input 
                            type="text" 
                            id='firstName' 
                            value={firstName}
                            onChange={e => {setFirstName(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="label-container">
                            <label htmlFor="lastName">Last Name: </label>
                        </div>
                        <div className="input-container">
                            <input 
                            type="text" 
                            id='lastName' 
                            value={lastName}
                            onChange={e => {setLastName(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="label-container">
                            <label htmlFor="age">Age: </label>
                        </div>
                        <div className="select-container">
                            <select 
                            className="ageInput" 
                            id="age"
                            value={age}
                            onChange={e => {setAge(e.target.value)}}
                            >
                            </select>
                        </div>
                    </div>
                    <div className="form-row submit">
                        <input 
                        type="submit"
                        value="Submit" 
                        disabled={
                            firstName == "" || lastName == "" || age === "" || formStatus === 'sending' ? true : false
                        }
                        />
                    </div>
                </form>
                {formStatus === 'sending' && <div className='sending-msg'>
                    <p>Sending...</p>
                </div>}
            </div>
        </>
    )
}

export default MyForm