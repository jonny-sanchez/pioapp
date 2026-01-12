export interface IngresosType {
    salarioOrdinario: number;
    horasSimples: number;
    horasDobles: number;
    bonificacion: number;
    otrosIngresos: number;
    totalIngresos: number;
}

export interface DescuentosType {
    anticipo: number;
    igss: number;
    isr: number;
    ahorro: number;
    seguro: number;
    otrosDescuentos: number;
    totalDescuentos: number;
}

export interface FirmaType {
    idFirmaBoleta: string;
    fechaFirma: string;
    valido: boolean;
}

export interface PeriodoType {
    id: number;
    nombre: string;
    rango: string;
    fechaInicio: string;
    fechaFin: string;
}

export interface EmpleadoType {
    codigo: string;
    nombre: string;
}

export interface BoletaType {
    numeroBoleta: number;
    empleado: EmpleadoType;
    periodo: PeriodoType;
    diasTrabajados: number;
    ingresos: IngresosType;
    descuentos: DescuentosType;
    neto: number;
    liquido: number;
    firma: FirmaType;
    tipo:number
}

export enum TipoPeriodoEnum {
    QUINCENA = 1,
    AGUINALDO = 2,
    BONO14 = 3
}

export default BoletaType;