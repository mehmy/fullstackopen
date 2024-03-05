interface Bmi {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): Bmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBMI = (height: number, weight: number): string => {
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

// try {
//   const { height, weight } = parseArguments(process.argv);
//   calculateBMI(height, weight);
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }
