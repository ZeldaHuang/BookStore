import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import { TouchableOpacity, StyleSheet, View,Text } from 'react-native'
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { sendEmailWithPassword } from '../api/auth-api'
import Toast from '../components/Toast'
import { theme } from '../core/theme'
import * as SQLiteExpo from 'expo-sqlite';
var db;

const ForgotPasswordScreen = ({ route,navigation }) => {
  const [email, setEmail] = useState({ value: route.params.phone, error: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: '', type: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [error, setError] = useState();
  const [success,setSuccess]=useState();
  const [valiCode,setValiCode]=useState('');
  const [inputCode,setInputCode]=useState({value: '', error: ''});

  const [visible, setVisible] =useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const resetPassWord=()=>{
    const passwordError = passwordValidator(password.value);
    if(passwordError){
      setPassword({ ...password, error: passwordError });
      return;
    }
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    db.transaction((tx)=>{
      let sql = "update user set password=? "+
              "where phone = ?";
              tx.executeSql(sql,[password.value,email.value],()=>{
                setSuccess('修改密码成功！');
                setTimeout(()=>{
                  navigation.goBack();
                },500);
              },(err)=>{
                  console.log(err);
              }
          );
    });
  }
  const generate=()=>{
    var res='';
    for(let i=1;i<=4;++i){

      res+=Math.ceil(Math.random()*9);
    }
    setValiCode(res);
  }
  const checkPhone=()=>{
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    db = SQLiteExpo.openDatabase('MyDb', "1.0");
    db.transaction((tx)=>{
      tx.executeSql("select * from user where phone=?", [email.value],(tx,results)=>{
        var lens = results.rows.length;
        if(lens==0){
          setError("手机号码对应的账户不存在");
        }
        else{
          generate();
          showDialog();
        }
     },(err)=>{console.log(err)});
    });
  }
  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    setLoading(true)
    const response = await sendEmailWithPassword(email.value)
    if (response.error) {
      setToast({ type: 'error', message: response.error })
    } else {
      setToast({
        type: 'success',
        message: 'Email with password has been sent.',
      })
    }
    setLoading(false)
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>BookStore</Header>
      <TextInput
        label="输入新密码"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="电话号码"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {checkPhone();}}>
          <Text style={styles.link}>发送验证码</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        label="验证码"
        value={inputCode.value}
        onChangeText={(text) => setInputCode({ value: text, error: '' })}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button
        loading={loading}
        mode="contained"
        onPress={()=>{resetPassWord()}}
        style={{ marginTop: 16 }}
      >
        重置密码
      </Button>
      <Toast type='error' message={error} onDismiss={() => setError('')} />
      <Toast type='success' message={success} onDismiss={() => setSuccess('')} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>请记住验证码</Dialog.Title>
          <Dialog.Content>
            <Paragraph>手机号{email.value}，本次验证码是{valiCode},请输入验证码</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>好的</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Background>
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignSelf:"flex-end",
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
export default ForgotPasswordScreen
