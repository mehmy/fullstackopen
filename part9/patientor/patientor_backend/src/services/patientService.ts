import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import {PatientType, NonSensitivePatientType, NewPatientEntry} from "../types";

const getPatientData = () : Array<PatientType> => {
    return patients;
};

const getNonSensitivePatientData = () : Array<NonSensitivePatientType>  => {
    return patients.map(({
        id, name,dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (entry: NewPatientEntry) : PatientType => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const id : string = uuid();

    const newPatientEntry = {
        id: id,
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatientData,
    getNonSensitivePatientData,
    addPatient
};