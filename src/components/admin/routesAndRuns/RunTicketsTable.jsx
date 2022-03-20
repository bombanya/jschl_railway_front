import React, {useContext, useEffect, useState} from 'react';
import {ProgressSpinner} from "primereact/progressspinner";
import {DataTable} from "primereact/datatable";
import {AppContext} from "../../../context";
import {Column} from "primereact/column";

const RunTicketsTable = ({run}) => {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const {serverUrl} = useContext(AppContext);

    useEffect(() => {
        fetch(`${serverUrl}/api/tickets/all/${run.id}`)
            .then(response => response.json())
            .then(data => {
                setTickets(data.serviceResult);
                setLoading(false);
            })
    }, []);

    return (
        <div>
            <h4>Run tickets</h4>
            {loading ?
                <div className="flex justify-content-center">
                    <ProgressSpinner/>
                </div>
                :
                <div>
                    <DataTable value={tickets} responsiveLayout="scroll"
                    >
                        <Column field="wagon.id" header="Wagon id"/>
                        <Column field="seat.id" header="Seat id"/>
                        <Column field="passenger.name" header="Name"/>
                        <Column field="passenger.surname" header="Surname"/>
                        <Column field="passenger.patronymic" header="Patronymic"/>
                        <Column field="passenger.birthDate" header="Birthday"
                                body={data => new Date(data.passenger.birthDate).toLocaleDateString()}/>
                        <Column field="passenger.passportId" header="Passport id"/>
                        <Column field="startStation.name" header="Start station"/>
                        <Column field="finishStation.name" header="Finish station"/>
                        <Column field="price" header="Price"/>
                    </DataTable>
                </div>
            }
        </div>
    );
};

export default RunTicketsTable;