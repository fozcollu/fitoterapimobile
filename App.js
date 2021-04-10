import React, { useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  StatusBar
} from 'react-native';
import { data } from './data';

const YourApp = () => {
  const [mainCategory, setMainCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight || 20
      }}
    >
      {!mainCategory && (
        <MainCategories
          handleSelect={(selectedMainCategory) => {
            setMainCategory(selectedMainCategory);
          }}
        />
      )}
      {mainCategory && !subCategory && (
        <SubCategories
          mainCategory={mainCategory}
          handleSelect={(selectedSubCategory) => {
            setSubCategory(selectedSubCategory);
          }}
          goBack={() => setMainCategory(undefined)}
        />
      )}
      {subCategory && (
        <Products
          subCategory={subCategory}
          goBack={() => setSubCategory(undefined)}
        />
      )}
    </View>
  );
};

//render item for Main-sub category
const Item = ({ title, onPress }) => (
  <View style={styles.item}>
    <Text onPress={() => onPress && onPress(title)} style={styles.title}>
      {title}
    </Text>
  </View>
);

//Header
const Header = ({ title, goBack }) => {
  return (
    <View
      style={{
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#eee',
        alignItems: 'center',
        backgroundColor: '#bab86c',
        paddingLeft: 10,
        paddingRight: 10
      }}
    >
      {goBack ? (
        <Text style={{ color: '#eee', fontSize: 20 }} onPress={() => goBack()}>
          geri
        </Text>
      ) : (
        <Text></Text>
      )}
      <Text style={{ color: '#eee', fontSize: 25 }}>{title}</Text>
      <Text></Text>
    </View>
  );
};

//Main Category Select Component
const MainCategories = ({ handleSelect }) => {
  const mainCategories = useMemo(() => {
    const list = data.map((x) => x.mainCategory);
    const uniqueList = [...new Set(list)];
    return uniqueList;
  }, []);

  return (
    <View style={styles.container}>
      <Header title="ANA HASTALIK BRANŞI" />
      <FlatList
        data={mainCategories}
        renderItem={({ item }) => (
          <Item
            onPress={() => {
              handleSelect(item);
            }}
            title={item}
          />
        )}
      />
    </View>
  );
};

//Sub-Category Select Component
const SubCategories = ({ handleSelect, mainCategory, goBack }) => {
  const subCategories = useMemo(() => {
    const list = data
      .filter((x) => x.mainCategory === mainCategory)
      .map((x) => x.subCategory);
    const uniqueList = [...new Set(list)];
    return uniqueList;
  }, [mainCategory]);

  return (
    <View style={styles.container}>
      <Header title="RAHATSIZLIK ÇEŞİDİ" goBack={goBack} />
      <FlatList
        data={subCategories}
        renderItem={({ item }) => (
          <Item
            onPress={() => {
              handleSelect(item);
            }}
            title={item}
          />
        )}
      />
    </View>
  );
};

const Products = ({ goBack, reset, subCategory }) => {
  const products = useMemo(() => {
    const list = data
      .filter((x) => x.subCategory === subCategory)
      .map((x) => x.products)[0];

    return list.split(',');
  }, [subCategory]);

  const benefits = useMemo(() => {
    return data
      .filter((x) => x.subCategory === subCategory)
      .map((x) => x.productBenefits)[0];
  }, [subCategory]);

  const howToUse = useMemo(() => {
    return data
      .filter((x) => x.subCategory === subCategory)
      .map((x) => x.howToUse)[0];
  }, [subCategory]);

  return (
    <View style={styles.container}>
      <Header title="ÖNERİLEN ÜRÜNLER" reset={reset} goBack={goBack} />

      <ScrollView style={{ padding: 10 }}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Text style={{ padding: 5, fontSize: 25 }}>
              {' '}
              <Text style={{ fontSize: 40 }}>.</Text> {item}{' '}
            </Text>
          )}
        />
        <Text
          style={{
            fontSize: 25,
            marginTop: 30,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            color: '#bab86c'
          }}
        >
          Ürünlerin Faydaları{' '}
        </Text>
        <Text style={{ fontSize: 18 }}>{benefits} </Text>
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            color: '#bab86c'
          }}
        >
          Ürünler nasıl kullanılmalı ?{' '}
        </Text>
        <Text style={{ fontSize: 18 }}>{howToUse} </Text>
      </ScrollView>
    </View>
  );
};

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  title: {
    fontSize: 22
  }
});

export default YourApp;
