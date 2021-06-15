import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { Text } from '../components/themed/Text';
import { Icon } from '../utils/icons';
import * as Color from '../utils/theme/colors';

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
        style={styles.leftEnd}
        disabled={page.current <= 0}
        onPress={() => {
          page.current = 0;
          refetch(page.current);
        }}
      >
        <Icon name="doubleLeft" size={18} />
      </Pressable>
      <Pressable
        style={styles.item}
        disabled={page.current <= 0}
        onPress={() => {
          page.current = page.current - 1;
          refetch(page.current);
        }}
      >
        <Icon name="left" size={18} />
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
        <Icon name="right" size={18} />
      </Pressable>
      <Pressable
        style={styles.rightEnd}
        disabled={page.current >= numberOfAds / 5 - 1}
        onPress={() => {
          page.current = numPages - 1;
          refetch(page.current);
        }}
      >
        <Icon name="doubleRight" size={18} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    width: 41,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderColor: Color.greyColor,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  leftEnd: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderColor: Color.greyColor,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  rightEnd: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderColor: Color.greyColor,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  active: {
    width: 41,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primaryColor,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Color.blackColor,
  },
  activeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Color.whiteColor,
  },
});
