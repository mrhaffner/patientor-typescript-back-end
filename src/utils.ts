/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isCaseOrDefaultClause } from 'typescript';
import { NewPatientEntry,
    Gender,
    HealthCheckRating,
    HealthCheckEntry,
    BaseEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
    Entry,
    Discharge,
    SickLeave,
    DiagnosisEntry
} from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatientEntry => {
    return {
        dateOfBirth: parseDate(object.dateOfBirth),
        name: parseString(object.name, 'name'),
        ssn: parseString(object.ssn, 'ssn'),
        occupation: parseString(object.occupation, 'occupation'),
        gender: parseGender(object.gender),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries: object.entries
    };
};

const parseString = (string: any, strType: string): string => {
    if (!string || !isString(string)) {
      throw new Error(`Incorrect or missing ${strType}`);
    }
  
    return string;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return rating;
};

const isRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseDiagnosisCodes = (codes: any): string[] => {
    if (!codes || Array.isArray(codes) || isCode(codes)) {
        throw new Error('Incorrect diagnosis codes');
    }
    return codes;
};

const isCode = (code: any): boolean => {
    return code.every(i => (typeof i === "string"));
};

const parseDischarge = (discharge: any): Discharge => {
    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria, "discharge criteria")
    };
};

const parseSickLeave = (leave: any): SickLeave => {
    return {
        startDate: parseDate(leave.startDate),
        endDate: parseDate(leave.endDate)
    };
};

export const toNewEntry = (object: any): Entry => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
      
    switch (object.type) {
        case "Hospital":
            return parseHospitalEntry(object);
        case "OccupationalHealthcare":
            return parseOccupationalEntry(object);
        case "HealthCheck":
            return parseHealthEntry(object);
        default:
            return assertNever(object);
    }
};

const parseBaseEntry = (object: any): BaseEntry => {
    const baseEntry = {
        id: parseString(object.id, "id"),
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
    };
    if (object.diagnosisCodes) {
        return {
            ...baseEntry,
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
    }
    return baseEntry;
};

const parseHospitalEntry = (object: any): HospitalEntry => {
    const newEntry = {
        ...parseBaseEntry(object), 
        type: "Hospital"
    };
    if (object.discharge) {
        return {
            ...newEntry,
            discharge: parseDischarge(object.discharge)
        };
    }
    return newEntry;
};

const parseOccupationalEntry = (object: any): OccupationalHealthcareEntry => {
    const baseEntry = parseBaseEntry(object);
    const newEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName, "employerName")
    };
    if (object.sickLeave) {
        return {
            ...newEntry,
            sickLeave: parseSickLeave(object.sickLeave)
        };
    }
    return newEntry;
};

const parseHealthEntry = (object: any): HealthCheckEntry => {
    const baseEntry = parseBaseEntry(object);
    return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
};

export default toNewPatient;