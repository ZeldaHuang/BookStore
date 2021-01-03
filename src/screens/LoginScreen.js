import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View ,KeyboardAvoidingView } from 'react-native'
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
import { loginUser } from '../api/auth-api'
import Toast from '../components/Toast'
import * as SQLiteExpo from 'expo-sqlite';
var db;
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState();
  const [success,setSuccess]=useState();
  const [error, setError] = useState();
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
  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    createTable();
    db.transaction((tx)=>{
      tx.executeSql("select * from user", [],(tx,results)=>{
        var lens = results.rows.length;
        var isValid=false;
        for(let i=0; i<lens; i++){
            var u = results.rows.item(i);
            if(u.phone==email.value&&u.password==password.value){
              isValid=true;
            }
        }
        if(isValid){
          setSuccess("登录成功!");
          setTimeout(()=>{
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          },500);
        }
        else{
          setError("密码错误或账户不存在");
        }
     },(err)=>{console.log(err)});
    });
  }

  return (      
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>BookStore</Header>
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

      <View style={styles.forgotPassword}>
      <TouchableOpacity
          onPress={() => navigation.navigate('LoginWithVCode',{phone:email.value})}
        >
          <Text style={styles.forgot}>验证码登录</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft:170}}
          onPress={() => navigation.navigate('ForgotPasswordScreen',{phone:email.value})}
        >
          <Text style={styles.forgot}>忘记密码?</Text>
        </TouchableOpacity>
      </View>
      <Button loading={loading} mode="contained" onPress={onLoginPressed}>
        登录
      </Button>
      <View style={styles.row}>
        <Text>没有账号? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>点此注册</Text>
        </TouchableOpacity>
      </View>
      <Toast type='error' message={error} onDismiss={() => setError('')} />
      <Toast type='success' message={success} onDismiss={() => setSuccess('')} />
    </Background>
    
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width:"100%",
    marginBottom: 24,
    flexDirection:"row",
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default LoginScreen
