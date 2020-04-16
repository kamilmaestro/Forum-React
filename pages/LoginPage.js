import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {ConfirmBtn} from "../component/ConfirmBtn";
import {TransparentGoToBtn} from "../component/TransparentGoToBtn";
import {API_URL, AUTH_HEADER} from "../utils/constants";
import {disableNavbarMenu, goToScreen} from "../utils/navbarHelper";

export default class LoginPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    disableNavbarMenu(this.props.componentId);
  }

  login = (username, password) => {
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then((response) => {
        let header = response.headers.get(AUTH_HEADER);
        console.log(header);
        goToScreen(this.props.componentId, 'TopicsPage')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
        <View style={styles.mainContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.dataWindow}>
              <Text style={styles.dataText}>Username:</Text>
              <TextInput style={styles.inputData}/>
            </View>
            <View style={styles.dataWindow}>
              <Text style={styles.dataText}>Password:</Text>
              <TextInput style={styles.inputData}/>
            </View>
          </View>
          <View style={styles.centered}>
            <ConfirmBtn onPress={() => this.login('TopicsPage')}
                        content={'Login'}/>
            <TransparentGoToBtn onPress={() => goToScreen(this.props.componentId, 'RegisterPage')}
                                content={'Don\'t have an account?\nRegister here!'}/>
          </View>
        </View>
    );
  }
}

const styles =StyleSheet.create({
  mainContainer: {
    marginTop: 30,
    margin: 10
  },
  dataContainer: {
    borderWidth: 1.5,
    borderColor: '#0E7DDF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dataText: {
    fontSize: 20,
    alignSelf: 'center'
  },
  inputData: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#0E7DDF',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 18
  },
  dataWindow: {
    marginVertical: 10,
    marginHorizontal: 5
  }
});