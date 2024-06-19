import './App.css'
import { useEffect, useState } from 'react'

function App() {
    const [loggedIn, setLoggedIn] = useState()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState()
    const [password, setPassword] = useState()
    const [passwordError, setpasswordError] = useState()

    const onButtonClick = () => {
        // Navigate to Welcome.html for now, we will run the authentication here
        

        window.location.href = './views/Welcome.html'; 
    }

    useEffect(() => {
        getStudentToken();
    }, []);

    return (
        <div className="login">
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <div>Login</div>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
                </div>
            </div>
        </div>
    )

    async function getStudentToken() {
        const response = await fetch('studentToKen');
        const data = await response.json();
        setLoggedIn(data);
    }
}

export default App