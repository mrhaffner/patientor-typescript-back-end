import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (req, res) => {
    try {
      const newPatient = toNewPatient(req.body);
      const addedPatient = patientService.addPatient(newPatient);
      res.json(addedPatient);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id.toString());

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.findById(req.params.id.toString());

    if (patient) {
      const addedPatient = patientService.addPatientEntry(req.body, patient);
      res.json(addedPatient);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;