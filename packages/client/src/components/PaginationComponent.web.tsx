import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { Text } from '../components/themed/Text';
import { Icon } from '../utils/icons';

interface Props {
  numberOfAds: number;
  refetch: (page?: number, perPage?: number) => void;
  page: React.MutableRefObject<number>;
  adsPerPage: number;
}

export const PaginationComponent: React.FC<Props> = ({
  numberOfAds,
  page,
  refetch,
  adsPerPage,
}) => {
  const numPages = Math.ceil(numberOfAds / adsPerPage);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.item}
        disabled={page.current <= 0}
        onPress={() => {
          page.current = 0;
          refetch(page.current);
        }}
      >
        <Icon name="doubleLeft" />
      </Pressable>
      <Pressable
        style={styles.item}
        disabled={page.current <= 0}
        onPress={() => {
          page.current = page.current - 1;
          refetch(page.current);
        }}
      >
        <Icon name="left" />
      </Pressable>

      {page.current - 2 > 0 && (
        <Pressable style={styles.item} onPress={() => {}}>
          <Text style={styles.text}> ... </Text>
        </Pressable>
      )}

      {page.current > numPages - 3 && numPages >= 5 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current - 4;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current - 3} </Text>
        </Pressable>
      )}

      {page.current > numPages - 2 && numPages >= 4 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current - 3;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current - 2} </Text>
        </Pressable>
      )}

      {page.current >= 2 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current - 2;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current - 1} </Text>
        </Pressable>
      )}

      {page.current >= 1 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current - 1;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current} </Text>
        </Pressable>
      )}

      <Pressable style={styles.active}>
        <Text style={styles.activeText}> {page.current + 1} </Text>
      </Pressable>

      {page.current <= numPages - 2 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current + 1;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 2} </Text>
        </Pressable>
      )}
      {page.current <= numPages - 3 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current + 2;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 3} </Text>
        </Pressable>
      )}
      {page.current < 2 && page.current <= numPages - 4 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current + 3;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 4} </Text>
        </Pressable>
      )}

      {page.current < 1 && page.current <= numPages - 5 && (
        <Pressable
          style={styles.item}
          onPress={() => {
            page.current = page.current + 4;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 5} </Text>
        </Pressable>
      )}

      {numPages - page.current > 3 && (
        <Pressable style={styles.item} onPress={() => {}}>
          <Text style={styles.text}> ... </Text>
        </Pressable>
      )}

      <Pressable
        style={styles.item}
        disabled={page.current >= numberOfAds / 5 - 1}
        onPress={() => {
          page.current = page.current + 1;
          refetch(page.current);
        }}
      >
        <Icon name="right" />
      </Pressable>
      <Pressable
        style={styles.item}
        disabled={page.current >= numberOfAds / 5 - 1}
        onPress={() => {
          page.current = numPages - 1;
          refetch(page.current);
        }}
      >
        <Icon name="doubleRight" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: 'gray',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  active: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: 'gray',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
  activeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
});
