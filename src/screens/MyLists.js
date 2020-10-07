import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
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
      .filter(list => list.key !== 'REMINDERS')
      .map((list, listIndex) => {
        if (list.data.length) {
          items.push({
            key: list.key,
            render: () => <ListTitle index={listIndex}>{list.name}</ListTitle>,
            isTitle: true,
          });
          items.push({
            key: "C" + listIndex,
            render: () => <PlantList listIndex={listIndex} />,
          });
        }
      });

    items.push({
      key: 'Bottom',
      render: () => <View style={{ height: 100, width: 100 }} />,
    });

    const indices = new Array;
    items.forEach((item, index) => item.isTitle && indices.push(index));

    return {
      data: items,
      indices,
    };

  }, [plantLists]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f2f7' }}>
      <Header style={styles.header}>
        <Text style={styles.headerText}> My Lists</Text>
        <TouchableOpacity onPress={cleanAllLists}
          style={{ backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, marginLeft: 20 }} />
      </Header>
      <MainContainer style={styles.mainContainer}>
        <ScrollView
          stickyHeaderIndices={indices}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 18 }}
        >
          {data.map((item) => (<View key={item.key}>{item.render()}</View>))}
        </ScrollView>
      </MainContainer>
      <BottomPage />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-start', paddingHorizontal: 0,
    height: ((height / 8) * 6) + 70,
    top: (height / 8),
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