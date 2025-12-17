import { handleSocketConnection, socketInstance } from "helpers/Socket/SocketHelper";
import notificationState from "helpers/states/notificationState";
import { Socket } from "socket.io-client";
import { URLPIOAPPSOCKET } from "Sockets/SocketsConstants";
import NotificacionAppType from "types/Notificaciones/NotificacionAppType";

let socket: Socket | null = null;

export const initSocketNotification = (token:string) => {
    if (socket) {
        socket.disconnect()
        socket = null
    }

    socket = socketInstance(`${URLPIOAPPSOCKET}/notificaciones`, token)
    handleSocketConnection(socket)

    // Escucha nueva notificación
    socket.on("notificacion-nueva", (data:NotificacionAppType) => {
        notificationState.getState().addNotification(data)
    });

    // Escucha notificación leída
    socket.on("notificacion-leida", (data:NotificacionAppType) => {
        notificationState.getState().updateLeidoById(data)
    });

    // Cargar notificaciones del día
    socket.emit("notificaciones_hoy");
    socket.on("notificaciones-listar", (data:NotificacionAppType[]) => {
        notificationState.getState().setNotifications(data)
    });

    return socket;
};

export const getSocketNotification = () => socket;

export const disconnectSocketNotification = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
