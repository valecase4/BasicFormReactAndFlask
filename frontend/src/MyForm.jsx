import { useEffect, useState } from 'react'
import './MyForm.css'

function MyForm() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")

    function handleSubmitForm(e) {
        e.preventDefault()

        console.log(firstName, lastName, age)
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
                            onChange={e => setFirstName(e.target.value)}
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
                            onChange={e => setLastName(e.target.value)}
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
                            onChange={e => setAge(e.target.value)}
                            >
                            </select>
                        </div>
                    </div>
                    <div className="form-row submit">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default MyForm