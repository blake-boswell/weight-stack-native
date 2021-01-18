import React, {Fragment} from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';

import H3 from '../../utils/H3';
import { mutedGrey } from '../../utils/Design';
import dummyLogData from './dummyLogData';


const SessionList = ({ route, navigation }) => {

  const formatMMddYYYY = (date) => {
    if (!date) return null;

    const month = date.getMonth() + 1;
    const day = date.getDay();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const getWeekday = (date) => {
    if (!date) return null;

    const weekdays = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tues',
      3: 'Wed',
      4: 'Thurs',
      5: 'Fri',
      6: 'Sat',
    };
    const day = date.getDay();
    if (day > 6 || day < 0) return null;

    return weekdays[day];
  }

  const handleEntryPress = (session) => {
    navigation.navigate('Session', {
      headerTitle: session.title,
    });
  }


  return (
    <Fragment>
      <ScrollView style={styles.contentContainer}>
        {dummyLogData.map((entry, index) => (
          <Pressable
            onPress={() => handleEntryPress(entry)}
            key={index}
          >
            <View
              style={styles.logEntry}
            >
              <View style={styles.entryHead}>
                <H3>{entry.title}</H3>
                <Text style={{marginLeft: 'auto'}}>| Meso {entry.mesocycle}</Text>
              </View>
              <View style={styles.entryBody}>
                <Text style={styles.date}>
                  {getWeekday(entry.date)} - {formatMMddYYYY(entry.date)}
                </Text>
                <Text
                  numberOfLines={1}
                  style={styles.targetMuscles}
                >
                  {entry.targetMuscles.map((targetMuscle, index) => {
                    if (index !== entry.targetMuscles.length - 1) {
                      return `${targetMuscle}, `
                    } else {
                      return `${targetMuscle}`
                    }
                  })}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingLeft: 15,
  },
  logEntry: {
    flex: 1,
    borderBottomColor: '#6D6D6D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  entryHead: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 15,
    paddingTop: 20,
  },
  entryBody: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  date: {
    color: mutedGrey,
    // flexGrow: 1,
  },
  targetMuscles: {
    flex: 1,
    flexGrow: 2,
    paddingLeft: 10,
  },
})

export default SessionList;