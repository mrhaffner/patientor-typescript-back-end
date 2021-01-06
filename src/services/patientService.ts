import patients from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry } from '../types';

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

const addPatientEntry = ( entry: Entry, patient: PatientEntry): PatientEntry => {
    // const updatedPatient = patients.find(d => d.id === id);
    patient.entries.push(entry);
    patients.forEach(p => p.id === patient.id ? patient : p);
    return patient;
};

export default {
    getNonSensitivePatientEntries,
    addPatient,
    findById,
    addPatientEntry
};