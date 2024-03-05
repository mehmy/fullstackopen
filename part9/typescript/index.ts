import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { Result, calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(500).json({
      error: 'malformatted parameters',
    });
  }

  return res.json({
    height: height,
    weight: weight,
    bmi: calculateBMI(height, weight),
  });
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { exercises, target } = _req.body;

  if (exercises === undefined || target === undefined) {
    return res.status(500).json({
      error: 'parameters missing',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(exercises[0])) || isNaN(Number(target))) {
    return res.status(500).json({
      error: 'malformatted parameters',
    });
  }

  // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
  const result: Result = calculateExercises(target, exercises);

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
