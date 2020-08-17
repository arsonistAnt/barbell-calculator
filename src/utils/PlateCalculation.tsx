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
      this.standardPlates = config.standardPlates.slice();
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
 * Lazy method: Use the heaviest to the lightest weight to calculate the list of plates needed.
 * Note: Ignores the amount of plates there are and assumes the user has all the plates needed to get the required target weight.
 * EX: List of availabe plates [45,35,25] sorted from greatest to least. 45lbs would be used then 35lb then 25lb etc...
 *
 * @param availablePlates array of available
 * @param sideTarget the target weight on each side of the babell. (e.g. barbell weight = 45, target weight = 135 => targetWeight - barbellWeight  => 90 / 2 => 45 is the sideTarget)
 * @return the list of plates needed to add to the targetWeight and left over target weight. (e.g. {plate? : Array<Plate>, leftoverWeight : number})
 */
const calculateStandard = (
  sideTarget: number,
  availablePlates: Array<Plate>
): { plates?: Array<Plate>; leftoverWeight: number } => {
  const requiredPlates = new Array<Plate>();
  // Since we're using pop() for Array, the array will be sorted from least to greatest. [25,35,45] <== 45lb will be popped and removed.
  availablePlates = availablePlates.sort(
    (a: Plate, b: Plate) => a.type - b.type
  );
  while (sideTarget != 0 && availablePlates.length) {
    const currHeaviestPlate: Plate =
      availablePlates[availablePlates.length - 1];
    if (currHeaviestPlate.type <= sideTarget) {
      const amountNeeded = Math.trunc(sideTarget / currHeaviestPlate.type);
      if (amountNeeded != 0) {
        requiredPlates.push(
          new StandardPlate(currHeaviestPlate.type, amountNeeded)
        );
      }
      sideTarget = sideTarget % currHeaviestPlate.type;
    } else {
      availablePlates.pop();
    }
  }
  return { plates: requiredPlates, leftoverWeight: sideTarget };
};

/**
 * Uses the same lazy method as @see calculateStandard but limits the calculation by how
 * many plates are actually available in the Plate.amount property.
 *
 * @param availablePlates array of available
 * @param sideTarget the target weight on each side of the babell. (e.g. barbell weight = 45, target weight = 135 => targetWeight - barbellWeight  => 90 / 2 => 45 is the sideTarget)
 * @return the list of plates needed to add to the targetWeight and left over target weight. (e.g. {plate? : Array<Plate>, leftoverWeight : number})
 */
const calculateLimited = (
  sideTarget: number,
  availablePlates: Array<Plate>
): { plates?: Array<Plate>; leftoverWeight: number } => {
  const requiredPlates = new Array<Plate>();
  // Since we're using pop() for Array, the array will be sorted from least to greatest. [25,35,45] <== 45lb will be popped and removed.
  availablePlates = availablePlates.sort(
    (a: Plate, b: Plate) => a.type - b.type
  );
  // Get the required plates needed with plate amount limitations in mind.
  while (sideTarget > 0 && availablePlates.length) {
    const currentPlate = availablePlates[availablePlates.length - 1];
    // The amount in the plate represents the actual total amount the user has, we need to halve it to properly calculate for plates needed PER SIDE.
    const currentAmountPerSide = Math.trunc(currentPlate.amount / 2);
    const amountNeeded = Math.trunc(sideTarget / currentPlate.type);
    const newPlate = new StandardPlate(currentPlate.type, 0);
    if (amountNeeded > 0 && currentAmountPerSide != 0) {
      if (amountNeeded <= currentAmountPerSide) {
        newPlate.amount = amountNeeded;
      } else {
        newPlate.amount = currentAmountPerSide;
      }
      // The amount property in the Plate object is considered amount PER SIDE.
      requiredPlates.push(newPlate);
      // Calculate remaining side target weight.
      sideTarget = Math.abs(sideTarget - newPlate.type * currentAmountPerSide);
    }
    availablePlates.pop();
  }
  return { plates: requiredPlates, leftoverWeight: sideTarget };
};

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
  // Target weight must be a value > 0 or else return default {undefined, -1} object.
  if (targetWeight <= 0) {
    return { plates: undefined, leftoverWeight: -1 };
  }
  const { barbellWeight, standardPlates, selectedPlates } = config;
  let userSelectedPlates = standardPlates;
  // Calculate the amount of weight per side needed on the barbell.
  const sideTarget = Math.abs(targetWeight - barbellWeight) / 2;

  // Check if configuration is set to use the amount of available plates.
  if (!config.useLimitedPlates) {
    userSelectedPlates = userSelectedPlates.filter((plate) =>
      selectedPlates.has(plate.type)
    );
    return calculateStandard(sideTarget, userSelectedPlates);
  } else {
    userSelectedPlates = userSelectedPlates.filter((plate) => plate.amount > 0);
    return calculateLimited(sideTarget, userSelectedPlates);
  }
};

export default {
  calcRequiredPlates,
  DefaultPlateConfig,
};
