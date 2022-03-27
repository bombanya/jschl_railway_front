import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const {serverUrl, setUsername, token, setToken} = useContext(AppContext);
    const [usernameInput, setUsernameInput] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token != null) navigate("/admin");
    }, []);

    const signIn = () => {
        if (usernameInput.length === 0 || password.length === 0){
            setInvalid(true);
        }
        else{
            setLoading(true);
            fetch(`${serverUrl}/login`, {
                method: "POST",
                headers: {
                    username: usernameInput,
                    password: password
                }
            })
                .then(response => {
                    setLoading(false);
                    if (response.ok){
                        setToken(response.headers.get("authorization"));
                        setUsername(usernameInput);
                        navigate("/admin");
                    }
                    else {
                        setInvalid(true);
                        setPassword("");
                    }
                })
        }
    }

    return (
        <div className="flex justify-content-center align-items-center"
             style={{height: "90vh"}}
        >
            <div className="myform">
                <div className="flex justify-content-center">
                    <div className="card">
                        <div>
                            <h3 className="text-center">Sign in</h3>
                        </div>
                        <div className="field">
                            <span className="p-float-label mb-4">
                                <InputText id="username"
                                           value={usernameInput}
                                           onChange={e => {
                                               setInvalid(false);
                                               setUsernameInput(e.target.value);
                                           }}
                                           className={invalid ? "w-full p-invalid" : "w-full"}
                                           disabled={loading}
                                />
                                <label htmlFor="username">Username*</label>
                            </span>
                        </div>
                        <div className="field">
                            <span className="p-float-label mb-4">
                                <Password id="password"
                                          value={password}
                                          onChange={e => {
                                              setInvalid(false);
                                              setPassword(e.target.value);
                                          }}
                                          className={invalid ? "w-full p-invalid" : "w-full"}
                                          inputClassName="w-full"
                                          disabled={loading}
                                          toggleMask
                                          feedback={false}
                                />
                                <label htmlFor="password">Password*</label>
                            </span>
                        </div>
                        <div>
                            <Button label="Sign in"
                                    loading={loading}
                                    onClick={signIn}
                            />
                        </div>
                        {invalid && <small className="p-error">Invalid login or password</small>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;