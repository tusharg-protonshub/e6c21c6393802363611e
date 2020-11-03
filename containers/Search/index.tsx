import { Card, CardItem, Body, Left, Text, Button } from 'native-base';
import * as React from 'react';
import { FlatList, Linking, TouchableOpacity } from 'react-native';

const SearchScreen = (props: any) => {

  const {data} = props.route.params;

  const renderItem = (data: any) => {
    const {title, url, author, created_at} = data.item.item;
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

  return (
    <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.item.objectID.toString() + new Date().getTime().toString()
          } // encountering same object id
        />
  )
}

export default SearchScreen;
