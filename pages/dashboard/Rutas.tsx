import ScrollViewContainer from "components/container/ScrollViewContainer"
import { View } from "react-native"
import DataTableInfo from "components/tables/DataTableInfo"
import configTableRutas from "helpers/tables/configTableRutas"
import { useRef, useState } from "react"
import { Modalize } from "react-native-modalize"
import ModalizeComponent from "components/Modals/ModalizeComponent"
import PageLayout from "components/Layouts/PageLayout"
import DatePickerForm from "components/form/DatePickerForm"
import FormAdaptiveKeyBoard from "components/container/FormAdaptiveKeyBoard"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import schemaListRutasForm from "helpers/validatesForm/schemaListRutasForm"
import DropdownForm from "components/form/DropdownForm"

export default function Rutas() {

    const [rutas, setRutas] = useState([
        {
            idRuta: 1,
            ticket: 76887,
            ubicacion: 'C-1',
            cantidad: '87.00',
            tienda: 'PLAZA'
        },
        {
            idRuta: 87,
            ticket: 3243,
            ubicacion: 'C-8',
            cantidad: '78.00',
            tienda: 'GUATE'
        },
        {
            idRuta: 2,
            ticket: 43545,
            ubicacion: 'C-1',
            cantidad: '65.00',
            tienda: 'PLAZA'
        },
        {
            idRuta: 3,
            ticket: 4325,
            ubicacion: 'C-1',
            cantidad: '82.00',
            tienda: 'GUATE'
        }
    ])

    const modalizeRef = useRef<Modalize>(null)

    const onOpen = () => modalizeRef.current?.open()

    const { control, handleSubmit, reset, resetField, formState: { errors } } = useForm({
            resolver: yupResolver(schemaListRutasForm),
            mode: 'all'
    })

    return (
        <>
            {/* <ModalizeComponent 
                // onOpen={onOpen}
                title="Filtros"
                modalizeRef={modalizeRef}
            >

            </ModalizeComponent> */}

            <PageLayout titleAppBar="Rutas">

                <ScrollViewContainer>
                    <FormAdaptiveKeyBoard>
                        <View className="w-full flex-col gap-3.5 my-5">
                            <DatePickerForm 
                                control={control} 
                                name="date"
                                errors={errors}
                            />
                            <DropdownForm 
                                control={control} 
                                name="ubicaciones"
                                label="Ubicaciones"
                                data={[
                                    { value: 1, label: 'GUADALUPE' },
                                    { value: 2, label: 'FDSFDS' },
                                    { value: 3, label: 'GFDGFDH' },
                                ]}
                            />
                            <DataTableInfo
                                search={true}
                                filter={false}
                                pagination={false}
                                configTable={configTableRutas}
                                data={rutas}
                                onPressFilter={onOpen}
                                groupField="tienda"
                            />
                        </View>
                    </FormAdaptiveKeyBoard>
                </ScrollViewContainer>
            </PageLayout>
        </>
    )
}