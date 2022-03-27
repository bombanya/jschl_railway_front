import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const TrainWagonsList = ({wagons, wagonTypes}) => {

    const [processedWagons, setProcessedWagons] = useState([]);

    useEffect(() => {
        const wagonsByType = [];
        wagonTypes.forEach(wagonType => {
            wagonsByType.push({
                id: wagonType.id,
                name: wagonType.name,
                number: wagons.filter(wagon => wagon.wagonType.id === wagonType.id).length
            });
        });
        setProcessedWagons(wagonsByType);
    }, [wagons]);

    return (
        <div>
            <h4>Train cars list</h4>
            <DataTable value={processedWagons}
                       responsiveLayout="scroll"
            >
                <Column field="id" header="Type id"/>
                <Column field="name" header="Type name"/>
                <Column field="number" header="Number of cars"/>
            </DataTable>
        </div>
    );
};

export default TrainWagonsList;