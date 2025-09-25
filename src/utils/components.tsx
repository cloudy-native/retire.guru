/**
 * Reusable UI components
 */

import React from "react";
import {
	Box,
	BoxProps,
	FormControl,
	FormHelperText,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from "@chakra-ui/react";
import { FormNumberInputProps } from "./types";

/**
 * A container for charts with responsive sizing
 */
export interface ChartContainerProps extends BoxProps {
	children: React.ReactNode;
	height?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
	children,
	height = 300,
	...boxProps
}) => {
	return (
		<Box height={`${height}px`} width="100%" {...boxProps}>
			{children}
		</Box>
	);
};

/**
 * A form component for number inputs with formatting and validation
 */
export const FormNumberInput: React.FC<FormNumberInputProps> = ({
	value,
	onChange,
	helperText,
	placeholder,
	min,
	max,
	step,
}) => {
	// Keep an internal string so users can type intermediate values like "8." safely
	const [input, setInput] = React.useState<string>(
		typeof value === "number" && !Number.isNaN(value) ? String(value) : "",
	);

	// When the external numeric value changes (e.g., via steppers), reflect it
	React.useEffect(() => {
		const next =
			typeof value === "number" && !Number.isNaN(value) ? String(value) : "";
		// Only update if different and current input is not an intermediate state ending with a dot
		if (input !== next && !input.endsWith(".")) {
			setInput(next);
		}
	}, [value, input]);

	const handleChange = (valueAsString: string, valueAsNumber: number) => {
		setInput(valueAsString);

		// Allow empty value during typing
		if (valueAsString === "") {
			onChange(valueAsString, 0);
			return;
		}

		// If still not a valid number (e.g., "8."), do not push numeric update yet
		if (Number.isNaN(valueAsNumber)) {
			return;
		}

		onChange(valueAsString, valueAsNumber);
	};

	const handleBlur = () => {
		// On blur, normalize input to a valid number within bounds
		if (input === "") return;
		let num = Number.parseFloat(input);
		if (Number.isNaN(num)) {
			// revert to last numeric value
			num = typeof value === "number" && !Number.isNaN(value) ? value : 0;
		}
		if (typeof min === "number") num = Math.max(min, num);
		if (typeof max === "number") num = Math.min(max, num);
		// round to precision=2 like the control
		const rounded = Number(num.toFixed(2));
		setInput(String(rounded));
		onChange(String(rounded), rounded);
	};

	return (
		<FormControl>
			<NumberInput
				value={input}
				onChange={handleChange}
				min={min}
				max={max}
				step={step}
				precision={2}
				keepWithinRange={true}
				clampValueOnBlur={true}
			>
				<NumberInputField
					placeholder={placeholder}
					inputMode="decimal"
					pattern="[0-9]*[.,]?[0-9]*"
					onBlur={handleBlur}
				/>
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
};
