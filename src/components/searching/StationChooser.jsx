import React, {useContext, useState} from 'react';
import {AppContext} from "../../context";
import {AutoComplete} from "primereact/autocomplete";

const StationChooser = ({selectedStation, setSelectedStation, placeholder, invalid, setInvalid}) => {
    const {serverUrl} = useContext(AppContext);
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [stationName, setStationName] = useState('');

    const fetchStations = (name) => {
        fetch(serverUrl + "/api/geography/station/all/name/settlname/" + name)
            .then(response => response.json())
            .then(data => setStations(data.serviceResult));
    }

    const searchStation = (event) => {
        setSelectedStation(null);
        setInvalid(false);
        if (event.query.length < 2 && stations.length > 0) setStations([]);
        else if (event.query.length === 2 && stations.length === 0) fetchStations(event.query);
        setFilteredStations(stations.filter(station => station.name.toLowerCase()
            .startsWith(event.query.toLowerCase()) ||
            station.settlement.name.toLowerCase().startsWith(event.query.toLowerCase())));
    }

    const itemTemplate = (item) => {
        return (
            <div>
                <div>
                    {item.name}
                </div>
                <small className="ml-2">
                    {item.settlement.name} <br/>
                    {item.settlement.region.name}, {item.settlement.region.country.name}
                </small>
            </div>)
    }

    const blur = () => {
        if (selectedStation == null){
            if (stations.length !== 0) {
                setSelectedStation(filteredStations[0]);
                setStationName(filteredStations[0].name);
            }
        }
    }

    return (
        <div>
            <AutoComplete value={stationName}
                          suggestions={filteredStations}
                          completeMethod={searchStation}
                          field="name"
                          onChange={e => setStationName(e.value)}
                          onBlur={blur}
                          itemTemplate={itemTemplate}
                          delay={1}
                          onSelect={e => setSelectedStation(e.value)}
                          placeholder={placeholder}
                          className="w-full"
                          inputClassName={invalid ? "w-full p-invalid" : "w-full"}
            />
            {invalid && <small className="p-error">Choose a station</small>}
        </div>

    );
};

export default StationChooser;