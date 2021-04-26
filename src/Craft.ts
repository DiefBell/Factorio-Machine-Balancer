import { ICraft } from "./ICraft";
import { Fraction } from "./Fraction";

export class Craft
{
	constructor(craft : ICraft)
	{
		this._craftName = craft.name;
		this._machineName = craft.machine;
		this._machineSpeed = new Fraction(craft.speed);  // scalar
		this._craftTime = new Fraction(craft.time);  // seconds per craft
		this._craftInputAmount = craft.input;  // input items per craft
		this._craftOutputAmount = craft.output;  // output items per craft

		console.log(`\n==== Calculating craft rates for ${this._machineName} crafting ${this._craftName}. ====`);
		this._craftRate = Fraction.divide(this._machineSpeed, this._craftTime);  // crafts per second
		this._inputPerSecond = Fraction.multiply(this._craftRate, this._craftInputAmount);  // input per second
		this._outputPerSecond = Fraction.multiply(this._craftRate, this._craftOutputAmount);  // output per second

		console.log(`Craft rate: ${this._craftRate.toString()}`);
		console.log(`Input per second: ${this._inputPerSecond.toString()}`);
		console.log(`Output per second: ${this._outputPerSecond.toString()}`);
	}

	private _craftName : string;
	public get craftName() { return this._craftName; }
	private _machineName : string;
	public get machineName() { return this._machineName; }
	protected _machineSpeed : Fraction;
	protected _craftTime : Fraction;
	protected _craftInputAmount : number; // integer
	protected _craftOutputAmount : number; // integer

	protected _craftRate : Fraction;
	protected _inputPerSecond : Fraction;
	public get inputPerSecond() { return this._inputPerSecond; }
	private _outputPerSecond : Fraction;
	public get outputPerSecond() { return this._outputPerSecond; }
}