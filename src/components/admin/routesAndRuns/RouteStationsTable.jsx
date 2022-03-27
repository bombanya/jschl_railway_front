import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const RouteStationsTable = ({route, stations}) => {

    const stationByRouteStation = (routeStation) => {
        return stations.find((station) => station.id === routeStation.id.stationId);
    }

    return (
        <div>
            <h4>Route stations list</h4>
            <DataTable value={route.routeStations}
                       responsiveLayout="scroll"
            >
                <Column field="serialNumberOnTheRoute" header="Serial number" sortable/>
                <Column field="id.stationId" header="Station" body={data => stationByRouteStation(data).name}/>
                <Column field="id.stationId" header="Settlement" body={data => stationByRouteStation(data).settlement.name}/>
                <Column field="id.stationId" header="Region" body={data => stationByRouteStation(data).settlement.region.name}/>
                <Column field="id.stationId" header="Country" body={data => stationByRouteStation(data).settlement.region.country.name}/>
                <Column field="stagePrice" header="Stage price"/>
                <Column field="stageDistance" header="Stage distance"/>
                <Column field="stageArrival" header="Stage arrival"/>
                <Column field="stageDeparture" header="Stage departure"/>
            </DataTable>
        </div>
    );
};

export default RouteStationsTable;