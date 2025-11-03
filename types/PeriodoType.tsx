type PeriodoType = {
    idPeriodo: number;
    nombrePeriodo: string;
    fechaInicio?: string;
    fechaFin?: string;
    pagada?: boolean;
    noQuincena?: number;
    activo?: boolean;
}
export default PeriodoType;