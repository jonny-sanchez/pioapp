import NotificacionAppType from "types/Notificaciones/NotificacionAppType";
import { create } from "zustand";

type NotificationStateType = {
    notificacionesToday: NotificacionAppType[];
    addNotification: (newNotification: NotificacionAppType) => void;
    setNotifications: (newNotifications: NotificacionAppType[]) => void;
    updateLeidoById: (data: NotificacionAppType) => void;
}

const notificationState = create<NotificationStateType>((set)=>({
    notificacionesToday: [],
    addNotification: (newNotification) =>
        set((state) => ({
          notificacionesToday: [newNotification, ...state.notificacionesToday],
        })),
    setNotifications: (newNotifications) =>
        set({ notificacionesToday: newNotifications }),
    updateLeidoById: (notification) => set(
        (state) => ({
            notificacionesToday: state.notificacionesToday.map(
                noti => noti.id_notificacion_app == notification.id_notificacion_app
                    ? { ...noti, leido: true }
                    : noti
            )
        })
    )
}))

export default notificationState