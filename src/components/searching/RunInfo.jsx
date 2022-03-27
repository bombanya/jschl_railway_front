import React, {useContext} from 'react';
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {AppContext} from "../../context";
import {useNavigate} from "react-router-dom";

const RunInfo = ({run, withBuyButton}) => {

    const startStationTime = new Date(...(run.startStationTimeDeparture));
    const finishStationTime = new Date(...(run.finishStationTimeArrival));
    const {setRunForOrder} = useContext(AppContext);
    const navigate = useNavigate();

        return (
        <Card>
            <div className="grid">
                <div className="col-4">
                    <h5 className="mb-1">
                        {startStationTime.getDate()}.{startStationTime.getMonth()}.{startStationTime.getFullYear()}
                    </h5>
                    <h2 className="mt-0">
                        {startStationTime.getHours()}:{startStationTime.getMinutes()}
                    </h2>

                    <div>
                        {run.startStation.name} <br/>
                        {run.startStation.settlement.name}, {run.startStation.settlement.region.name} <br/>
                        {run.startStation.settlement.region.country.name}
                    </div>

                </div>

                <div className="col-4 flex justify-content-center align-items-center">
                    <div>
                        <i className="flex pi pi-arrow-right justify-content-center"/>
                        <div className="flex justify-content-center">
                            {Math.floor(run.travelTime / 60)} h. {run.travelTime % 60} min.
                        </div>
                    </div>

                </div>

                <div className="col-4">
                    <h5 className="mb-1 flex justify-content-end">
                        {finishStationTime.getDate()}.{finishStationTime.getMonth()}.{finishStationTime.getFullYear()}
                    </h5>
                    <h2 className="mt-0 flex justify-content-end">
                        {finishStationTime.getHours()}:{finishStationTime.getMinutes()}
                    </h2>

                    <div className="flex justify-content-end">
                        {run.finishStation.name} <br/>
                        {run.finishStation.settlement.name}, {run.finishStation.settlement.region.name} <br/>
                        {run.finishStation.settlement.region.country.name}
                    </div>
                </div>

                {withBuyButton &&
                    <div className="col-12 grid">
                        <h6 className="col-4">
                            {`Available tickets: ${run.ticketsAvailable}`}
                        </h6>
                        <div className="col-3 col-offset-5 flex justify-content-end align-items-center">
                            <Button label="Buy tickets" onClick={() => {
                                setRunForOrder(run);
                                navigate("/order");
                            }
                            }
                            />
                        </div>
                    </div>
                }


            </div>
        </Card>
    );
};

export default RunInfo;