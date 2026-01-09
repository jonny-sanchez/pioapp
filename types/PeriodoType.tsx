type PeriodoType = {
    idPeriodo: number;
    nombrePeriodo: string;
    fechaInicio?: string;
    fechaFin?: string;
    pagada?: boolean;
    noQuincena?: number;
    activo?: boolean;
    tipo?: number;
}
export default PeriodoType;

export type SelectPeriodoType = {
    idPeriodo:number;
    tipo:number;
}
