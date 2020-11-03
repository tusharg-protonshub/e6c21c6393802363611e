import {Card, CardItem, Body, Left, Text, Button} from 'native-base';
import * as React from 'react';
import {FlatList, Linking, TouchableOpacity, View} from 'react-native';

const SearchScreen = (props: any) => {
  const {data} = props.route.params;

  const renderItem = (data: any) => {
    let renderItem: any;

    if (data.item) {
      if (data.item.item) {
        renderItem = {...data.item.item};
      } else {
        renderItem = {...data.item};
      }
    }

    const {title, author, url, created_at} = renderItem;

    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Details', {data: data.item.item});
        }}>
        <Card>
          <CardItem>
            <Body>
              <Text>{author}</Text>
              <Text note>{created_at}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{title}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Left>
              <Button
                transparent
                textStyle={{color: '#87838B'}}
                onPress={() => Linking.openURL(url)}>
                <Text>URL</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };

  return data && data.length ? (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) =>
        item.item
          ? item.item.objectID.toString() + new Date().getTime().toString()
          : item.objectID.toString() + new Date().getTime().toString()
      } // encountering same object id
    />
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No search results!</Text>
    </View>
  );
};

export default SearchScreen;
