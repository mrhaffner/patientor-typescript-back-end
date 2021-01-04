import patients from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
        id: `${entry.name} ${entry.occupation}`,
        ...entry
};

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getNonSensitivePatientEntries,
    addPatient
};