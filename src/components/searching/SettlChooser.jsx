import React, {useContext, useState} from 'react';
import {AutoComplete} from "primereact/autocomplete";
import {AppContext} from "../../context";

const SettlChooser = ({selectedSettl, setSelectedSettl, placeholder, invalid, setInvalid}) => {
    const {serverUrl} = useContext(AppContext);
    const [settlements, setSettlements] = useState([]);
    const [filteredSettls, setFilteredSettls] = useState([]);
    const [settlName, setSettlName] = useState('');

    const fetchSettls = (name) => {
        fetch(serverUrl + "/api/geography/public/settlement/all/" + name)
            .then(response => response.json())
            .then(data => setSettlements(data.serviceResult));
    }

    const searchSettl = (event) => {
        setSelectedSettl(null);
        setInvalid(false);
        if (event.query.length < 2 && settlements.length > 0) setSettlements([]);
        else if (event.query.length === 2 && settlements.length === 0) fetchSettls(event.query);
        setFilteredSettls(settlements.filter(settl => settl.name.toLowerCase()
            .startsWith(event.query.toLowerCase())));
    }

    const itemTemplate = (item) => {
        return (
            <div>
                <div>
                    {item.name}
                </div>
                <small className="ml-2">
                    {item.region.name}, {item.region.country.name}
                </small>
            </div>)
    }

    const blur = () => {
      if (selectedSettl == null){
          if (settlements.length !== 0) {
              setSelectedSettl(filteredSettls[0]);
              setSettlName(filteredSettls[0].name);
          }
      }
    }

    return (
        <div>
            <AutoComplete value={settlName}
                          suggestions={filteredSettls}
                          completeMethod={searchSettl}
                          field="name"
                          onChange={e => setSettlName(e.value)}
                          onBlur={blur}
                          itemTemplate={itemTemplate}
                          delay={1}
                          onSelect={e => setSelectedSettl(e.value)}
                          placeholder={placeholder}
                          className="w-full"
                          inputClassName={invalid ? "w-full p-invalid" : "w-full"}
            />
            {invalid && <small className="p-error">Choose a settlement</small>}
        </div>

    );
};

export default SettlChooser;