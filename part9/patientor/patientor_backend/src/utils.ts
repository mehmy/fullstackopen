import {NewPatientEntry, PatientType} from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {

    const typedEntry : NewPatientEntry = {
        ...object
    };
    return typedEntry;
};

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing name');
    }

    return dateOfBirth;
};

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing name');
    }

    return ssn;
};

export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing name');
    }

    return occupation;
};


export const parseGender = (Gender: unknown): string => {
    if (!Gender || !isString(Gender)) {
        throw new Error('Incorrect or missing name');
    }
    return Gender;
};
