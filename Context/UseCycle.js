import { useContext, useEffect } from 'react';
import { CycleContext } from "../Context/CycleContext";
import moment from 'moment'
import { AsyncStorage, Alert } from 'react-native';

const UseCycle = () => {
  const [state, setState] = useContext(CycleContext);
  const totalCycleDays = 4;
  const cyclePeriod = 29;
  const ideaSexDiff = 16;
  let mainCycleData = state.cycles;

  function saveFromAsyncToState() {
    if (!state.appLoadedFirstTime) {
      AsyncStorage.getItem('cycle-data').then((data) => {
        let asyncData = data;
        setTimeout(() => {
          setState(state => ({ ...state, cycles: JSON.parse(data) }));
          setState(state => ({ ...state, appLoadedFirstTime: true }));
        }, 100);

      }, (e) => {
        console.log("e: ", e);
      });
    }
  }
  saveFromAsyncToState();

  function changeSelectDateVisibility() {
    setState(state => ({ ...state, dayModalVisibilityStatus: !state.dayModalVisibilityStatus }));
  }

  function changeSettingeVisibility(e) {
    setState(state => ({ ...state, displaySettingVisibilityStatus: !state.displaySettingVisibilityStatus }));
  }

  function createEvent(eventData) {
    setState(state => ({ ...state, events: [...state.events, eventData] }));
  }

  function updateTempEvent(eventData) {
    setState(state => ({ ...state, tempEvent: eventData }));
  }
  /**
   * responsible for saving the cycle time
   */
  function setEvents(date, type) {
    if (basicCheck(date)) {
      // changeSelectDateVisibility();
      let calendarData = clearPreviousSexAndEstimateDate();
      setState(state => ({ ...state, cycles: [...calendarData, { date, type }] }));
      mainCycleData.push({ date, type });
      setTimeout(() => setIdealSexTime(date, type), 100);
    }
  }

  function setIdealSexTime(selectedDate, type) {
    let nextCycle = moment(selectedDate, "YYYY-MM-DD").add(cyclePeriod, 'days').format('YYYY-MM-DD');;
    setState(state => ({ ...state, cycles: [...state.cycles, { date: nextCycle, type: 'expected-dates' }] }));
    mainCycleData.push({ date: nextCycle, type: 'expected-dates' });

    let startSex = moment(nextCycle, "YYYY-MM-DD").subtract(ideaSexDiff, 'days').format('YYYY-MM-DD');
    setState(state => ({ ...state, cycles: [...state.cycles, { date: startSex, type: 'ideal-sex' }] }));
    mainCycleData.push({ date: startSex, type: 'ideal-sex' });

    //save in async storage
    if (mainCycleData.length > 0) {
      AsyncStorage.setItem("cycle-data", []).then(() => { }, (e) => { e });
      AsyncStorage.setItem("cycle-data", JSON.stringify(mainCycleData)).then(() => { }, (e) => { e });
    }
    AsyncStorage.setItem("cycle-data", JSON.stringify(mainCycleData)).then(() => { }, (e) => { e });
  }

  function basicCheck(selectedDate) {
    //if the day is in the future: don't allow
    let dateDiff = moment(new Date()).diff(moment(selectedDate), 'days')
    if (dateDiff < 0) {
      showDialog("Selected date can not be in the future.");
      return false;
    }
    //if the day is in the past
    if (dateDiff >= 10) {
      showDialog("Error: You could log the period dates, upto 10 days in the past.");
      return false;
    }

    //if the difference in the days is less than 20 days
    if (!checkLastCycleDayValidation(selectedDate)) {
      return false;
    }
    return true;
  }

  function clearNullData() {
    let events = state.cycles, arr = [];
    for (var i = 0; i < events.length; i++) {
      if (events[i])
        arr.push(events[i]);
    }
    return arr;
  }
  function checkLastCycleDayValidation(selectedDate) {
    //assuming last sex day is second last 
    let events = state.cycles;
    events = clearNullData();
    console.log("events", events);
    if (events.length < 2)
      return true;

    let lastCycle = lastCycleDay(events);

    let dateDiff = moment(selectedDate).diff(moment(lastCycle), 'days');
    if (dateDiff < 20) {
      showDialog(" difference between two consecutive cycles can not be less than 20 days");
      return false;
    }

    return true;
  }

  function lastCycleDay(events) {
    let date = {};
    events.map((item) => {
      if (!item || !item.type)
        return;

      if (item.type == 'dates')
        date = item.date;
    });
    return date;
  }

  function clearPreviousSexAndEstimateDate() {
    let events = state.cycles;
    let finalObj = events.filter((item) => {
      if ((item && item.type) && (item.type != 'ideal-sex' || item.type != 'expected-dates'))
        return item;
    });

    return finalObj;
  }

  function getEvents() {
    let events = state.cycles;
    let finalEvents = {};
    events.map((item) => {
      if (!item || !item.type)
        return;

      let totalCycleDays = item.type == 'ideal-sex' ? 6 : 4;
      let color = item.type == 'ideal-sex' ? state.style.color.sex : state.style.color.cycles;
      for (var i = 0; i < totalCycleDays; i++) {
        let date = moment(item.date, "YYYY-MM-DD").add(i, 'days').format('YYYY-MM-DD');

        if (i == 0) {
          finalEvents[date] = { textColor: 'black', startingDay: true, color };
        } else if (i < totalCycleDays - 1) {
          finalEvents[date] = { textColor: 'black', slected: false, endingDay: false, color }
        } else {
          finalEvents[date] = { textColor: 'black', slected: true, endingDay: true, color }
        }
      }
    });
    return finalEvents;
  }

  function showDialog(message) {
    setState(state => ({ ...state, dialog: { visibility: true, message } }));
  }

  function hideDialog() {
    setState(state => ({ ...state, dialog: { visibility: false, message: '' } }));
  }

  function deleteList(dateStr) {
    console.log(dateStr);
    let eventList = state.cycles;
    Alert.alert(
      'Delete ' + dateStr,
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            let list = eventList.map((item) => {
              if (!item || !item.date)
                return;

              if (item.date != dateStr) {
                return item;
              }
            });
            setState(state => ({ ...state, cycles: list }));
            AsyncStorage.setItem("cycle-data", JSON.stringify(list)).then(() => { }, (e) => { e });
          }
        },
      ],
      { cancelable: false },
    );
  }

  function getEventList() {
    let events = state.cycles;
    let finalList = [];
    events.map((item) => {
      if (!item || !item.type)
        return;

      if (item.type == 'dates') {
        finalList = [...finalList, { date: item.date, title: moment(item.date).format('ll'), desc: "Previous cycles started" }]
      } else if (item.type == 'expected-dates') {
        finalList = [...finalList, { date: item.date, title: moment(item.date).format('ll'), desc: "Next expected cycle" }]
      } else {
        finalList = [...finalList, { date: item.date, title: moment(item.date).format('ll'), desc: "Higher chances of getting pregnant" }]
      }

    });

    return finalList;
  }

  function clearAllData() {
    setState(state => ({ ...state, cycles: [] }));
    AsyncStorage.setItem("cycle-data", []).then(() => {

    }, (e) => {
      console.log(e)
    });
  }

  return {
    dayModalVisibilityStatus: state.dayModalVisibilityStatus,
    displaySettingVisibilityStatus: state.displaySettingVisibilityStatus,
    changeSelectDateVisibility,
    changeSettingeVisibility,
    events: getEvents(),
    createEvent,
    tempEvent: state.tempEvent,
    updateTempEvent,
    getEvents,
    setEvents,
    showDialog,
    hideDialog,
    dialogMessage: state.dialog.message,
    dialogVisibility: state.dialog.visibility,
    eventList: getEventList(),
    saveFromAsyncToState,
    clearAllData,
    deleteList
  }
};

export default UseCycle;
