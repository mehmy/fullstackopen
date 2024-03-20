import express from 'express';
import DiagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(DiagnosisService.getDiagnosisData());
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis!');
});

export default router;