export interface PatientType {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export interface DiagnosisType {
    code: string,
    name: string,
    latin?: string
}

export type NonSensitivePatientType = Omit<PatientType, 'ssn'>;

export type NewPatientEntry = Omit<PatientType, 'id'>;

export enum Gender {
    Male = "male",
    Female = 'female',
    Other = 'other'
}
