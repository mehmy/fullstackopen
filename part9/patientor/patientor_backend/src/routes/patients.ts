import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitivePatientData());
});

router.post('/', (_req, res) => {
    try {
        const newPatientEntry = toNewDiaryEntry(req.body);

        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }});

export default router;