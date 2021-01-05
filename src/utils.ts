/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

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

export default toNewPatient;