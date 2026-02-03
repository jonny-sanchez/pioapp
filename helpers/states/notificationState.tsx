import NotificacionAppType from "types/Notificaciones/NotificacionAppType";
import { create } from "zustand";

type NotificationStateType = {
    notificacionesToday: NotificacionAppType[];
    addNotification: (newNotification: NotificacionAppType) => void;
    setNotifications: (newNotifications: NotificacionAppType[]) => void;
    updateLeidoById: (data: NotificacionAppType) => void;
    loadingNotificationToday: boolean;
    setloadingNotificationToday: (newLoadingNotificationToday:boolean) => void;
    //conteo de notificacion badge notis
    countNotificacions: number;
    setCountNotificacions: (nwCountNotificacions:number) => void;
    restCountNotificacions: () => void;
    sumCountNotificacions: () => void;
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
    ),
    loadingNotificationToday: false,
    setloadingNotificationToday: (newLoadingNotificationToday) => set({ loadingNotificationToday: newLoadingNotificationToday }),
    //conteo de notificacion badge notis
    countNotificacions: 0,
    setCountNotificacions: (nwCountNotificacions) => set({ countNotificacions: nwCountNotificacions }),
    restCountNotificacions: () => set((state) => ({ countNotificacions: state.countNotificacions - 1 })),
    sumCountNotificacions: () => set((state) => ({ countNotificacions: state.countNotificacions + 1 }))
}))

export default notificationState