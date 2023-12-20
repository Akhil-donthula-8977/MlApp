import React from 'react'
import {Text}from "react-native"
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export default function Details() {
  const route =useRoute()
  const params = route.params as RootStackParamList['Details'];
  return (
    <Text>{params?.productId}</Text>
  )
}
