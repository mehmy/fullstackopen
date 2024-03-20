import patients from '../data/patients';

import {PatientType, NonSensitivePatientType} from "../types";

const getPatientData = () : Array<PatientType> => {
    return patients;
};

const getNonSensitivePatientData = () : Array<NonSensitivePatientType> => {
    return patients.map(({
        id, name,dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getPatientData,
    getNonSensitivePatientData,
    addPatient
};