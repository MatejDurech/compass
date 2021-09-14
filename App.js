import React, {Component} from "react";
import { StyleSheet, Text, Image, View, SafeAreaView, transform, rotate} from "react-native";
import {Magnetometer} from "expo-sensors";


export default class MagnetometerSensor extends React.Component {
  state = {
    MagnetometerData: {},
  };

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };


  _subscribe = () => {
    this._subscription = Magnetometer.addListener(result => {
      this.setState({ MagnetometerData: result });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  _angle = magnetometer => {
    let angle = 0;
    if (magnetometer) {
      let {x, y} = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) - 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  _degree = magnetometer => {
    return magnetometer - 90 >= 0
      ? magnetometer - 90
      : magnetometer + 271;
  };


  render() {
    return (
        <View style={styles.sensor}>
          <View style={styles.img}>
         </View>
          <View style={styles.img}>
          <Image source={require('./assets/compass.png')}
          style={{width: 300, height: 300, transform:[{rotate:360 - this._degree(this._angle(this.state.MagnetometerData)) + "deg"}] }} />
         </View>
         <SafeAreaView style={styles.mgt}>
           {this._degree(this._angle(this.state.MagnetometerData)) > 0 ?(
          <Text>{this._degree(this._angle(this.state.MagnetometerData)) }</Text>
           ) : (
            <Text>{-1 * this._degree(this._angle(this.state.MagnetometerData)) }</Text>
           )
          }
          <Text>
          </Text>
          </SafeAreaView>
        </View>
    )
  }
}
  const styles = StyleSheet.create({
    img: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mgt: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    sensor: {
      flex: 1,
      flexDirection: "column",
    },
  });
