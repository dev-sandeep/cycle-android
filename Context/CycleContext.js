import React, { useState } from 'react';
import moment from 'moment'

const CycleContext = React.createContext([{}, () => { }]);

const CycleContextProvider = (props) => {
    const [state, setState] = useState({
        title:'abc',
        dayModalVisibilityStatus: false,
        displaySettingVisibilityStatus: false,
        cycles: [],
        tempEvent :{},
        style: {
            color: {
                cycles: 'pink',
                sex: 'green'
            }
        },

        dialog: {
            message: 'This is dialog!',
            visibility: false
        },

        appLoadedFirstTime: false
    });

    return (
        <CycleContext.Provider value={[state, setState]}>
            {props.children}
        </CycleContext.Provider>
    );
};

export { CycleContext, CycleContextProvider };
