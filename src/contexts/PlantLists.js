import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const PlantListsContext = createContext({
});

const AppName = 'GreenDex';

export const PlantListsProvider = (props) => {

  const lists = [
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

  const [plantLists, setPlantLists] = useState(lists);

  async function loadStorageData() {
    const storagePlatLists = await AsyncStorage.getItem(`@${AppName}:plantLists`);

    if (storagePlatLists) {
      setPlantLists(JSON.parse(storagePlatLists));
    }
  }

  useEffect(() => {
    loadStorageData();
  }, []);


  const addPlantToLists = async (item, listsIndex) => {
    await listsIndex.map(async (listIndex) => {
      if (!plantLists[listIndex].data.id === item.id) {
        console.log(listIndex, plantLists[listIndex].data);
        console.log(item);
        const newArray = [...plantLists];
        newArray[listIndex].data.push(item);
        setPlantLists(newArray);

        await AsyncStorage.setItem(
          `@${AppName}:plantLists`,
          JSON.stringify(newArray),
        );
      };
    })
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
    setPlantLists(lists);
    await AsyncStorage.setItem(
      `@${AppName}:plantLists`,
      JSON.stringify(lists),
    );
  }

  return (
    <PlantListsContext.Provider
      value={{ addPlantToLists, plantLists, removePlantFromList, cleanAllLists }}>{
        props.children}
    </PlantListsContext.Provider>
  );
}

export function usePlantLists() {
  const context = useContext(PlantListsContext);
  return context;
}