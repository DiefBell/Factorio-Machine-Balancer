///<reference path="./typings/compute-gcd.d.ts" />
import highestCommonFactor from "compute-gcd";

export class Fraction
{
	constructor(numerator : number, denominator? : number)
	{
		if(denominator === undefined)
		{
			if(numerator.toString().includes("."))
			{
				const len = numerator.toString().length - 2;

				denominator = Math.pow(10, len);
				numerator = numerator * denominator;
			}
			else
			{
				denominator = 1;
			}
		}
		
		console.log(`${numerator}/${denominator}`);

		const divisor = highestCommonFactor([ numerator, denominator ]);
	
		this._numerator = numerator / divisor;
		this._denominator = denominator / divisor;
	}

	// @ts-ignore
	protected _numerator : number;
	// @ts-ignore
	protected _denominator : number;

	public get numerator() { return this._numerator; }
	public get denominator() { return this._denominator; }

	public static multiply(fract : Fraction, multiplier : Fraction | number) : Fraction
	{
		if(multiplier instanceof Fraction)
		{
			return new Fraction(fract._numerator * multiplier._numerator, fract._denominator * multiplier._denominator);
		}
		return new Fraction(fract._numerator * multiplier, fract.denominator);
	}

	public static divide(fract : Fraction, divisor : Fraction | number) : Fraction
	{
		if(divisor instanceof Fraction)
		{
			return new Fraction(fract._numerator * divisor._denominator, fract._denominator * divisor.numerator);
		}
		return new Fraction(fract._numerator / divisor, fract.denominator);
	}

	public toString() { return `${this._numerator}/${this._denominator}`; }
}