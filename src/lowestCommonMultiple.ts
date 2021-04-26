///<reference path="./typings/compute-gcd.d.ts" />
import highestCommonFactor from "compute-gcd";

export const lowestCommonMultiple = (...nums : number[]) : number =>
{
	const product = nums.reduce((prev, curr) => prev * curr);
	const hcf = highestCommonFactor(nums);

	return product / hcf;
};