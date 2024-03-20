import diagnoses from '../data/diagnosis';
import {DiagnosisType} from "../types";

const getDiagnosisData = () : Array<DiagnosisType> => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnosisData,
    addDiagnosis
};