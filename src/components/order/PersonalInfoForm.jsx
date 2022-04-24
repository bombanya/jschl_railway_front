import React, {useContext, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {AppContext} from "../../context";

const PersonalInfoForm = ({person, setPerson, personalInfoConfirmed,
                              setPersonalInfoConfirmed, setPersonCode, setTitle}) => {

    const [loading, setLoading] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidSurname, setInvalidSurname] = useState(false);
    const [invalidBirthDate, setInvalidBirthDate] = useState(false);
    const [invalidPassportId, setInvalidPassportId] = useState(false);
    const {serverUrl} = useContext(AppContext);
    const [incorrectData, setIncorrectData] = useState(false);


    const processUserInfo = () => {
        let flag = true;
        if (person.name.length === 0){
            setInvalidName(true);
            flag = false;
        }
        if (person.surname.length === 0){
            setInvalidSurname(true);
            flag = false;
        }
        if (person.passportId.length === 0){
            setInvalidPassportId(true);
            flag = false;
        }
        if (person.birthDate == null){
            setInvalidBirthDate(true);
            flag = false;
        }
        if (flag){
            const date = person.birthDate.getFullYear() + "-" + ((person.birthDate.getMonth() + 1) < 10 ? "0" : "") +
                (person.birthDate.getMonth() + 1) + "-" + (person.birthDate.getDate() < 10 ? "0" : "") +
                person.birthDate.getDate()
            setLoading(true);
            fetch(`${serverUrl}/api/passenger/public/passenger/code`, {
                method: "POST",
                body: JSON.stringify({
                    name: person.name,
                    surname: person.surname,
                    patronymic: person.patronymic,
                    birthDate: date,
                    passportId: person.passportId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.serviceResult == null){
                        setIncorrectData(true);
                    }
                    else {
                        setPersonCode(data.serviceResult);
                        setPersonalInfoConfirmed(true);
                        setTitle("Confirm the order");
                    }
                    setLoading(false);
                });

        }
    }

    return (
        <div className="myform">
            <div className="flex justify-content-center ">
                <div className="card">
                    <div>
                        <h5 className="text-center">Personal info</h5>
                    </div>
                    <div className="field">
                        <span className="p-float-label mb-4">
                            <InputText id="name"
                                       value={person.name}
                                       onChange={e => {
                                           setIncorrectData(false);
                                           setInvalidName(false);
                                           setPerson({...person, name: e.target.value});
                                       }}
                                       className={invalidName ? "w-full p-invalid" : "w-full"}
                                       disabled={personalInfoConfirmed}
                            />
                            <label htmlFor="name">Name*</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label mb-4">
                            <InputText id="surname"
                                       value={person.surname}
                                       onChange={e => {
                                           setIncorrectData(false);
                                           setInvalidSurname(false);
                                           setPerson({...person, surname: e.target.value});
                                       }}
                                       className={invalidSurname ? "w-full p-invalid" : "w-full"}
                                       disabled={personalInfoConfirmed}
                            />
                            <label htmlFor="surname">Surname*</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label mb-4">
                            <InputText id="patronymic"
                                       value={person.patronymic}
                                       onChange={e => {
                                           setIncorrectData(false);
                                           setPerson({...person, patronymic: e.target.value});
                                       }}
                                       className="w-full"
                                       disabled={personalInfoConfirmed}
                            />
                            <label htmlFor="patronymic">Patronymic</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label mb-4">
                            <Calendar id="birthDate"
                                      value={person.birthDate}
                                      onChange={e => {
                                          setIncorrectData(false);
                                          setInvalidBirthDate(false);
                                          setPerson({...person, birthDate: e.target.value});
                                      }}
                                      dateFormat="dd.mm.yy"
                                      showIcon
                                      className={invalidBirthDate ? "w-full p-invalid" : "w-full"}
                                      mask="99.99.9999"
                                      monthNavigator
                                      yearNavigator
                                      yearRange="1920:2022"
                                      disabled={personalInfoConfirmed}
                            />
                            <label htmlFor="birthDate">Birthday*</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label mb-4">
                            <InputText id="passportId"
                                       value={person.passportId}
                                       onChange={e => {
                                           setIncorrectData(false);
                                           setInvalidPassportId(false);
                                           setPerson({...person, passportId: e.target.value});
                                       }}
                                       className={invalidPassportId ? "w-full p-invalid" : "w-full"}
                                       keyfilter="int"
                                       disabled={personalInfoConfirmed}
                            />
                            <label htmlFor="name">Passport id*</label>
                        </span>
                    </div>

                    <div>
                        <Button label={!personalInfoConfirmed ? "Confirm personal info" : "Change personal info"}
                                icon={!personalInfoConfirmed ? "pi pi-check" : "pi pi-replay"}
                                className={!personalInfoConfirmed ? "p-button-success" : "p-button-info"}
                                onClick={() => {
                                    if (personalInfoConfirmed){
                                        setPersonalInfoConfirmed(false);
                                        setPersonCode(null);
                                        setTitle("Enter your personal info");
                                    }
                                    else processUserInfo()
                                }}
                                loading={loading}
                        />
                    </div>
                    {incorrectData && <small className="p-error">Incorrect data</small>}
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoForm;