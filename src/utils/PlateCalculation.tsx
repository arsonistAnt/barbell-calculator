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
  standardPlates: Array<Plate>;
  conversionType: WeightConversions;
  barbellWeight: number;
  useLimitedPlates: boolean;
  selectedPlates: Set<number>;

  toKg(): PlateConfig;
  toLb(): PlateConfig;
}

class StandardPlate {
  type: number;
  amount: number;
  constructor(type: number, amount: number) {
    this.type = type;
    this.amount = amount;
  }

  /**
   * Creates the standard plate list for LB type plates.
   *
   * @returns list of standard lb type plates.
   */
  static createStandardLB(): Array<StandardPlate> {
    return [
      new StandardPlate(1.25, 0),
      new StandardPlate(2.5, 0),
      new StandardPlate(5, 0),
      new StandardPlate(10, 0),
      new StandardPlate(25, 0),
      new StandardPlate(35, 0),
      new StandardPlate(45, 0),
      new StandardPlate(55, 0),
      new StandardPlate(65, 0),
      new StandardPlate(100, 0),
    ];
  }

  /**
   *
   */
  static createStandardKb(): Array<StandardPlate> {
    return [
      new StandardPlate(0.5, 0),
      new StandardPlate(1.25, 0),
      new StandardPlate(2.5, 0),
      new StandardPlate(5, 0),
      new StandardPlate(10, 0),
      new StandardPlate(15, 0),
      new StandardPlate(20, 0),
      new StandardPlate(25, 0),
      new StandardPlate(50, 0),
    ];
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
// TODO: Create two config objects based on KB and LB and save it to async storage.
export class DefaultPlateConfig implements PlateConfig {
  KgMultiplier: number = 0.453592;
  standardPlates: Array<Plate> = StandardPlate.createStandardLB();
  conversionType: WeightConversions = WeightConversions.Pounds;
  barbellWeight: number = 45;
  useLimitedPlates: boolean = false;
  selectedPlates: Set<number> = new Set([2.5, 5, 10, 25, 35, 45]);

  static createStandardSelectionKB(): Set<number> {
    return new Set([2.5, 5, 10, 25, 35, 45]);
  }

  static createStandardSelectionLB(): Set<number> {
    return new Set([2.5, 5, 10, 25, 35, 45]);
  }

  // Default constructor.
  constructor();
  constructor(config: DefaultPlateConfig);

  // A copy constructor.
  constructor(config?: DefaultPlateConfig) {
    if (config !== undefined) {
      this.barbellWeight = config.barbellWeight;
      this.standardPlates = StandardPlate.createStandardLB();
      this.selectedPlates = new Set(config.selectedPlates);
      this.conversionType = config.conversionType;
      this.useLimitedPlates = config.useLimitedPlates;
    }
  }

  /**
   * Transform all plate weight types to kilograms from pounds
   */
  toKg(): PlateConfig {
    this.conversionType = WeightConversions.Kilograms;
    this.barbellWeight = this.barbellWeight * this.KgMultiplier;
    this.standardPlates = StandardPlate.createStandardKb();
    this.selectedPlates = new Set();
    return this;
  }

  /**
   * Transform all plate weights from kilograms to pounds.
   */
  toLb(): PlateConfig {
    this.conversionType = WeightConversions.Pounds;
    this.barbellWeight = this.barbellWeight / this.KgMultiplier;
    this.standardPlates = StandardPlate.createStandardLB();
    this.selectedPlates = new Set();
    return this;
  }
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

  console.log(availablePlates);
  console.log(barbellWeight);

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

const getRequiredPlatesLimited = {};

/**
 * Calculate the required plates needed for the target weight, this function accepts a plate
 * config object that will determine how calculations results are formatted.
 *
 * @param targetWeight The target weight to add the plate types up to.
 * @param config The plate configuration that will determine how the plate results are calculated.
 * @returns @see getRequiredPlates
 */
const calcRequiredPlates = (
  targetWeight: number,
  config: PlateConfig
): { plates?: Array<Plate>; leftoverWeight: number } => {
  const {
    barbellWeight,
    standardPlates: availablePlates,
    selectedPlates,
  } = config;
  let userSelectedPlates = availablePlates;
  // Check if configuration is set to use the amount of available plates.
  if (!config.useLimitedPlates) {
    userSelectedPlates = userSelectedPlates.filter((plate) =>
      selectedPlates.has(plate.type)
    );
  }
  return getRequiredPlates(targetWeight, barbellWeight, userSelectedPlates);
};

export default {
  calcRequiredPlates,
  DefaultPlateConfig,
};
