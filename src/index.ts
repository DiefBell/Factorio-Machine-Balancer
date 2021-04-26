import { readFileSync, PathLike } from "fs";
import { Craft } from "./Craft";
import { Fraction } from "./Fraction";
import { ICraft } from "./ICraft";
import { lowestCommonMultiple } from "./lowestCommonMultiple";
import { jsonc } from "jsonc";


type CraftsFileFormat = { crafts : Array<ICraft> };
const craftsFilePath : PathLike = process.argv[2];

const rawCrafts = readFileSync(craftsFilePath, "utf8");
const craftsJson = jsonc.parse(rawCrafts) as CraftsFileFormat;

const crafts = craftsJson["crafts"].map((c) => new Craft(c));


console.log("\n==== Calculating ratio between machines ====");
const ratiosBetweenMachines = new Array<Fraction>();
for(let i = 0; i < crafts.length - 1; i++)
{
	const ratio = Fraction.divide(crafts[i].outputPerSecond, crafts[i + 1].inputPerSecond);
	ratiosBetweenMachines.push(ratio);
}
console.log(ratiosBetweenMachines);


console.log("\n==== Calculating machine ratios relative to first machine ====");
const ratiosFromFirst : Fraction[] = [ new Fraction(1) ];
for(let i = 0; i < ratiosBetweenMachines.length; i++)
{
	const ratio = Fraction.multiply(ratiosBetweenMachines[i], ratiosFromFirst[i]);
	ratiosFromFirst.push(ratio);
}
console.log(ratiosFromFirst);


console.log("\n==== Calculating final machine ratios ====");
const lcm = lowestCommonMultiple(...ratiosFromFirst.map((r) => r.denominator));
const machineNumbers = new Array<number>();

for(const ratio of ratiosFromFirst)
{
	machineNumbers.push(Fraction.multiply(ratio, lcm).numerator);
}

console.log(machineNumbers);


console.log("\n==== Final Machine Numbers ====");
for(let i = 0; i < crafts.length; i++)
{
	console.log(`"${crafts[i].machineName}" crafting "${crafts[i].craftName}": ${machineNumbers[i]}`);
}

const scalar = parseInt(process.argv[3]);
if(scalar)
{
	console.log("\n==== Approximate Machine Numbers ====");
	const scaledMachineNumbers = machineNumbers.map((mn) => (mn/scalar).toFixed(1));
	for(let i = 0; i < crafts.length; i++)
	{
		console.log(`"${crafts[i].machineName}" crafting "${crafts[i].craftName}": ${scaledMachineNumbers[i]}`);
	}
}

console.log();