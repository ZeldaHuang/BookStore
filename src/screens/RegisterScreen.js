import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { signInUser } from '../api/auth-api'
import Toast from '../components/Toast'
import * as SQLiteExpo from 'expo-sqlite';
var db;

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const createTable=()=>{
    db.transaction((tx)=> {
      tx.executeSql('CREATE TABLE IF NOT EXISTS USER(' +
          'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
          'name varchar not null,'+
          'phone varchar not null unique,'+
          'password VARCHAR not null)'
          , [], ()=> {
              console.log('executeSql');
          }, (err)=> {
            console.log('executeSql'+err);
          });
    }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
      console.log('create'+ err);
    }, ()=> {
      console.log('create');
    })
  }
  const insertData=(userData)=>{
    var len=userData.length;
    db.transaction((tx)=>{
      for(let i=0; i<len; i++){
          var user = userData[i];
          let password=user.password;
          let phone = user.phone;
          let name=user.name;
          let sql = "INSERT INTO user(phone,password,name)"+
              "values(?,?,?)";
          tx.executeSql(sql,[phone,password,name],()=>{
              },(err)=>{
                  console.log(err);
              }
          );
      }
    },(error)=>{
      console.log('transaction'+error);
    },()=>{
      console.log('transaction insert data');
    });
  }
  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    var userData=[];
    var user={};
    user.phone=email.value;
    user.password=password.value;
    user.name=name.value;
    userData.push(user);
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    createTable();
    db.transaction((tx)=>{
      tx.executeSql("select * from user", [],(tx,results)=>{
        var lens = results.rows.length;
        var isValid=true;
        for(let i=0; i<lens; i++){
            var u = results.rows.item(i);
            if(u.phone==user.phone){
              setError("电话号码已被占用");
              isValid=false;
            }
        }
        if(isValid){
          insertData(userData);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          });
        }
     },(err)=>{console.log(err)});
    });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>注册界面</Header>
      <TextInput
        label="昵称"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="电话号码"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="密码"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        loading={loading}
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        注册
      </Button>
      <View style={styles.row}>
        <Text>已有账号? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>点此登录</Text>
        </TouchableOpacity>
      </View>
      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default RegisterScreen
