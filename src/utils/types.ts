/**
 * Common type definitions
 */

export interface ScenarioRow {
	year: number;
	ssMonthly: number;
	requiredFrom401kMonthly: number;
	totalMonthlyIncome: number;
	startingBalance: number;
	yearlyReturn: number;
	endingBalance: number;
	withdrawalRate: string;
	// Buying power (today's dollars)
	inflationIndex: number; // cumulative inflation factor for this year
	ssMonthlyReal: number;
	requiredFrom401kMonthlyReal: number;
	totalMonthlyIncomeReal: number;
	startingBalanceReal: number;
	yearlyReturnReal: number;
	endingBalanceReal: number;
}

export interface ChartData {
	year: number;
	Balance: number;
	BalanceReal: number;
}

export interface FinancialParams {
	inflationRatePercent: number;
	initialBalance: number;
	desiredMonthlyIncome: number;
	socialSecurity: number;
	colaAdjustment: number;
	investmentReturn: number;
}

export interface FormNumberInputProps {
	value: number;
	onChange: (valueAsString: string, valueAsNumber: number) => void;
	helperText: string;
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
}
