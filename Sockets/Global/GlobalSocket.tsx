import { NavigationService } from "helpers/navigator/navigationScreens";
import { validateConnectionInternetActive } from "helpers/network/internetHelper";
import { handleSocketConnection, socketInstance } from "helpers/Socket/SocketHelper";
import alertsState from "helpers/states/alertsState";
import notificationState from "helpers/states/notificationState";
import rutasState from "helpers/states/rutasState";
import { Socket } from "socket.io-client";
import { URLPIOAPPSOCKET } from "Sockets/SocketsConstants";
import NotificacionAppType from "types/Notificaciones/NotificacionAppType";
import RutasListType from "types/Rutas/RutasListType";

let socket: Socket | null = null;

export const initSocketGlobal = async (token:string) => {
    if (socket) {
        socket.disconnect()
        socket = null
    }

    //validar conexion a internet
    const resultInternetActive = await validateConnectionInternetActive()
    if(!resultInternetActive) NavigationService.navigate('InternetFail')

    socket = socketInstance(`${URLPIOAPPSOCKET}/global`, token)
    handleSocketConnection(socket)

    //capturar recepcion
    socket.on("nueva_recepcion", (data:RutasListType) => {
        alertsState.getState().openVisibleSnackBar(`Nueva recepcion de ruta en "${data.tienda_nombre}"`, 'success')
        rutasState.getState().setRecepcionadaRuta(data.id_pedido, data.serie)
    })

    socket.on("nueva-notificacion", (data:NotificacionAppType) => {
      notificationState.getState().sumCountNotificacions()
    })

    socket.on("leida-notificacion", (data:NotificacionAppType) => {
      notificationState.getState().restCountNotificacions()
    })

    //obtener cantidad 
    socket.emit("notificaciones-count")
    socket.on("notificaciones-list-count", (data:number) => {
      notificationState.getState().setCountNotificacions(Number(data))
    })

    return socket
}

export const getSocketGlobal = () => socket;

export const disconnectSocketGlobal = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}