import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ToggleButton} from "primereact/togglebutton";

const OrderTicketsTable = ({tickets}) => {

    const getToggleForSeat = (data, column) => {
        return (
            <ToggleButton checked={data.seat[column]}
                          onIcon="pi pi-check"
                          offIcon="pi pi-times"
            />
        )
    }

    return (
        <DataTable value={tickets}
                   responsiveLayout="scroll"
        >
            <Column field="wagon.id" header="Wagon id"/>
            <Column field="wagon.wagonType.name" header="Wagon type"/>
            <Column field="seat.insideWagonId" header="Inside wagon id"/>
            <Column field="seat.seatClass" header="Seat class"/>
            <Column field="seat.lying" header="Lying"
                    body={data => getToggleForSeat(data, "lying")}/>
            <Column field="seat.nextToTable" header="Next to table"
                    body={data => getToggleForSeat(data, "nextToTable")}/>
            <Column field="seat.powerSocket" header="Power socket"
                    body={data => getToggleForSeat(data, "powerSocket")}/>
            <Column field="seat.upper" header="Upper"
                    body={data => getToggleForSeat(data, "upper")}/>
            <Column field="price" header="Price"/>
        </DataTable>
    );
};

export default OrderTicketsTable;