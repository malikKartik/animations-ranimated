import {AnimatePresence} from 'moti';
import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Card from '../components/Card';

const ITEMS = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
  {id: 7},
  {id: 8},
  {id: 9},
];

export default function List() {
  const [items, setItems] = useState(ITEMS);
  const [id, setId] = useState('');
  const handleButtonPress = () => {
    const temp = [...items];
    for (let i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].id, 10) === parseInt(id, 10)) {
        break;
      }
      if (parseInt(temp[i].id, 10) > parseInt(id, 10)) {
        temp.splice(i, 0, {id: parseInt(id, 10)});
        break;
      }
    }
    // if (temp[2].id === 30) {
    //   temp.splice(2, 1);
    // } else {
    //   temp.splice(2, 0, {id: 30});
    // }
    setItems(temp);
  };
  const handleDeletePress = () => {
    const temp = [...items];

    for (let i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].id, 10) === parseInt(id, 10)) {
        // temp.splice(i, 0, {id: parseInt(id, 10)});
        temp.splice(i, 1);
        break;
      }
    }
    setItems(temp);
  };

  const handleSortPress = () => {
    const temp = [...items];
    temp.sort((a, b) => {
      if (a > b) {
        return -1;
      } else {
        return 1;
      }
    });
    setItems(temp);
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center'}}>
      <TextInput
        value={id}
        onChangeText={setId}
        placeholder="Enter Id"
        style={{borderWidth: 1}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <Button onPress={handleButtonPress} title="Add card"></Button>
        <Button onPress={handleDeletePress} title="Delete card"></Button>
        <Button onPress={handleSortPress} title="Sort"></Button>
      </View>
      <AnimatePresence>
        {items.map(item => {
          return <Card key={item.id} data={item} />;
        })}
      </AnimatePresence>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
  },
});
