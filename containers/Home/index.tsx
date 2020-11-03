import * as React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {
  Left,
  Body,
  Button,
  Card,
  CardItem,
  Text,
  Header,
  Input,
  Item,
} from 'native-base';
import Fuse from 'fuse.js'; // for fussy search
import moment from 'moment';
// @ts-ignore
import DateRangePicker from 'react-native-daterange-picker';

const options = {
  keys: ['title', 'author', 'url'],
};

const HomeScreen = (props: any) => {
  let interval: any;
  const [data, setData] = React.useState<any[]>([]);
  const [loading, isLoading] = React.useState<boolean>(true);
  const [loadingMore, isLoadingMore] = React.useState<boolean>(false);
  const [pageNum, setPageNum] = React.useState<number>(0);
  const [perPage, setPerPage] = React.useState<number>(10);
  const [search, setSearchText] = React.useState('');

  const [state, setState] = React.useState({
    date: null,
    startDate: null,
    endDate: null,
    displayedDate: moment(),
  });

  const setDates = (dates: any) => {
    setState((prev) => {
      return {
        ...prev,
        ...dates,
      };
    });
  };

  React.useEffect(() => {
    getDataFromServer();

    // interval = setInterval(fetchMoreData, 10000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  const getDataFromServer = () => {
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}&hitsPerPage=${perPage}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((resp: any) => {
        pageNum === 0
          ? setData([...resp.hits])
          : setData([...data, ...resp.hits]);
        isLoading(false);
        isLoadingMore(false);
      })
      .catch((err) => {
        console.log('Error while fetching from API: ', err);
        isLoading(false);
        isLoadingMore(false);
      });
  };

  const fetchMoreData = () => {
    setPageNum(pageNum + 1);
    isLoadingMore(true);
    getDataFromServer();
  };

  const renderItem = (data: any) => {
    const {title, url, author, created_at} = data.item;
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Details', {data: data.item});
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

  const onSearch = () => {
    const fuse = new Fuse(data, options);
    const searched = fuse.search(search);
    let withDate = [];
    if (state.startDate && state.endDate) {
      withDate = searched.length
        ? searched.filter((item) => {
            return (
              new Date(item.item.created_at).getTime() >=
                new Date(
                  (state.startDate || new Date()).toISOString(),
                ).getTime() &&
              new Date(item.item.created_at).getTime() <=
                new Date((state.endDate || new Date()).toISOString()).getTime()
            );
          })
        : data.filter((item) => {
            return (
              new Date(item.created_at).getTime() >=
                new Date(
                  (state.startDate || new Date()).toISOString(),
                ).getTime() &&
              new Date(item.created_at).getTime() <=
                new Date((state.endDate || new Date()).toISOString()).getTime()
            );
          });

      props.navigation.navigate('Search', {data: withDate});
    } else {
      props.navigation.navigate('Search', {data: searched});
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          // height: height,
          paddingVertical: 20,
          borderTopWidth: 5,
          borderTopColor: '#f44336',
          marginTop: 16,
          marginBottom: 16,
        }}>
        <ActivityIndicator animating size="large" color="black" />
      </View>
    );
  };

  return (
    <>
      <Header searchBar rounded>
        <Item>
          <Input
            placeholder="Search"
            onChangeText={setSearchText}
            value={search}
            onSubmitEditing={onSearch}
            returnKeyType={'search'}
          />
        </Item>
        <Button transparent onPress={onSearch}>
          <Text>Search</Text>
        </Button>
      </Header>
      <DateRangePicker
        onChange={setDates}
        date={state.date}
        endDate={state.endDate}
        startDate={state.startDate}
        displayedDate={state.displayedDate}
        range>
        <View style={{marginVertical: 8}}>
          <Text style={{textAlign: 'center'}}>Select Date</Text>
        </View>
      </DateRangePicker>
      {!loading ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.objectID.toString() + new Date().getTime().toString()
          } // encountering same object id
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.5}
          initialNumToRender={perPage}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating size="large" color="black" />
        </View>
      )}
    </>
  );
};

export default HomeScreen;
