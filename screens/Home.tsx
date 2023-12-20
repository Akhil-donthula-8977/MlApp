import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Link, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { SafeAreaView, StyleSheet } from "react-native"
import icon from "../assets/icons8-peercoin-48.png";

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface TextProps {
  children: React.ReactNode;
  style?: object;
}

const CustomText: React.FC<TextProps> = ({ children, style }) => (
  <Text style={[{ color: 'white' }, style]}>{children}</Text>
);
const Home = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <CustomText style={styles.TopHeading}>Financo</CustomText>
          <TouchableOpacity onPress={() => navigation.navigate('Details', { productId: '123' })}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:25,textAlign:"center",margin:12,fontWeight:600}}>Get Most Accurate Results for the predictions</Text>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate('MobilePricePrediction')}>
            <View style={styles.cardBox}>
              <Image
                style={{
                  width: 51,
                  height: 51,
                  borderRadius:50
                }}
                source={{
                  uri: 'https://tse4.mm.bing.net/th?id=OIP.YoRA_XDyfzLUOG3sOU5pUwHaHa&pid=Api&P=0&h=180',
                }}
              />
              <Text style={{ fontSize: 25, textAlign: "center" }}>Predict Mobile Price</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Details', { productId: '456' })}>
            <View style={styles.cardBox}>
              <Image
                style={{
                  width: 51,
                  height: 51,
                  borderRadius:50
                }}
                source={{
                  uri: 'https://thumbs.dreamstime.com/b/medical-bill-icon-medical-bill-188698045.jpg',
                }}
              />
              <Text style={{ fontSize: 25, textAlign: "center" }}>Predict Medical Bills</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    paddingVertical:14,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 22,
    marginHorizontal: 12,
    borderRadius: 8
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredText: {
    fontSize: 30,
    width: '100%', // or replace 'full' with '100%'
    textAlign: 'center',
    padding: 20,
    color: '#e6e6e6',
  },
  TopHeading: {
    fontSize: 30,
    padding: 10,
    color: '#e6e6e6',
    fontWeight: '600',
  },
  topBar: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#4db38a',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f5',
  },
});

export default Home;
