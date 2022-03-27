import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../context";
import {ProgressSpinner} from "primereact/progressspinner";
import {useNavigate} from "react-router-dom";

const PurchaseInfo = ({personCode, selectedTickets}) => {

    const [loading, setLoading] = useState(true);
    const {serverUrl} = useContext(AppContext);
    const navigate = useNavigate();
    const [purchasingResult, setPurchasingResult] = useState(null);
    const [purchasedSuccessful, setPurchasedSuccessful] = useState(false);

    useEffect(() => {
        if (personCode == null || selectedTickets == null || selectedTickets.length === 0){
            navigate("/");
        }
        else{
            const order = [];
            selectedTickets.forEach(ticket => order.push({...ticket, passenger: {id: personCode}}));
            fetch(`${serverUrl}/public/tickets/buy`, {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    if (data.errorMessage == null){
                        setPurchasingResult("Order successfully completed. Thanks for the purchase!");
                        setPurchasedSuccessful(true);
                    }
                    else{
                        setPurchasingResult("Error in ticket ordering process. We apologize");
                        setPurchasedSuccessful(false);
                    }
                })
        }
    }, []);

    return (
        <div>
            {loading ?
                <div className="grid">
                    <div className="col-12 flex justify-content-center">
                        <h4>
                            Order processing...
                        </h4>
                    </div>
                    <div className="col-12 flex justify-content-center">
                        <ProgressSpinner/>
                    </div>
                </div>
                :
                <div className="justify-content-center text-center">
                    <h4 className={!purchasedSuccessful ? "p-error" : ""}>
                        {purchasingResult}
                    </h4>
                </div>}
        </div>
    );
};

export default PurchaseInfo;