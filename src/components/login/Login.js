import React, {useState} from "react";
import LoginForm from "../forms/LoginForm";
import logo from "../../assets/padlock.png"
export default function Login() {
    const [submitting, setSubmitting] = useState(false);
    const [credentialError, setCredentialError] = useState(false);

    function onSubmit() {

    }
    return (
        <div className="App-background-container">
            <div className="App-form-container">
                <img src={logo} className="App-image-size-big App-image-position" />
                <LoginForm
                onSubmit={onSubmit}
                submitting={submitting}
                credentialError={credentialError}
                setCredentialError={setCredentialError}
            />
            </div>

            </div>

    )
}