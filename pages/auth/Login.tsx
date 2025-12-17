import ButtonForm from 'components/form/ButtonForm';
import InputFormHook from 'components/form/InputFormHook';
import TextInfo from 'components/typografy/TextInfo';
import Title from 'components/typografy/Title';
import { View } from 'react-native';
import BoxImage from 'components/container/BoxImage';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schemaLoginFormValidate, { schemaLoginFormValidateType } from 'helpers/validatesForm/schemaLoginFormValidate';
import { NavigationService } from 'helpers/navigator/navigationScreens'; 
import FormAdaptiveKeyBoard from 'components/container/FormAdaptiveKeyBoard';
import { AJAX, URLPIOAPP } from 'helpers/http/ajax';
import { ResponseService, generateJsonError } from 'types/RequestType';
import { useEffect, useState } from 'react';
import alertsState from 'helpers/states/alertsState';
import { getValueStorage, setValueStorage } from 'helpers/store/storeApp';
import CheckBoxForm from 'components/form/CheckBoxForm';
import SurfaceTapButton from 'components/container/SurfaceTapButton';
import { isDeviceReal, uniqueIdDevice } from 'helpers/Device/DeviceHelper';
import { generateTokenNotificationPush, notificationPermissionGranted } from 'helpers/Notification/NotificationPushHelper';

export default function Login() {

  const [idDevice, setIdDevice] = useState<string|null>(null)
  const [exponentPushToken, setExponentPushToken] = useState<string|null>(null);
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const { openVisibleSnackBar } = alertsState()
  const [ loadingLogin, setLoadingLogin ] = useState<boolean>(false)

  const validLogin = async(data: schemaLoginFormValidateType) : Promise<ResponseService> => {
    try {
      const result:ResponseService = await AJAX(`${ URLPIOAPP }/auth/login`, 'POST', {
        ...data,
        ...(idDevice && exponentPushToken ? { 
          id_unique_device: idDevice,
          exponent_push_token: exponentPushToken
        } : {})
      })
      return result
    } catch (error:any) {
      openVisibleSnackBar(`${ error }`, 'error')
      return generateJsonError(error)
    }
  }

  const { control, handleSubmit, formState: { errors }, resetField } = useForm({
    resolver: yupResolver(schemaLoginFormValidate),
    mode: 'all'
  })

  const submitFormLogin = async(data: schemaLoginFormValidateType) => {
    setLoadingLogin(true)
    const login = await validLogin(data)
    setLoadingLogin(false)
    login.status && NavigationService.reset('Home')
    login.status && setValueStorage('user', login.data)
    if(login.status && data.recordar_btn) setValueStorage('credentialsLogin', { user: data.codigo })
  }

  const onChangeCheckBoxRemember = (value:boolean) => {
    setValueStorage('rememberCredentials', { value })
  }

  const validRememberCredentials = () => {
    const valueStore = getValueStorage('rememberCredentials')
    const value = valueStore?.value || false
    resetField('recordar_btn', { defaultValue: value })
    if(!value) return
    const valueStoreUser = getValueStorage('credentialsLogin')
    const user = valueStoreUser?.user || ''
    resetField('codigo', { defaultValue: user }) 
  }

  //token de dispositivo para notificaciones push
  const generateTokenFCM = async () => {
    try {
      //validar si el dispositivo es fisico y no es un emulador
      const isDevice:boolean = isDeviceReal()
      if(!isDevice) return openVisibleSnackBar(`Ooops no se puede recibir notificacion porque estas en un emulador.`, 'warning')
      //validar permisos para las notificaciones
      const resultNotification:boolean = await notificationPermissionGranted()
      if(!resultNotification) return
      //generar token de notificaciones push
      const tokenPushNotification = await generateTokenNotificationPush()
      //obtener el id unico de dispositivo
      const idUniqueDispositivo = await uniqueIdDevice()
      //setear estados
      setIdDevice(idUniqueDispositivo)
      setExponentPushToken(tokenPushNotification)
      //debug
      console.log(tokenPushNotification)
      console.log(idUniqueDispositivo)
    } catch (error) {
      openVisibleSnackBar(`${error}`, 'error') 
    }
  } 

  const init = async () => {
    setLoadingLogin(true)
    validRememberCredentials()
    await generateTokenFCM()
    setLoadingLogin(false)
  }

  useEffect(()=> {
    init()
  }, [])

  return (
    <FormAdaptiveKeyBoard>
      <View className='flex-1 items-center justify-center px-8'>
        <BoxImage width={70} height={80} img={require('assets/images/LOGOPINULITOORIGINAL.png')}/>
        
        <View className='flex flex-col justify-center items-center gap-1 mt-10'>
          <Title>Login</Title>
          <TextInfo>Ingresa tus credenciales</TextInfo>
        </View>
    
        <View className='w-full flex flex-column mt-10 gap-3.5'>
    
          <InputFormHook 
            disabled={loadingLogin}
            name='codigo' 
            control={control} 
            label='Codigo Empleado' 
            placeholder='Ingrese un codigo'
            errors={errors}
          />
  
          <InputFormHook 
            disabled={loadingLogin}
            name='password' 
            control={control} 
            label='Contraseña' 
            placeholder='Ingrese su contraseña' 
            isPassword={true}
            errors={errors}
          />
  
        </View>

        <View className='flex flex-row justify-center items-center mt-3'>
          <CheckBoxForm 
            control={control} 
            name='recordar_btn'
            label='Recordarme'
            positionLabel='leading'
            disabled={loadingLogin}
            onChangeExtra={onChangeCheckBoxRemember}
          />
        </View>

        <View className='w-full mt-3'>
          <ButtonForm 
            disabled={loadingLogin}
            loading={loadingLogin}
            onPress={handleSubmit(submitFormLogin)} 
            label='Ingresar'/>
        </View>

        <View className='w-full mt-3 flex-row justify-center items-center flex-wrap' style={{ gap: 5 }}>
          {/* <SurfaceTapButton 
            icon='gesture-tap-button'
            title='Marcaje'
            onPress={()=>NavigationService.navigate('Marcaje')}
            disabled={loadingLogin}
          /> */}
          {/* <SurfaceTapButton 
            icon='fingerprint'
            title='Huella'
            visible={isBiometricSupported}
          /> */}
          {/* <SurfaceTapButton 
            icon='face-recognition'
            title='Facial'
          /> */}
        </View>

      </View>
    </FormAdaptiveKeyBoard>
  );
}