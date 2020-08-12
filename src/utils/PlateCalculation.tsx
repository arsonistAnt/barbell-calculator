/**
 * An enum class to track types of weight conversions.
 */
export enum WeightConversions {
  Kilograms,
  Pounds,
}

/**
 * Interface to keep track of weighted plates and available amounts.
 */
export interface Plate {
  type: number;
  amount: number;
}

/**
 * A configuration object for plate calculation.
 *
 * @see calculateRequiredPlates
 */
export interface PlateConfig {
  availablePlates: Array<Plate>;
  conversionType: WeightConversions;
  barbellWeight: number;
  useLimitedPlates: boolean;
  selectedPlates: Set<number>;
}

class StandardPlate {
  type: number;
  amount: number;
  constructor(type: number, amount: number) {
    this.type = type;
    this.amount = amount;
  }
}

/**
 * Creates a set of default standard plates to calculate with.
 *
 * * Example of standard plate types are (in lbs):
 *   2.5, 5, 10, 25, 35, and 45
 *
 * @see {@link https://en.wikipedia.org/wiki/Weight_plate#:~:text=Plates%20are%20available%20in%20a,pound%20plates%20less%20commonly%20seen. | Common PLates}
 */
export class DefaultPlateConfig {
  availablePlates: Array<Plate> = [
    new StandardPlate(1.25, 0),
    new StandardPlate(2.5, 0), // This plate is considered a 2.5 plate but value is 2 for ease of calculation.
    new StandardPlate(5, 0),
    new StandardPlate(10, 0),
    new StandardPlate(25, 0),
    new StandardPlate(35, 0),
    new StandardPlate(45, 0),
    new StandardPlate(55, 0),
    new StandardPlate(65, 0),
    new StandardPlate(100, 0),
  ];
  conversionType: WeightConversions = WeightConversions.Pounds;
  barbellWeight: number = 45;
  useLimitedPlates: boolean = false;
  selectedPlates: Set<number> = new Set([2.5, 5, 10, 25, 35, 45]);
}

/**
 * Calculates the list of plates needed to hit the target weight using the a greedy method.
 *
 * Greedy Efficient method: Use the heaviest to the lightest weight to calculate the list of plates needed.
 *
 * EX: List of availbe plates [45,35,25] sorted from greatest to least. 45lbs would be used then 35lb then 25lb etc...
 *
 * Note: By default will calculate for a conversion of pounds.
 *
 * @param targetWeight the total weight to add up to.
 * @param barbellWeight the weight of the barbell.
 * @param availablePlates the list of available plates to calculate the target weight for.
 * @return the list of plates needed to add to the targetWeight and left over target weight. (e.g. {plate? : Array<Plate>, leftoverWeight : number})
 */
const getRequiredPlates = (
  targetWeight: number,
  barbellWeight: number,
  availablePlates: Array<Plate>
): { plates?: Array<Plate>; leftoverWeight: number } => {
  // Target weight must be a value > 0 or else return default {undefined, -1} object.
  if (targetWeight <= 0) {
    return { plates: undefined, leftoverWeight: -1 };
  }
  // Since we're using pop() for Array, the array will be sorted from least to greatest. [25,35,45] <== 45lb will be popped and removed.
  availablePlates = availablePlates.sort(
    (a: Plate, b: Plate) => a.type - b.type
  );

  const platesResult = Array<Plate>();

  // Calculate the weight for one side of the barbell.
  // EX: 135lbs - 45lbs = 90 / 2 => 45lbs per side.
  let target = (targetWeight - barbellWeight) / 2;

  while (target != 0 && availablePlates.length) {
    const currHeaviestPlate: Plate =
      availablePlates[availablePlates.length - 1];
    if (currHeaviestPlate.type <= target) {
      const amountNeeded = Math.trunc(target / currHeaviestPlate.type);
      if (amountNeeded != 0) {
        platesResult.push(
          new StandardPlate(currHeaviestPlate.type, amountNeeded)
        );
      }
      target = target % currHeaviestPlate.type;
    } else {
      availablePlates.pop();
    }
  }
  return { plates: platesResult, leftoverWeight: target };
};

const calcRequiredPlates = (
  targetWeight: number,
  config: PlateConfig
): { plates?: Array<Plate>; leftoverWeight: number } => {
  const { barbellWeight, availablePlates } = config;
  return getRequiredPlates(targetWeight, barbellWeight, availablePlates);
};

export default {
  calcRequiredPlates,
  DefaultPlateConfig,
};
