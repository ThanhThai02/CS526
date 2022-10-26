import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Keys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      result: '',
      history: [],
    };

    this.operator = ['DEL', '+', '-', '*', '/'];
    this.numbers = [
      ['AC', '+/-', '%'],
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3],
      ['.', 0, '='],
    ];
  }

  clear() {
    this.setState((state, props) => ({ display: '' }));
  }

  calc(){
    equation = this.state.display;
    result = eval(equation);
    this.setState({result: result});
    this.state.history.push(equation + '=' + result);
  }

  clickOp(op) {
    switch (op) {
      case 'DEL':
        if (this.state.display != ' ') {
          let text = this.state.display.split('');
          text.pop();
          this.setState({ display: text.join('') });
        }
        break;
      default:
        this.setState({ display: this.state.display + op });
        break;
    }
  }

  clickNum(num) {
    switch (num) {
      case '=':
        this.calc();
        break;
      case '.':
        if (!this.state.display.includes('.'))
          this.setState({ display: this.state.display + num });
        break;
      case 'AC':
        this.clear();
        break;
      case '+/-':
        this.setState({ display: this.state.display * -1 });
        break;
      case '%':
        this.setState({ display: (this.state.display * 1) / 100 });
        break;
      default:
        this.setState({ display: this.state.display + num });
        break;
    }
  }

  render() {
    rows = [];
    cols = [];
    for (let i = 0; i < 5; i++) {
      number = [];
      for (let j = 0; j < 3; j++) {
        number.push(
          <TouchableOpacity onPress={() => this.clickNum(this.numbers[i][j])}>
            <Text style={styles.button}>{this.numbers[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View style={styles.row}> {number} </View>);
      cols.push(
        <View style={styles.col}>
          <TouchableOpacity onPress={() => this.clickOp(this.operator[i])}>
            <Text style={styles.button}>{this.operator[i]}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.containner}>
        <View style={styles.display}>
          <Text style={styles.result}> {this.state.display} </Text>
          <Text style={styles.result}> {this.state.result} </Text>
        </View>
        <View style={styles.keyboard}>
          <View styles={styles.numbers}> {rows} </View>
          <View styles={styles.oper}> {cols} </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containner: {
    width: width,
    height: height,
    flex: 1,
  },

  display: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#3a3663',
    width: '100%',
    height: '30%',
    textAlign: 'right',
  },

  result: {
    fontSize: '4em',
    color: 'yellow',
  },

  numbers: {
    flex: 3,
  },

  keyboard: {
    flexDirection: 'row',
    flexGrow: 1,
  },

  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'pink',
  },

  col: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ee6fa2',
  },

  button: {
    width: '2.6em',
    fontSize: '2em',
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: '0.4em',
  },
});
