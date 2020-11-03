import * as React from 'react';
import {Body, Card, CardItem, Text} from 'native-base';
import {ScrollView} from 'react-native';

const DetailsScreen = (props: any) => {
  return (
    <>
      <ScrollView>
        <Card>
          <CardItem header>
            <Body>
              <Text>Details</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{JSON.stringify(props.route.params.data)}</Text>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;
