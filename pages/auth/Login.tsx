import ButtonForm from 'components/form/ButtonForm';
import InputFormHook from 'components/form/InputFormHook';
import TextInfo from 'components/typografy/TextInfo';
import Title from 'components/typografy/Title';
// import { useState } from 'react';
import { View } from 'react-native';
import BoxImage from 'components/container/BoxImage';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schemaLoginFormValidate from 'helpers/validatesForm/schemaLoginFormValidate';
import { NavigationService } from 'helpers/navigator/navigationScreens'; 
import FormAdaptiveKeyBoard from 'components/container/FormAdaptiveKeyBoard';

export default function Login() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaLoginFormValidate),
    mode: 'all'
  })

  const submitFormLogin = async(data: any) => {
    // alert(JSON.stringify(data))
    NavigationService.reset('Home')
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
            name='email' 
            control={control} 
            label='Usuario' 
            placeholder='Ingrese un usuario'
            errors={errors}
          />
  
          <InputFormHook 
            name='password' 
            control={control} 
            label='Contraseña' 
            placeholder='Ingrese su contraseña' 
            isPassword={true}
            errors={errors}
          />
  
        </View>
        <View className='w-full mt-6'>
          <ButtonForm onPress={handleSubmit(submitFormLogin)} label='Ingresar'/>
        </View>
      </View>
    </FormAdaptiveKeyBoard>
  );
}