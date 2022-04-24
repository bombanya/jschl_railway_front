 import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context";
import RoutesAndRunsTable from "../components/admin/routesAndRuns/RoutesAndRunsTable";
import NewRouteForm from "../components/admin/routesAndRuns/NewRouteForm";
 import TrainsTable from "../components/admin/trains/TrainsTable";
 import SeatsTable from "../components/admin/trains/SeatsTable";
 import {Accordion, AccordionTab} from "primereact/accordion";
 import {Card} from "primereact/card";
 import {useNavigate} from "react-router-dom";
 import {Button} from "primereact/button";

const AdminPage = () => {

    const {serverUrl, username, setUsername, setToken} = useContext(AppContext);

    const [routes, setRoutes] = useState([]);
    const [stations, setStations] = useState([]);
    const [runs, setRuns] = useState([]);
    const [trains, setTrains] = useState([]);
    const [wagonTypes, setWagonTypes] = useState([]);
    const [seats, setSeats] = useState([]);
    const {token} = useContext(AppContext);
    const navigate = useNavigate();

    const fetchRoute = (id) => {
        fetch(`${serverUrl}/api/routes/route/${id}`, {headers: {"Authorization": token}})
            .then(response => response.json())
            .then(data => setRoutes([...routes, data.serviceResult]));
    }

    useEffect(() => {

        if (token == null) {
            navigate("/login")
        }
        else {
            fetch(`${serverUrl}/api/geography/public/station/all`, {headers: {"Authorization": token}})
                .then(response => response.json())
                .then(data => setStations(data.serviceResult))
                .then(() => fetch(`${serverUrl}/api/routes/run/all`, {headers: {"Authorization": token}}))
                .then(response => response.json())
                .then(data => setRuns(data.serviceResult))
                .then(() => fetch(`${serverUrl}/api/routes/route/all`, {headers: {"Authorization": token}}))
                .then(response => response.json())
                .then(data => setRoutes(data.serviceResult))
                .then(() => fetch(`${serverUrl}/api/trains/train/all`, {headers: {"Authorization": token}}))
                .then(response => response.json())
                .then(data => setTrains(data.serviceResult))
                .then(() => fetch(`${serverUrl}/api/trains/wagontype/all`, {headers: {"Authorization": token}}))
                .then(response => response.json())
                .then(data => setWagonTypes(data.serviceResult))
                .then(() => fetch(`${serverUrl}/api/trains/seat/all`, {headers: {"Authorization": token}}))
                .then(response => response.json())
                .then(data => setSeats(data.serviceResult))
        }
    }, []);

    return (
        <div className="card">
            <div className="p-menubar flex justify-content-between mb-4">
                <h5 className="mb-0 mt-0">{username}</h5>
                <Button label="Sign out"
                        onClick={() => {
                            setUsername("");
                            setToken(null);
                            navigate("/login");
                        }}
                />
            </div>
            <Accordion multiple>
                <AccordionTab header="Routes and runs">
                    <Card className="mb-3" title="Routes and runs table">
                        <RoutesAndRunsTable routes={routes}
                                            stations={stations}
                                            runs={runs}
                                            trains={trains}
                                            wagonTypes={wagonTypes}
                                            setRuns={setRuns}
                        />
                    </Card>

                    <Card className="mb-3" title="Register new route">
                        <NewRouteForm fetchRoute={fetchRoute}/>
                    </Card>
                </AccordionTab>

                <AccordionTab header="Trains">
                    <Card className="mb-3" title="Trains and train schedule">
                        <TrainsTable trains={trains}/>
                    </Card>
                    <Card className="mb-3" title="Cars types and seats table">
                        <SeatsTable seats={seats} />
                    </Card>
                </AccordionTab>
            </Accordion>
        </div>
    );
};

export default AdminPage;