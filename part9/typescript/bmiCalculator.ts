const calculateBMI = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const m2Height = heightInM * heightInM;

  const BMI = weight / m2Height;

  if (BMI > 25) {
    return 'Overweight';
  } else if (BMI < 18.5) {
    return 'Underweight';
  } else {
    return 'Healthy weight';
  }
};

console.log(calculateBMI(177, 74));
