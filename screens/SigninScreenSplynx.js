import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CommonActions } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/context';
import { connect } from 'react-redux';
import { addInfo,deleteInfo } from '../src/actions/infos';


const SignInScreenSplynx  = (props,{navigation})  => { //extends componenet add

    const [data, setData] = React.useState({
        username: '',
        password: '',
        authtoken: '',
        authtokenID: '',
        dataall: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    function  processResponse(response) {
        const statusCode = response.status;
        console.log(statusCode)
        const xauth = response.headers.get("x-auth-token");
        const data1 =  response.json();
        return  Promise.all([statusCode, data1,xauth]).then(res => ({
          statusCode: res[0],
          data1: res[1],
          xauth: res[2]
        }));
      }
      //const [dtas, setDtas] = useState([]);
      
      //const dta;
    
    const loginHandle = async(userName, passWord) => {
        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        //console.log(userName + " " + passWord)
        var request = new XMLHttpRequest();

        request.open('POST', 'https://radius.khulatechsolutions.co.za/api/2.0/admin/auth/tokens');
        
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.onreadystatechange = async () =>{
          if (request.readyState === 4) {
            console.log('Status:', request.status);
            console.log('Headers:', request.getAllResponseHeaders());
            console.log('Body:', request.responseText);
            var obj = JSON.parse(request.responseText);
            //console.log('Body   hhhh:', obj["access_token"]);
            if(request.status ==201)
            {
                try {
                    body = request.responseText
                    await AsyncStorage.setItem('splynxtoken', obj["access_token"]);
                    await AsyncStorage.setItem('refresh_token', obj["refresh_token"]);
                    await AsyncStorage.setItem('expiration', stringify(obj["access_token_expiration"]));
                  } catch(e) {
                    console.log(e);
                  } 
                 props.navigation.navigate('SignInScreen')   
                  
            }
            else {
                Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
                ]);
                return;
            }
          }
        };
        
        var body = {
          'auth_type': 'admin',
          'login': userName,
          'password': passWord
        };
        
        request.send(JSON.stringify(body));
               
    } 
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#129ed9' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome  spl!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            
          
            <TouchableOpacity>
                <Text style={{color: '#129ed9', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
                <LinearGradient
                    colors={['#129ed9', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
                

};

const mapStateToProps = (state) => {
    console.log(state);
    return {
      //infos: state.appReducer.infoList
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
     //delete: () => dispatch(deleteInfo()),
    /*  add: (id1,email1,username1,firstname1,secondname1,
        password1, userToken1,userToken1id) => dispatch(addInfo(id1,email1,username1,firstname1,secondname1,
            password1, userToken1,userToken1id))
    */

    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreenSplynx);

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#129ed9'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
