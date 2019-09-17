import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import UseCycle from '../Context/UseCycle'

let sampleMarkedDates = {
    '2019-09-23': { startingDay: true, color: 'pink' },
    '2019-09-24': { selected: true, endingDay: true, color: 'pink', textColor: 'black' },
}

function Home() {
    const { events, updateTempEvent, setEvents } = UseCycle();
    // getDataFromAsyncStorage().then(data=>{
    //     console.log("data ", data);
    // });

    function onDayPress(day) {
        setEvents(day.dateString, 'dates');
    }

    return (
        <Calendar
            onDayPress={onDayPress}
            markedDates={events}
            markingType={'period'}
        ></Calendar>
    );
}

export default Home;