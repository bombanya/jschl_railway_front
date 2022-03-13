 import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../context";
import RoutesAndRunsTable from "../components/admin/RoutesAndRunsTable";
import NewRouteForm from "../components/admin/NewRouteForm";

const AdminPage = () => {

    const {serverUrl} = useContext(AppContext);

    const [routes, setRoutes] = useState([]);
    const [stations, setStations] = useState([]);
    const [runs, setRuns] = useState([]);

    useEffect(() => {
        fetch(`${serverUrl}/api/geography/station/all`)
            .then(response => response.json())
            .then(data => setStations(data.serviceResult))
            .then(() => fetch(`${serverUrl}/api/routes/run/all`))
            .then(response => response.json())
            .then(data => setRuns(data.serviceResult))
            .then(() => fetch(`${serverUrl}/api/routes/route/all`))
            .then(response => response.json())
            .then(data => setRoutes(data.serviceResult));
    }, []);

    return (
        <div className="card">
            <RoutesAndRunsTable routes={routes}
                                stations={stations}
                                runs={runs}
            />

            <NewRouteForm />
        </div>
    );
};

export default AdminPage;