export type AsuntoNotificacionType = {
  id_asunto_notificacion: number;
  name_asunto: string;
  userCreatedAt: string | null;
  userUpdatedAt: string | null;
  createdAt: string;
  updatedAt: string;   
};

type NotificacionAppType = {
    id_notificacion_app: number;
    title: string;
    body: string;
    dataPayload: object;
    id_asunto_notificacion: number;
    leido: boolean;
    id_users: string;
    userCreatedAt: string | null;
    userUpdatedAt: string | null;
    createdAt: string;
    updatedAt: string;
    AsuntoNotificacionModel: AsuntoNotificacionType
}

export default NotificacionAppType