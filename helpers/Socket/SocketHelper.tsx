import alertsState from "helpers/states/alertsState";
import { io, Socket } from "socket.io-client";


export const socketInstance = (url:string, token:string) => {
    return io(url, {
        // query: { userId, token },
        transports: ["websocket"],
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        autoConnect: true
    })
} 

export const handleSocketConnection = (socket: Socket) => {

    // const { openVisibleSnackBar } = alertsState()

    socket.on("connect", () => {
        console.log("Socket conectado:", socket?.id);
    });

    // Error de conexión
    socket.on("connect_error", (err) => {
        console.log("Error de conexión al socket:", err.message);
        alertsState.getState().openVisibleSnackBar(`Error de conexión al socket: ${err.message}`, 'error')
    });

    // Timeout de conexión
    socket.on("connect_timeout", (timeout) => {
        console.log("Timeout de conexión:", timeout);
        alertsState.getState().openVisibleSnackBar(`Timeout de conexión: ${timeout}`, 'error')
    });

    // Desconexión
    socket.on("disconnect", (reason) => {
      console.log("Socket desconectado:", reason);
    });

}