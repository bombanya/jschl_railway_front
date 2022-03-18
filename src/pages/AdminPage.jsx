 import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context";
import RoutesAndRunsTable from "../components/admin/routesAndRuns/RoutesAndRunsTable";
import NewRouteForm from "../components/admin/NewRouteForm";
 import TrainsTable from "../components/admin/trains/TrainsTable";
 import SeatsTable from "../components/admin/trains/SeatsTable";

const AdminPage = () => {

    const {serverUrl} = useContext(AppContext);

    const [routes, setRoutes] = useState([]);
    const [stations, setStations] = useState([]);
    const [runs, setRuns] = useState([]);
    const [trains, setTrains] = useState([]);
    const [wagonTypes, setWagonTypes] = useState([]);
    const [seats, setSeats] = useState([]);

    const fetchRoute = (id) => {
        fetch(`${serverUrl}/api/routes/route/${id}`)
            .then(response => response.json())
            .then(data => setRoutes([...routes, data.serviceResult]));
    }

    useEffect(() => {
        fetch(`${serverUrl}/api/geography/station/all`)
            .then(response => response.json())
            .then(data => setStations(data.serviceResult))
            .then(() => fetch(`${serverUrl}/api/routes/run/all`))
            .then(response => response.json())
            .then(data => setRuns(data.serviceResult))
            .then(() => fetch(`${serverUrl}/api/routes/route/all`))
            .then(response => response.json())
            .then(data => setRoutes(data.serviceResult))
            .then(() => fetch(`${serverUrl}/api/trains/train/all`))
            .then(response => response.json())
            .then(data => setTrains(data.serviceResult))
            .then(() => fetch(`${serverUrl}/api/trains/wagontype/all`))
            .then(response => response.json())
            .then(data => setWagonTypes(data.serviceResult))
            .then(() => fetch(`${serverUrl}/api/trains/seat/all`))
            .then(response => response.json())
            .then(data => setSeats(data.serviceResult))
    }, []);

    return (
        <div className="card">
            <RoutesAndRunsTable routes={routes}
                                stations={stations}
                                runs={runs}
                                trains={trains}
                                wagonTypes={wagonTypes}
                                setRuns={setRuns}
            />

            <NewRouteForm fetchRoute={fetchRoute}
            />

            <TrainsTable trains={trains}
            />

            <SeatsTable seats={seats} />
        </div>
    );
};

export default AdminPage;