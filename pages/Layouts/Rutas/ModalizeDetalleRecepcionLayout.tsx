import CardTitle from "components/Cards/CardTitle";
import ModalizeComponent from "components/Modals/ModalizeComponent";

type ModalizeDetalleRecepcionLayoutProps = {
    modalizeRefDetalleRecepcion:any
}

export default function ModalizeDetalleRecepcionLayout({
    modalizeRefDetalleRecepcion
} : ModalizeDetalleRecepcionLayoutProps) {

    return (
        <>
            <ModalizeComponent
                modalizeRef={modalizeRefDetalleRecepcion}
                title="Detalle Recepcion"
                footerComponent={(
                    <></>
                )}
            >
                <CardTitle 
                    icon="store" 
                    title={`AMATITLAN 1`} 
                    subtitle={`9 de febrero del 2026`} 
                    style={{ width: '100%' }}
                />
                
            </ModalizeComponent>
        </>
    )
}