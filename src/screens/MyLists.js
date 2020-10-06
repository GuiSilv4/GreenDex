import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import BottomPage from '../components/BottomPage';
import Header from '../components/Header';
import MainContainer from '../components/MainContainer';
import PlantList from '../components/PlantList';
import ListTitle from '../components/ListTitle';
import { usePlantLists } from '../contexts/PlantLists';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';


const { height } = Dimensions.get('window');

const MyLists = () => {
  const { plantLists, cleanAllLists } = usePlantLists();

  const { data, indices } = useMemo(() => {
    const items = new Array;
    plantLists
      .filter(list => list.key != 'REMINDERS' && list.data.length)
      .map((list, listIndex) => {
        items.push({
          key: list.key,
          render: () => <ListTitle index={listIndex}>{list.name}</ListTitle>,
          isTitle: true,
        });
        items.push({
          key: "C" + listIndex,
          render: () => <PlantList data={list.data} listIndex={listIndex} />,
        });
      });
    items.push({
      key: 'Bottom',
      render: () => <View style={{ height: 50, width: 100 }} />,
    });
    const indices = new Array;
    items.forEach((item, index) => item.isTitle && indices.push(index));
    return {
      data: items,
      indices,
    };
  }, [plantLists]);

  return (
    <View style={{ flex: 1, backgroundColor: '#032021' }}>
      <Header style={styles.header}>
        <Text style={styles.headerText}> My Lists</Text>
        <TouchableOpacity onPress={cleanAllLists}
          style={{ backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, marginLeft: 20 }} />
      </Header>
      <MainContainer style={styles.mainContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => item.render()}
          keyExtractor={(item) => item.key}
          stickyHeaderIndices={indices}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 18 }}
        />
      </MainContainer>
      <BottomPage />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-start', paddingHorizontal: 0,
    height: ((height / 8) * 6) + 30,
    top: (height / 8) - 20,
  },
  header: {
    height: height / 8,
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Merriweather-Bold',
    color: '#FFF',
    fontSize: height * 0.035,
    marginTop: Platform.OS === 'ios' ? height * 0.011 : - height * 0.011
  },
});

export default MyLists;