import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AppContext} from "../context";
import RunInfo from "../components/searching/RunInfo";
import {ProgressSpinner} from "primereact/progressspinner";
import {Card} from "primereact/card";
import SeatChooser from "../components/order/SeatChooser";
import {Button} from "primereact/button";
import OrderTicketsTable from "../components/order/OrderTicketsTable";
import PersonalInfoForm from "../components/order/PersonalInfoForm";
import PurchaseInfo from "../components/order/PurchaseInfo";

const OrderPage = () => {

    const navigate = useNavigate();
    const {runForOrder, serverUrl} = useContext(AppContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [orderSum, setOrderSum] = useState(0);
    const [ticketsConfirmed, setTicketsConfirmed] = useState(false);
    const [title, setTitle] = useState("Select tickets (max 5)")
    const [personalInfoConfirmed, setPersonalInfoConfirmed] = useState(false);
    const [personCode, setPersonCode] = useState(null);
    const [purchasing, setPurchasing] = useState(false);
    const [person, setPerson] = useState({
        name: "",
        surname: "",
        patronymic: "",
        birthDate: null,
        passportId: ""
    });

    useEffect(() => {
        if (runForOrder == null){
            navigate("/");
        }
        else {
            fetch(serverUrl + "/public/tickets/available/" + runForOrder.runId + "/" +
                runForOrder.startStation.id + "/" + runForOrder.finishStation.id)
                .then(response => response.json())
                .then(data => {
                    setTickets(data.serviceResult);
                    setLoading(false);
                })
        }
    }, []);

    useEffect(() => {
        let sum = 0;
        selectedTickets.forEach(ticket => sum += ticket.price);
        setOrderSum(sum);
    }, [selectedTickets]);

    return (
        <div className="card">
            {!purchasing ?
                <div>
                    {runForOrder != null &&
                        <div className="grid">
                            <div className="col-6 col-offset-3">
                                <RunInfo run={runForOrder} withBuyButton={false}/>
                            </div>
                        </div>
                    }
                    {loading &&
                        <div className="flex justify-content-center">
                            <ProgressSpinner/>
                        </div>
                    }

                    <Card title={title}>
                        <div className="grid">
                            <div className="col-3">
                                <div>
                                    <h6>
                                        Tickets: {selectedTickets.length}
                                    </h6>
                                </div>
                                <div>
                                    <h6>
                                        Total: {orderSum}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-3 col-offset-6 flex justify-content-end align-items-center">
                                <Button label={!ticketsConfirmed ? "Confirm" : "Change selection"}
                                        disabled={selectedTickets.length === 0}
                                        icon={!ticketsConfirmed ? "pi pi-check" : "pi pi-replay"}
                                        className={!ticketsConfirmed ? "p-button-success" : "p-button-info"}
                                        onClick={() => {
                                            if (ticketsConfirmed) setTitle("Select tickets (max 5)");
                                            else if (personalInfoConfirmed){
                                                setTitle("Confirm the order");
                                            }
                                            else setTitle("Enter your personal info");
                                            setTicketsConfirmed(!ticketsConfirmed);
                                        }}
                                />
                            </div>
                            <div className="col-12">
                                {!ticketsConfirmed
                                    ?
                                    <SeatChooser tickets={tickets}
                                                 selectedTickets={selectedTickets}
                                                 setSelectedTickets={setSelectedTickets}
                                                 maxNumberOfTickets={5}
                                    />
                                    :
                                    <OrderTicketsTable tickets={selectedTickets}/>
                                }
                            </div>
                            <div className="col-12">
                                {ticketsConfirmed &&
                                    <PersonalInfoForm personalInfoConfirmed={personalInfoConfirmed}
                                                      setPersonalInfoConfirmed={setPersonalInfoConfirmed}
                                                      setPersonCode={setPersonCode}
                                                      setTitle={setTitle}
                                                      person={person}
                                                      setPerson={setPerson}
                                    />
                                }
                            </div>

                            <div className="col-4 col-offset-4">
                                {(ticketsConfirmed && personalInfoConfirmed) &&
                                    <Button label="Buy tickets"
                                            className="w-full p-button-danger"
                                            onClick={() => {
                                                setPurchasing(true);
                                            }}
                                    />
                                }
                            </div>
                        </div>
                    </Card>
                </div>
                :
                <div>
                    <PurchaseInfo selectedTickets={selectedTickets}
                                  personCode={personCode}
                    />
                </div>
            }


        </div>
    );
};

export default OrderPage;