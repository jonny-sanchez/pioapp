import { Dropdown } from 'react-native-element-dropdown';
import { useTheme, HelperText, Text, ActivityIndicator } from 'react-native-paper'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import Option from 'types/Dropdown/Option';
import React from 'react';

type DropdownFormProps = {
    label?: string;
    data?: Option[];
    // value?: any;
    control: any;
    name: string;
    errors?: any;
    disable?: boolean;
    onChangeExtra?: (item: any) => void;
    onFocus?: (() => void) | undefined;
    loading?: boolean;
    loadingFooter?:boolean;
    onEndReached?: ((info: {
        distanceFromEnd: number;
    }) => void) | null | undefined;
    searchQuery?: ((keyword: string, labelValue: string) => boolean) | undefined;
    onChangeText?: ((search: string) => void) | undefined;
    onBlurExtra?: () => void;
    renderFooterFlatList?: React.ReactNode;
}

export default function DropdownForm({
    label = '',
    data = [],
    // value = '',
    control,
    name,
    errors = {},
    disable = false,
    onChangeExtra,
    onFocus,
    loading,
    loadingFooter = false,
    onEndReached,
    searchQuery,
    onChangeText,
    onBlurExtra,
    renderFooterFlatList
} : DropdownFormProps){
    
    const theme = useTheme()
    const errorMessage = errors[name || ""]?.message || ""

    return (
        <View>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Dropdown 
                        disable={disable}
                        mode='modal'
                        // data={data}
                        // data={loading ? [ { value: '', label: '...Cargando' } ] : data}
                        // data={loading ? [] : data}
                        data={data}
                        value={value ?? ""}
                        valueField='value'
                        placeholder={loading ? '...Cargando' : label}
                        labelField='label'
                        search
                        searchQuery={searchQuery}
                        onChangeText={onChangeText}
                        searchPlaceholder='Buscar...'
                        // onChange={onChange}
                        onChange={item => {
                            onChange(item.value)
                            if(onChangeExtra) onChangeExtra(item)
                        }}
                        onBlur={() => {
                            onBlur()
                            onBlurExtra && onBlurExtra()
                        }}
                        onFocus={onFocus}
                        // onChange={item => setValue(item?.value || "")}
                        containerStyle={{ backgroundColor: theme.colors.background, marginBottom: 20 }}
                        // itemContainerStyle={{ backgroundColor: theme.colors.surfaceVariant }}
                        itemTextStyle={{ color: theme.colors.onBackground }}
                        activeColor={theme.colors.surfaceVariant}
                        // inputSearchStyle
                        // searchPlaceholderTextColor={theme.colors.onBackground}
                        // searchPlaceholderTextColor
                        backgroundColor='rgba(0,0,0,0.5)'
                        placeholderStyle={{ color: theme.colors.secondary }}
                        fontFamily='Inter_900Black'
                        // selectedStyle
                        selectedTextStyle={{ color: theme.colors.onBackground }}
                        inputSearchStyle={{ color: theme.colors.onBackground }}
                        style={{ 
                            backgroundColor: theme.colors.surfaceVariant, 
                            height: 55, 
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            borderBottomWidth: 0.6,
                            borderColor: theme.colors.secondary,
                            borderTopEndRadius: 4,
                            borderTopStartRadius: 4,
                            ...(disable && {opacity: 0.5})
                        }}

                        // renderRightIcon={() => loading ? <ActivityIndicator size="small" /> : null}

                        flatListProps={{ 
                            onEndReached: onEndReached,
                            onEndReachedThreshold: 0.6,
                            ListFooterComponent: () => {
                                if(renderFooterFlatList && !loading && data.length > 0) return (
                                    renderFooterFlatList
                                )

                                if(loadingFooter) return (
                                    <View style={{ padding: 24 }}>
                                        <ActivityIndicator size={'small'}/>
                                    </View>
                                )
                            },

                            ListEmptyComponent: () => {
                                if(loading) return (
                                    <View style={{ padding: 24 }}>
                                        <ActivityIndicator size={'small'}/>
                                    </View>
                                    // <View style={{ padding: 24, alignItems: 'center', gap: 15 }}>
                                    //     <HelperText type='info'>Cargando opciones…</HelperText>
                                    //     <ActivityIndicator size="large" color={theme.colors.primary} />
                                    // </View>
                                )

                                if(data.length <= 0 && !loadingFooter) return (
                                    <View style={{ padding: 24, alignItems: 'center' }}>
                                        <Text>No hay ninguna opcion.</Text>
                                    </View>
                                )

                                if(!loadingFooter) return (
                                  <View style={{ padding: 24, alignItems: 'center' }}>
                                    <Text>No se encontraron resultados</Text>
                                  </View>
                                )
                            }
                        }}
                    />
                )}
            />

            { errorMessage && <HelperText type="error" visible={errorMessage ? true : false}>{ errorMessage }</HelperText> }
        </View>
    )

}