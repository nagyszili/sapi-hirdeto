import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

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
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.6}
        disabled={page.current <= 0}
        onPress={() => {
          page.current = 0;
          refetch(page.current);
        }}
      >
        <Icon name="doubleLeft" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.6}
        disabled={page.current <= 0}
        onPress={() => {
          page.current = page.current - 1;
          refetch(page.current);
        }}
      >
        <Icon name="left" />
      </TouchableOpacity>

      {page.current > numPages - 3 && numPages >= 5 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current - 4;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current - 3} </Text>
        </TouchableOpacity>
      )}

      {page.current > numPages - 2 && numPages >= 4 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current - 3;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current - 2} </Text>
        </TouchableOpacity>
      )}

      {page.current >= 2 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current - 2;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current - 1} </Text>
        </TouchableOpacity>
      )}

      {page.current >= 1 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current - 1;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current} </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.active} activeOpacity={0.6}>
        <Text style={styles.activeText}> {page.current + 1} </Text>
      </TouchableOpacity>

      {page.current <= numPages - 2 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current + 1;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 2} </Text>
        </TouchableOpacity>
      )}
      {page.current <= numPages - 3 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current + 2;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 3} </Text>
        </TouchableOpacity>
      )}
      {page.current < 2 && page.current <= numPages - 4 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current + 3;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 4} </Text>
        </TouchableOpacity>
      )}

      {page.current < 1 && page.current <= numPages - 5 && (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => {
            page.current = page.current + 4;
            refetch(page.current);
          }}
        >
          <Text style={styles.text}> {page.current + 5} </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.6}
        disabled={page.current >= numberOfAds / 5 - 1}
        onPress={() => {
          page.current = page.current + 1;
          refetch(page.current);
        }}
      >
        <Icon name="right" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.6}
        disabled={page.current >= numberOfAds / 5 - 1}
        onPress={() => {
          page.current = numPages - 1;
          refetch(page.current);
        }}
      >
        <Icon name="doubleRight" />
      </TouchableOpacity>
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
    colo: 'black',
  },
  activeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
});
