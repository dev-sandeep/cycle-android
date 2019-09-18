import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Component/Header'
import Home from './Component/Home'
// import EventList from './Component/EventList'
import CycleList from './Component/CycleList'
import DateSelectModal from './Component/Modal/DateSelect'
import DialogBox from './Component/Dialog'
import { Provider as PaperProvider, Divider } from 'react-native-paper';
import { CycleContextProvider } from './Context/CycleContext'
// import UseCycle from './Context/UseCycle'

export default function App() {
  // const { saveFromAsyncToState } = UseCycle();
  // saveFromAsyncToState();

  return (
    <CycleContextProvider>
      <View>
        <Header />
        <Home />
        <Divider />
        <CycleList val={1} />
        {/* <EventList /> */}
        <PaperProvider>
          <DateSelectModal />
          <DialogBox />
        </PaperProvider>
      </View>
    </CycleContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
