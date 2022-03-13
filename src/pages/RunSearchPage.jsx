import React, {useContext, useState} from 'react';
import SettlChooser from "../components/searching/SettlChooser";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {AppContext} from "../context";
import RunsList from "../components/searching/RunsList";

const RunSearchPage = () => {

    const [settlFrom, setSettlFrom] = useState(null);
    const [settlTo, setSettlTo] = useState(null);
    const [departureDate, setDepartureDate] = useState(null);
    const [runs, setRuns] = useState([]);
    const [settlFromInvalid, setSettlFromInvalid] = useState(false);
    const [settlToInvalid, setSettlToInvalid] = useState(false);
    const [departureDateInvalid, setDepartureDateInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emptyResult, setEmptyResult] = useState(false);
    const {serverUrl} = useContext(AppContext);

    const searchForRuns = () => {
        if (settlFrom == null) setSettlFromInvalid(true);
        else if (settlTo == null) setSettlToInvalid(true);
        else if (departureDate == null) setDepartureDateInvalid(true);
        else{
            const date = departureDate.getFullYear() + "-" + (((departureDate.getMonth() + 1) < 10) ? "0" : "") +
                (departureDate.getMonth() + 1) + "-" + departureDate.getDate();
            setLoading(true);
            setEmptyResult(false);
            fetch(`${serverUrl}/api/routes/run/search/check/${settlFrom.id}/${settlTo.id}/${date}`)
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    setEmptyResult(data.serviceResult.length === 0);
                    setRuns(data.serviceResult);
                });
        }

    }

    return (
        <div className="card h-full">
            <div className="grid align-content-start h-full">
                <div className="col-3 mb-0 pb-0">
                    <h4 className="mb-0 pb-0">From</h4>
                </div>
                <div className="col-1" />
                <div className="col-3 mb-0 pb-0">
                    <h4 className="mb-0 pb-0">To</h4>
                </div>
                <div className="col-3 mb-0 pb-0">
                    <h4 className="mb-0 pb-0">Departure Date</h4>
                </div>
                <div className="col-2"/>

                <div className="col-3">
                    <SettlChooser selectedSettl={settlFrom}
                                  setSelectedSettl={setSettlFrom}
                                  placeholder="Departure"
                                  invalid={settlFromInvalid}
                                  setInvalid={setSettlFromInvalid}
                    />
                </div>
                <div className="col-1 flex justify-content-center align-items-center">
                        <i className="pi pi-arrow-right "/>
                </div>

                <div className="col-3">
                    <SettlChooser selectedSettl={settlTo}
                                  setSelectedSettl={setSettlTo}
                                  placeholder="Destination"
                                  invalid={settlToInvalid}
                                  setInvalid={setSettlToInvalid}
                    />
                </div>
                <div className="col-3">
                    <Calendar value={departureDate}
                              onChange={e => {
                                  setDepartureDate(e.value);
                                  setDepartureDateInvalid(false);
                              }}
                              dateFormat="dd.mm.yy"
                              minDate={new Date()}
                              placeholder="Choose date"
                              className="w-full"
                              inputClassName={departureDateInvalid ? "w-full p-invalid" : "w-full"}
                    />
                    {departureDateInvalid && <small className="p-error">Choose a date</small> }
                </div>
                <div className="col-2">
                    <Button onClick={searchForRuns}
                            label="Find tickets"
                    />
                </div>

                <div className="col-8 col-offset-2">
                    <RunsList runs={runs}
                              loading={loading}
                              emptyList={emptyResult}
                    />
                </div>
            </div>
        </div>


    );
};

export default RunSearchPage;