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
        id: `${entry.name}-${Math.random()}-${Math.random()}`,
        ...entry
};

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

export default {
    getNonSensitivePatientEntries,
    addPatient,
    findById
};