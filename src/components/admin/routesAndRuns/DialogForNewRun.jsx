import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import TrainChooser from "../../searching/TrainChooser";
import {Calendar} from "primereact/calendar";
import {AppContext} from "../../../context";

const DialogForNewRun = ({route, display, setDisplay, trains, wagonTypes, updateRuns}) => {

    const op = useRef(null);
    const isMounted = useRef(false);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [trainInvalid, setTrainInvalid] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [dateInvalid, setDateInvalid] = useState(false);
    const [timeInvalid, setTimeInvalid] = useState(false);
    const {serverUrl} = useContext(AppContext);
    const [formDisabled,setFormDisabled] = useState(false);

    useEffect(() => {
        if (isMounted.current){
            op.current.hide();
        }
    }, [selectedTrain])

    useEffect(() => {
        isMounted.current = true;
    }, []);

    const registerNewRun = () => {
        if (selectedTrain == null) setTrainInvalid(true);
        if (startDate == null) setDateInvalid(true);
        if (startTime == null) setTimeInvalid(true);
        if (selectedTrain != null && startTime != null && startDate != null){
            setFormDisabled(true);
            const date = startDate.getFullYear() + "-" + ((startDate.getMonth() + 1) < 10 ? "0" : "") +
                (startDate.getMonth() + 1) + "-" + (startDate.getDate() < 10 ? "0" : "") +
                startDate.getDate() + "T" +
                (startTime.getHours() < 10 ? "0" : "") + startTime.getHours() + ":" +
                (startTime.getMinutes() < 10 ? "0" : "") + startTime.getMinutes() + ":00Z";
            fetch(`${serverUrl}/api/routes/run/new/${route.id}/${selectedTrain.id}/${date}`, {
                method: "POST"
            })
                .then(response => response.json())
                .then(data => {
                    updateRuns(data.serviceResult);
                    setSelectedTrain(null);
                    setDisplay(false);
                    setStartTime(null);
                    setStartDate(null);
                });
        }
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Cancel"
                        icon="pi pi-times"
                        onClick={() => {
                            setSelectedTrain(null);
                            setDisplay(false);
                            setStartTime(null);
                            setStartDate(null);
                        }}
                        className="p-button-text"
                        disabled={formDisabled}
                />
                <Button label="Register"
                        icon="pi pi-check"
                        onClick={() => registerNewRun()}
                        disabled={formDisabled}
                />
            </div>
        )
    }

    return (
        <div>
            <Dialog onHide={() => {
                setSelectedTrain(null);
                setDisplay(false);
                setStartTime(null);
                setStartDate(null);
            }}
                    visible={display}
                    header={route &&
                        <div className="mr-3">
                            {`Register a new run for route ${route.id}`}
                        </div>}
                    position="top"
                    draggable={false}
                    footer={renderFooter()}
            >
                <div>
                    <div>
                        <div>
                            <Button type="button"
                                    label={selectedTrain
                                        ? `Train ${selectedTrain.id}`
                                        : "Select a train"}
                                    onClick={e => {
                                        setTrainInvalid(false);
                                        op.current.toggle(e);
                                    }}
                                    aria-haspopup
                                    aria-controls="train_chooser_panel"
                            />
                        </div>
                        <div>
                            {trainInvalid && <small className="p-error">Required</small>}
                        </div>
                        <OverlayPanel ref={op}
                                      showCloseIcon
                                      id="train_chooser_panel"
                        >
                            <TrainChooser trains={trains}
                                          selectedTrain={selectedTrain}
                                          setSelectedTrain={setSelectedTrain}
                                          wagonTypes={wagonTypes}
                            />
                        </OverlayPanel>
                    </div>
                    <div>
                        <h5>Select run start date-time (UTC):</h5>
                    </div>
                    <div className="mb-2">
                        <Calendar value={startDate}
                                  onChange={e => {
                                      setDateInvalid(false);
                                      setStartDate(e.value);
                                  }}
                                  dateFormat="dd.mm.yy"
                                  minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                  placeholder="Select date"
                                  inputClassName={dateInvalid ? "p-invalid" : ""}
                        />
                        <div>
                            {dateInvalid && <small className="p-error">Required</small>}
                        </div>

                    </div>
                    <div>
                        <Calendar value={startTime}
                                  onChange={e => {
                                      setTimeInvalid(false);
                                      setStartTime(e.value);
                                  }}
                                  showTime
                                  timeOnly
                                  placeholder="Select time"
                                  inputClassName={timeInvalid ? "p-invalid" : ""}
                        />
                        <div>
                            {timeInvalid && <small className="p-error">Required</small>}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DialogForNewRun;