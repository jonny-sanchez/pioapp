import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HelperText } from 'react-native-paper';
import Title from 'components/typografy/Title';
import TextInfo from 'components/typografy/TextInfo';
import InputFormHook from 'components/form/InputFormHook';
import DatePickerForm from 'components/form/DatePickerForm';
import { formatDateDDMMYYYY } from 'helpers/fechas/fechasHelper';
import ButtonForm from 'components/form/ButtonForm';
import SurfaceTapButton from 'components/container/SurfaceTapButton';
import FormAdaptiveKeyBoard from 'components/container/FormAdaptiveKeyBoard';
import { AJAX, URLPIOAPP } from 'helpers/http/ajax';
import alertsState from 'helpers/states/alertsState';
import { NavigationService } from 'helpers/navigator/navigationScreens';
import BoxImage from 'components/container/BoxImage';
import { LOGOPINULITOORIGINAL } from 'assets/Providers/ImageProvider';

const schema = yup.object().shape({
  codigo: yup.string().required('Código es requerido'),
  dpi: yup.string().required('DPI es requerido'),
  fechaNacimiento: yup.date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Fecha Nacimiento es requerida'),
  newPassword: yup.string()
    .required('Nueva contraseña es requerida')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/, 'Debe tener más de 5 caracteres, incluir números y letras'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Confirmar contraseña es obligatorio')
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { openVisibleSnackBar } = alertsState();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data);
    try {
      const response: any = await AJAX(`${URLPIOAPP}/auth/forgot-password`, 'POST', {
        codigo: data.codigo,
        dpi: data.dpi,
        fechaNacimiento: formatDateDDMMYYYY(data.fechaNacimiento),
        newPassword: data.newPassword,
      });
      if (response.status) {
        openVisibleSnackBar('Contraseña restablecida correctamente. Inicia sesión.', 'success');
        NavigationService.goBack();
      } else {
        openVisibleSnackBar(response.message || 'Error al restablecer contraseña.', 'error');
      }
    } catch (error: any) {
      openVisibleSnackBar(`${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAdaptiveKeyBoard>
      <View className='flex-1 items-center justify-center px-8'>
        <BoxImage width={70} height={80} img={LOGOPINULITOORIGINAL}/>

        <View className='flex flex-col justify-center items-center gap-1 mt-6'>
          <Title style={{ textAlign: 'center' }}>Recuperar Contraseña</Title>
          <TextInfo style={{ textAlign: 'center' }}>
            Ingresa tus datos de empleado para restablecer tu contraseña.
          </TextInfo>
        </View>

        <View className='w-full flex flex-column mt-6 gap-3.5'>
          <InputFormHook 
            disabled={loading}
            name='codigo' 
            control={control} 
            label='Código Empleado' 
            placeholder='Ej: PE123'
            errors={errors}
          />
          <InputFormHook 
            disabled={loading}
            name='dpi' 
            control={control} 
            label='No. DPI' 
            placeholder='Ingresa tu DPI'
            inputType='numeric'
            errors={errors}
          />
          <DatePickerForm 
            control={control} 
            name="fechaNacimiento"
            errors={errors}
          />
          <InputFormHook 
            disabled={loading}
            name='newPassword' 
            control={control} 
            label='Nueva Contraseña' 
            placeholder='Ingresa nueva contraseña'
            isPassword={true}
            errors={errors}
          />
          <InputFormHook 
            disabled={loading}
            name='confirmPassword' 
            control={control} 
            label='Confirmar Contraseña' 
            placeholder='Repite nueva contraseña'
            isPassword={true}
            errors={errors}
          />
        </View>

        <View className='w-full mt-6'>
          <ButtonForm 
            disabled={loading}
            loading={loading}
            onPress={handleSubmit(onSubmit)} 
            label='Restablecer Contraseña'
          />
        </View>
        <View className='w-full mt-3 flex-row justify-center items-center flex-wrap'>
          <SurfaceTapButton 
            icon='arrow-left'
            title='Volver al Login'
            onPress={() => NavigationService.goBack()}
            disabled={loading}
          />
        </View>
      </View>
    </FormAdaptiveKeyBoard>
  );
}
