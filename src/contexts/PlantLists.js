import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import RNCalendarEvents from "react-native-calendar-events";
import { setDay, format, getHours, getMinutes } from 'date-fns';
import { Platform } from 'react-native';

const PlantListsContext = createContext({
});

const AppName = 'GreenDex';

export const PlantListsProvider = (props) => {

  const initialLists = [
    {
      key: 'MY_PLANTS',
      name: 'My Plants',
      data: []
    },
    {
      key: 'WANNA_CATCH',
      name: 'Wanna Catch',
      data: []
    },
    {
      key: 'WANT_TO_STUDY',
      name: 'Want to Study',
      data: []
    },
    {
      key: 'REMINDERS',
      name: 'Reminders',
      data: []
    },
  ]
  const [plantLists, setPlantLists] = useState(initialLists);
  const [remindersList, setRemindersList] = useState([]);
  const [bestWeekDay, setBestWeekDay] = useState(1);
  const [bestDayHour, setBestDayHour] = useState(20);
  const [greenDexCalendarId, setGreenDexCalendarId] = useState("0");
  const [hasCalendarPermission, setHasCalendarPermission] = useState(false);

  const loadStorageData = async () => {
    const storagePlantLists = await AsyncStorage.getItem(`@${AppName}:plantLists`);
    //const storageCalendarId = await AsyncStorage.getItem(`@${AppName}:calendarId`);

    //if (storageCalendarId)
    //setGreenDexCalendarId(JSON.parse(storageCalendarId));

    if (storagePlantLists) {
      setPlantLists(JSON.parse(storagePlantLists));
    }
  };

  useEffect(() => {
    loadStorageData();
    //console.log('1', hasCalendarPermission);
  }, []);

  useEffect(() => {
    //console.log('2: ', hasCalendarPermission);
    createCalendar();
  }, [hasCalendarPermission]);

  useEffect(() => {
    //console.log('3: ', greenDexCalendarId);
    loadReminders(365);
  }, [greenDexCalendarId]);

  const setBestDayHourFunction = (param) => {
    if (isNaN(param)) {
      return;
    }
    setBestDayHour(param);
  };

  const getNewWeekDayDate = (weekDay) => {

    const weekStartsOn = weekDay < 6 ? weekDay + 1 : 0;
    return setDay(new Date(), weekDay, { weekStartsOn });
  };

  const setEventWeekDay = async (event, newWeekDay) => {

    //console.log(event.title, newWeekDay)

    const d = getNewWeekDayDate(newWeekDay);
    const hour = new Date(event.startDate);

    const startDate = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      getHours(hour),
      getMinutes(hour),
      0, 0

    );

    const endDate = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      getHours(hour) + 1,
      getMinutes(hour),
      0, 0
    );

    await saveEvent(event.title, startDate, endDate, event.id);

  };

  const setEventHour = async (event, newHour) => {

    const eventStarDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);

    let startDate = new Date(
      eventStarDate.getFullYear(),
      eventStarDate.getMonth(),
      eventStarDate.getDate(),
      getHours(newHour),
      getMinutes(newHour),
      0, 0

    );

    let endDate = new Date(
      eventEndDate.getFullYear(),
      eventEndDate.getMonth(),
      eventEndDate.getDate(),
      getHours(newHour) + 1,
      getMinutes(newHour),
      0, 0
    );

    await saveEvent(event.title, startDate, endDate, event.id);

  };

  const setBestWeekDayFunction = (param) => {
    if (isNaN(param)
      || param < 0
      || param > 6) {
      return;
    }
    setBestWeekDay(param);
  };

  const loadReminders = async (days) => {

    if (!hasCalendarPermission) {
      return null;
    }

    if (greenDexCalendarId !== '0') {
      const date = new Date();

      await RNCalendarEvents.fetchAllEvents(
        (date.getTime() - 2 * 24 * 60 * 60 * 1000),
        (date.getTime() + days * 24 * 60 * 60 * 1000),
        [greenDexCalendarId])
        .then(
          (result) => {
            const reminders = result.filter((reminder, index, self) => {
              return index === self.findIndex(t => (
                t.id === reminder.id
              ));
            });
            setRemindersList(reminders);
          }
        );
    }
  };

  const deleteEvent = async ({ id, startDate }) => {

    await RNCalendarEvents.removeEvent(id, {
      exceptionDate: startDate,
      futureEvents: true
    });

    if (Platform.OS === 'android') {
      await RNCalendarEvents.removeEvent(id);
    };

    loadReminders(365);
  }

  const saveEvent = async (title, startDate, endDate, id = null) => {

    if (Platform.OS === 'ios') {
      startDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      endDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    } else {
      startDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
      endDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    };

    let details = {
      calendarId: greenDexCalendarId,
      title,
      startDate,
      recurrenceRule: {
        frequency: 'weekly',
        occurrence: 52,
      },
      alarms: [{
        date: Plataform.OS === 'ios' ? -5 : 5
      }],
      notes: title
    };

    if (Platform.OS === 'ios') {
      details = { ...details, endDate };
    }

    if (id !== null) {
      details = { ...details, id };
    }

    await RNCalendarEvents.saveEvent(title, details).then(
      result => { }, //console.log('sucesso', result)
      result => { }, //console.log('erro 2', result)
    );

    /*     RNCalendarEvents.saveEvent('Title of event', {
          calendarId: greenDexCalendarId,
          startDate: '2020-08-19T19:26:00.000Z',
          recurrenceRule: {
            frequency: 'weekly',
            occurrence: 52
          },
          notes: title
        }).then(
          result => console.log('sucesso', result),
          result => console.log('erro 2', result),
        ); */

    loadReminders(365);
  }

  const createEvent = async (item) => {

    const title = "Watering " + item.name;
    const d = getNewWeekDayDate(bestWeekDay);

    let startDate = new Date(
      d.getFullYear(), d.getMonth(), d.getDate(), bestDayHour, 0, 0, 0
    );

    let endDate = new Date(
      d.getFullYear(), d.getMonth(), d.getDate(), bestDayHour + 1, 0, 0, 0
    );

    await saveEvent(title, startDate, endDate);
  }

  const setCalendarId = async (id) => {
    setGreenDexCalendarId(id);
  }

  const requestCalendarPermission = async () => {
    await RNCalendarEvents.requestPermissions().then(
      (result) => {
        if (result === 'authorized') {
          setHasCalendarPermission(true);
        } else {
          setHasCalendarPermission(false);
        }
      },
      (result) => {
        console.error(result);
      },
    );
  }

  const createCalendar = async () => {

    if (hasCalendarPermission) {
      await RNCalendarEvents.findCalendars().then(
        (result) => {
          const hasGreenDexCalendar = result.some((calendar) => {
            return calendar.title === 'GreenDex'
          });

          if (!hasGreenDexCalendar) {
            RNCalendarEvents.saveCalendar(
              {
                title: "GreenDex",
                color: "#14494d",
                entityType: "event",
                name: "GreenDex",
                accessLevel: "owner",
                ownerAccount: 'greendex@gmail.com',
                source: {
                  name: 'GreenDex',
                  isLocalAccount: true
                }
              }
            ).then(saveCalendarResultId => setCalendarId(saveCalendarResultId));
          } else {
            const { id } = result.find(calendar => calendar.title === 'GreenDex');
            setCalendarId(id);
          };
        }
      );
    }
  };

  const addPlantToLists = async (item, listsIndex) => {

    listsIndex
      .filter(item => item !== 3)
      .map(async (listIndex) => {
        let include = false;

        plantLists[listIndex].data.map((plant) => {
          if (plant.id === item.id) {
            include = true;
          };
        });

        if (!include) {
          const newArray = [...plantLists];
          newArray[listIndex].data.push(item);
          setPlantLists(newArray);

          await AsyncStorage.setItem(
            `@${AppName}:plantLists`,
            JSON.stringify(newArray)
          );
        };
      });

    if (listsIndex.includes(3)) {
      createEvent(item);
    };
  };

  const removePlantFromList = async (item, listIndex) => {
    const index = plantLists[listIndex].data.indexOf(item);
    if (index > -1) {
      const newArray = [...plantLists];
      newArray[listIndex].data.splice(index, 1);
      setPlantLists(newArray);
      await AsyncStorage.setItem(
        `@${AppName}:plantLists`,
        JSON.stringify(newArray),
      );
    }
  }

  const cleanAllLists = async () => {
    setPlantLists(initialLists);
    await AsyncStorage.setItem(
      `@${AppName}:plantLists`,
      JSON.stringify(initialLists),
    );
  }

  return (
    <PlantListsContext.Provider
      value={{
        remindersList,
        plantLists,
        hasCalendarPermission,
        bestWeekDay,
        bestDayHour,
        requestCalendarPermission,
        addPlantToLists,
        removePlantFromList,
        cleanAllLists,
        deleteEvent,
        setBestDayHourFunction,
        setBestWeekDayFunction,
        setEventHour,
        setEventWeekDay
      }}>{
        props.children}
    </PlantListsContext.Provider>
  );
}

export function usePlantLists() {
  const context = useContext(PlantListsContext);
  return context;
}