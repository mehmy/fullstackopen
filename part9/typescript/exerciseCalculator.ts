interface Result {
  numberDays: number;
  trainingDays: Number;
  originalTarget: Number;
  averageTime: Number;
  targetReached: Boolean;
  rating: number;
  ratingText: String;
}

const parseArguments = (args: string[]): Result => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // args.forEach((arg) => {
  //   if (!isNaN(Number(arg))) {
  //     console.log('number');
  //   } else {
  //     throw new Error('Provided were not numbers');
  //   }
  // });

  const values: number[] = args
    .filter((a) => !isNaN(Number(a)))
    .map((a) => Number(a));

  const target: number = Number(values.shift());

  return calculateExercises(target, values);
};

export const calculateExercises = (
  target: number,
  values: number[]
): Result => {
  const periodLength = values.length;

  const trainingDays = values.filter((value) => value != 0);
  const trainingDaysLength = trainingDays.length;

  const average = values.reduce((a, b) => a + b) / periodLength;
  const succes = average > target ? true : false;

  const ratingText = ['you suck like shit', 'not bad', 'good'];

  const ratingNumber = (
    succes: boolean,
    average: number,
    target: number
  ): number => {
    if (succes) {
      return 3;
    } else if (target - average > 1) {
      return 1;
    } else {
      return 2;
    }
  };

  return {
    numberDays: periodLength,
    trainingDays: trainingDaysLength,
    originalTarget: target,
    averageTime: average,
    targetReached: succes,
    rating: ratingNumber(succes, average, target),
    ratingText: ratingText[ratingNumber(succes, average, target) - 1],
  };
};
