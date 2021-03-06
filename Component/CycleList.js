import * as React from 'react';
import UseCycle from '../Context/UseCycle'
import ListItem from '../Component/ListItem'

function CycleList() {
    const { eventList } = UseCycle();
  
    return (
        <>
            {eventList.map((item, index) => (
                <ListItem key={index} date={item.date} title={item.title} desc={item.desc} />
            ))}
        </>
    );
}

export default CycleList;

