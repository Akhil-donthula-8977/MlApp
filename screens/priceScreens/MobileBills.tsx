import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
type MobilePriceProps = NativeStackScreenProps<RootStackParamList, 'MobilePricePrediction'>;
const columns = [
  'battery_power', 'blue', 'clock_speed', 'dual_sim', 'fc', 'four_g',
  'int_memory', 'm_dep', 'mobile_wt', 'n_cores', 'pc', 'px_height',
  'px_width', 'ram', 'sc_h', 'sc_w', 'talk_time', 'three_g',
  'touch_screen', 'wifi'
];

async function submitControl(data: Record<string, string>): Promise<Object> {
  try {
    console.log(data)
    const response = await fetch("http://10.0.2.2:5000/predict/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
   
    const result = await response.json();
    console.log(result)
    return { name: "hello" };
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}

export default function MobileBills({ navigation }: MobilePriceProps) {
  const formSchema = Yup.object().shape(
    columns.reduce((schema, column) => {
      schema[column] = Yup.string().required(`Required for ${column}`);
      return schema;
    }, {} as Record<string, Yup.StringSchema<string>>)
  );
  return (
    <View>
      <View>
        <Formik
          initialValues={columns.reduce((initialValues, column) => {
            initialValues[column] = '';
            return initialValues;
          }, {} as Record<string, string>)}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            //console.log(values);
            const ans=await submitControl(values);
            console.log(ans)
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
            setFieldTouched,
          }) => (
            <>
              <ScrollView>
                {columns.map((column) => (
                  <View key={column}>
                    <Text style={styles.inputsHeading}>Enter {column}:</Text>
                    {errors[column] && touched[column] ? (
                      <Text style={styles.errorMessage}>{errors[column]}</Text>
                    ) : null}
                    <View style={styles.textOuterFlex}>
                      <TextInput
                        style={styles.textBox}
                        value={values[column]}
                        onChangeText={handleChange(column)}
                        placeholder={`Enter ${column}`}
                        keyboardType="numeric"
                        onBlur={() => {
                          if (!values[column]) {
                            setFieldTouched(column);
                          }
                        }}
                      />
                    </View>
                  </View>
                ))}
                <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                  <TouchableOpacity
                  style={styles.SubmitButton}
                    disabled={!isValid}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={{textAlign:"center"}}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                     style={styles.SubmitButton}
                  onPress={() => handleReset()}>
                    <Text style={{textAlign:"center"}}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textBox: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'black',
    marginVertical: 5,
    width: '90%',
    padding: 10,
  },
  textOuterFlex: {
    flex: 1,
    alignItems: 'center',
  },
  inputsHeading: {
    fontSize: 18,
    margin: 5,
    marginLeft: 18,
  },
  errorMessage: {
    margin: 5,
    marginLeft: 18,
    color: 'red',
  },
  SubmitButton:{
    borderWidth:1,
    width:"20%",
    padding:8,
    margin:5,
    marginLeft:70,
    borderRadius:20,
    
  }
});
