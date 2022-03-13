import React, {useRef, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import RouteStationsTable from "./RouteStationsTable";
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import RunsTable from "./RunsTable";

const RoutesAndRunsTable = ({routes, stations, runs}) => {

    const [expandedRows, setExpandedRows] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const op = useRef(null);

    const stationByRouteStation = (routeStation) => {
        return stations.find((station) => station.id === routeStation.id.stationId);
    }

    const getStartStationName = (route) => {
        const routeStations = route.routeStations;
        if (routeStations.length > 0){
            return stationByRouteStation(routeStations
                .sort((a, b) => a.serialNumberOnTheRoute > b.serialNumberOnTheRoute)[0]).name;
        }
        else return null;
    }

    const getFinishStationName = (route) => {
        const routeStations = route.routeStations;
        if (routeStations.length > 0){
            return stationByRouteStation(routeStations
                .sort((a, b) => a.serialNumberOnTheRoute > b.serialNumberOnTheRoute)[routeStations.length - 1]).name;
        }
        else return null;
    }

    const getRouteStationsButton = (data) => {
      return (
          <Button label="Route stations"
                  onClick={e => {
                      setSelectedRoute(data);
                      op.current.toggle(e);
                  }}
                  aria-haspopup
                  aria-controls="overlay_panel"
          />
      )
    }

    const getRouteRuns = (route) => {
        return runs.filter(run => run.route.id === route.id);
    }

    return (
        <div className="card">
            <DataTable value={routes}
                       expandedRows={expandedRows}
                       onRowToggle={e => setExpandedRows(e.data)}
                       responsiveLayout="scroll"
                       rowExpansionTemplate={data => RunsTable({runs: getRouteRuns(data)})}
                       dataKey="id"
            >
                <Column expander style={{ width: '3em' }}/>
                <Column field="id" header="Route id" />
                <Column field="train.id" header="Train"/>
                <Column field="routeStations" header="Start station" body={data => getStartStationName(data)}/>
                <Column field="routeStations" header="Finish station" body={data => getFinishStationName(data)}/>
                <Column body={data => getRouteStationsButton(data)} />
            </DataTable>

            <OverlayPanel ref={op} id="overlay_panel">
                <div>
                    <RouteStationsTable stations={stations}
                                        route={selectedRoute}
                    />
                </div>
            </OverlayPanel>
        </div>
    );
};

export default RoutesAndRunsTable;