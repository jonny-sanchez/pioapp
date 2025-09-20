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
import { useState } from 'react';
import alertsState from 'helpers/states/alertsState';
import { setValueStorage } from 'helpers/store/storeApp';

export default function Login() {

  const { openVisibleSnackBar } = alertsState()

  const [ loadingLogin, setLoadingLogin ] = useState<boolean>(false)

  const validLogin = async(data: schemaLoginFormValidateType) : Promise<ResponseService> => {
    try {
      const result:ResponseService = await AJAX(`${ URLPIOAPP }/auth/login`, 'POST', data)
      return result
    } catch (error:any) {
      openVisibleSnackBar(`${ error }`, 'error')
      return generateJsonError(error)
    }
  }

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLoginFormValidate),
    mode: 'all'
  })

  const submitFormLogin = async(data: schemaLoginFormValidateType) => {
    setLoadingLogin(true)
    const login = await validLogin(data)
    setLoadingLogin(false)
    login.status && NavigationService.reset('Home')
    login.status && setValueStorage('user', login.data)
  }

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
        <View className='w-full mt-6'>
          <ButtonForm 
            disabled={loadingLogin}
            loading={loadingLogin}
            onPress={handleSubmit(submitFormLogin)} 
            label='Ingresar'/>
        </View>
      </View>
    </FormAdaptiveKeyBoard>
  );
}