import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Alert,
	AlertIcon,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Tooltip as ChakraTooltip,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	calculateScenario,
	ChartContainer,
	type ChartData,
	type FinancialParams,
	formatCurrency,
	formatLargeCurrency,
	FormNumberInput,
	prepareChartData,
	type ScenarioRow,
	updateFinancialParam,
} from "../utils";

const computeMonthlyFromPIA = (
	pia: number,
	claimAge: number,
	fraAge: number,
): number => {
	const minAge = 62;
	const maxAge = 70;
	const clamped = Math.min(maxAge, Math.max(minAge, claimAge));
	const monthsDiff = Math.round((clamped - fraAge) * 12); // positive if after FRA
	let factor = 1;
	if (monthsDiff < 0) {
		const earlyMonths = Math.abs(monthsDiff);
		const first36 = Math.min(36, earlyMonths);
		const additional = Math.max(0, earlyMonths - 36);
		const reductionPct =
			first36 * (5 / 9) * 0.01 + additional * (5 / 12) * 0.01; // convert to decimal
		factor = 1 - reductionPct;
	} else if (monthsDiff > 0) {
		const delayedCreditPct = monthsDiff * (2 / 3) * 0.01; // 2/3 of 1% per month
		factor = 1 + delayedCreditPct;
	}
	return Math.max(0, Math.round(pia * factor));
};
// ======== Component: MoneyInputCard ========
interface MoneyInputCardProps {
	initialBalance: number;
	desiredMonthlyIncome: number;
	socialSecurity: number;
	onChangeInitialBalance: (
		valueAsString: string,
		valueAsNumber: number,
	) => void;
	onChangeDesiredMonthlyIncome: (
		valueAsString: string,
		valueAsNumber: number,
	) => void;
	onChangeSocialSecurity: (
		valueAsString: string,
		valueAsNumber: number,
	) => void;
}

const MoneyInputCard: React.FC<MoneyInputCardProps> = ({
	initialBalance,
	desiredMonthlyIncome,
	socialSecurity,
	onChangeInitialBalance,
	onChangeDesiredMonthlyIncome,
	onChangeSocialSecurity,
}) => {
	return (
		<Card
			bgColor="blue.50"
			boxShadow="lg"
			borderColor="blue.100"
			borderWidth="1px"
		>
			<CardHeader>
				<Heading size={"lg"}>Your Financials</Heading>
				<Text>Enter your retirement details to see projections.</Text>
			</CardHeader>

			<CardBody>
				<SimpleGrid columns={3} spacing={10}>
					<FormNumberInput
						value={initialBalance}
						onChange={onChangeInitialBalance}
						placeholder="Enter starting balance..."
						helperText="Current 401(k) or retirement savings balance"
						step={10000}
					/>

					<FormNumberInput
						value={socialSecurity}
						onChange={onChangeSocialSecurity}
						placeholder="Enter Social Security..."
						helperText="Your expected monthly Social Security benefit"
						step={1}
					/>

					<FormNumberInput
						value={desiredMonthlyIncome}
						onChange={onChangeDesiredMonthlyIncome}
						placeholder="Enter total monthly income..."
						helperText="Total monthly income needed in retirement"
						step={100}
					/>
				</SimpleGrid>
			</CardBody>
		</Card>
	);
};

// ======== Component: WithdrawalPreviewCard ========
interface WithdrawalPreviewCardProps {
	scenarioData: ScenarioRow[];
	currentYear: number;
}

const WithdrawalPreviewCard: React.FC<WithdrawalPreviewCardProps> = ({
	scenarioData,
	currentYear,
}) => {
	const previewYears = React.useMemo(() => [0, 1, 4, 9], []); // Years 1, 2, 5, 10 (index 0-based)

	return (
		<Card
			bgColor="teal.50"
			boxShadow="lg"
			borderColor="teal.100"
			borderWidth="1px"
		>
			<CardHeader>
				<Heading size={"lg"}>Income Preview</Heading>
				<Text mb={2}>Your projected income for key retirement years.</Text>
				<Text fontSize="sm" color="gray.600">
					Social Security increases with COLA each year • Monthly goal rises
					with inflation • 401(k) withdrawal is the difference • Balance grows
					with investment returns •{" "}
					<Box as="span" fontWeight="medium">
						⚠️ Warning appears when withdrawal rate exceeds 4% rule
					</Box>
				</Text>
			</CardHeader>

			<CardBody>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
					{previewYears.map((yearIndex) => {
						// Check if we have data for this year
						if (yearIndex < scenarioData.length) {
							const data = scenarioData[yearIndex];
							const yearNumber = yearIndex + 1; // Convert to 1-based for display

							return (
								<Box
									key={yearIndex}
									p={4}
									borderWidth="1px"
									borderRadius="lg"
									borderColor="teal.200"
									bgColor="white"
								>
									<Heading size="md" mb={3}>
										Year {yearNumber} ({currentYear + yearIndex})
									</Heading>
									<VStack align="start" spacing={2} width="100%">
										<Box width="100%">
											<Text fontWeight="bold">Monthly Goal:</Text>
											<Text fontSize="lg">
												{formatCurrency(data.totalMonthlyIncome)}
											</Text>
										</Box>
										<Box width="100%">
											<Text fontWeight="bold">Social Security:</Text>
											<Text fontSize="lg">
												{formatCurrency(data.ssMonthly)}
											</Text>
										</Box>
										<Box width="100%">
											<Text fontWeight="bold">401(k) Withdrawal:</Text>
											<Flex alignItems="center">
												<VStack align="flex-start" spacing={0}>
													<Text fontSize="lg">
														{formatCurrency(data.requiredFrom401kMonthly)}
													</Text>
													<Text
														fontSize="xs"
														color={
															parseFloat(data.withdrawalRate) > 4
																? "orange.500"
																: "gray.500"
														}
													>
														{data.withdrawalRate}% withdrawal rate
													</Text>
												</VStack>
												{parseFloat(data.withdrawalRate) > 4 && (
													<ChakraTooltip
														label={`This withdrawal rate (${data.withdrawalRate}%) is higher than the recommended 4% safe withdrawal rate.`}
														placement="top"
													>
														<Box
															as="span"
															color="orange.500"
															ml={2}
															fontSize="lg"
														>
															⚠️
														</Box>
													</ChakraTooltip>
												)}
											</Flex>
										</Box>
										<Box width="100%">
											<Text fontWeight="bold">401(k) Balance:</Text>
											<Text fontSize="lg">
												{formatLargeCurrency(data.endingBalance)}
											</Text>
										</Box>
									</VStack>
								</Box>
							);
						}

						// If no data for this year (funds depleted), show empty state
						return (
							<Box
								key={yearIndex}
								p={4}
								borderWidth="1px"
								borderRadius="lg"
								borderColor="red.200"
								bgColor="white"
							>
								<Heading size="md" mb={3}>
									Year {yearIndex + 1} ({currentYear + yearIndex})
								</Heading>
								<Box width="100%">
									<Text color="red.500" fontSize="lg">
										Retirement funds depleted
									</Text>
								</Box>
							</Box>
						);
					})}
				</SimpleGrid>
			</CardBody>
		</Card>
	);
};

// ======== Component: BalanceProjectionCard ========
interface BalanceProjectionCardProps {
	chartData: ChartData[];
	inflationRatePercent: number;
	colaAdjustment: number;
	investmentReturn: number;
	socialSecurity: number;
}

const BalanceProjectionCard: React.FC<BalanceProjectionCardProps> = ({
	chartData,
	inflationRatePercent,
	colaAdjustment,
	investmentReturn,
	socialSecurity,
}) => {
	return (
		<Card
			bgColor="green.50"
			boxShadow="lg"
			borderColor="green.100"
			borderWidth="1px"
		>
			<CardHeader>
				<Heading size={"lg"}>Savings Projection</Heading>
				<Text>
					This chart shows your 401(k) balance over time in both nominal dollars
					and buying power (inflation-adjusted to today's dollars). Adjust your
					inputs to see how they affect your long-term savings.
				</Text>
			</CardHeader>
			<CardBody>
				<VStack spacing={4} align="stretch">
					<ChartContainer>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={chartData}
								margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="year"
									label={{
										value: "Year",
										position: "insideBottomRight",
										offset: -10,
									}}
								/>
								<YAxis
									tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
									label={{
										angle: -90,
										position: "insideLeft",
									}}
								/>
								{/* <Tooltip content={TooltipContent} /> */}
								<Tooltip />
								<Legend />
								<Line
									dataKey="Balance"
									name="Balance (Nominal)"
									stroke="#4C6FFF"
									strokeWidth={3}
									dot={{ r: 3 }}
								/>
								<Line
									dataKey="BalanceReal"
									name="Balance (Buying Power)"
									stroke="#22C55E"
									strokeDasharray="5 5"
									strokeWidth={3}
									dot={{ r: 0 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</VStack>
			</CardBody>
			<CardFooter>
				<Alert status="info" fontSize="sm">
					<AlertIcon />
					Assumptions: Inflation {inflationRatePercent}%, COLA {colaAdjustment}
					%, Investment return {investmentReturn}%, Social Security{" "}
					{formatCurrency(socialSecurity)}/month
				</Alert>
			</CardFooter>
		</Card>
	);
};

// ======== Component: DetailedProjectionCard ========
interface DetailedProjectionCardProps {
	scenarioData: ScenarioRow[];
}

const DetailedProjectionCard: React.FC<DetailedProjectionCardProps> = ({
	scenarioData,
}) => {
	return (
		<Box px={4}>
			<Text mb={2} fontSize="sm">
				All income figures are monthly. "Buying power" shows values in today's
				dollars (inflation-adjusted). A negative withdrawal rate means you're
				adding to savings.
			</Text>

			<TableContainer>
				<Table size="sm">
					<Thead>
						<Tr>
							<Th>Year</Th>
							<Th isNumeric>Social Security</Th>
							<Th isNumeric>401(k) Draw</Th>
							<Th isNumeric>Total</Th>
							<Th isNumeric>Balance</Th>
							<Th isNumeric>Total (Buying Power)</Th>
							<Th isNumeric>Balance (Buying Power)</Th>
							<Th isNumeric>Rate</Th>
						</Tr>
					</Thead>
					<Tbody>
						{scenarioData.slice(0, 30).map((row) => (
							<Tr key={row.year}>
								<Td isNumeric>{row.year}</Td>
								<Td isNumeric>{formatCurrency(row.ssMonthly)}</Td>
								<Td isNumeric>{formatCurrency(row.requiredFrom401kMonthly)}</Td>
								<Td isNumeric>{formatCurrency(row.totalMonthlyIncome)}</Td>
								<Td isNumeric>{formatCurrency(row.endingBalance)}</Td>
								<Td isNumeric>{formatCurrency(row.totalMonthlyIncomeReal)}</Td>
								<Td isNumeric>{formatCurrency(row.endingBalanceReal)}</Td>
								<Td isNumeric>
									<ChakraTooltip
										label={`This withdrawal rate (${row.withdrawalRate}%) is ${parseFloat(row.withdrawalRate) <= 4 ? "within" : "above"} the recommended 4% safe withdrawal rate.`}
										placement="top"
									>
										<Box
											as="span"
											position="relative"
											_hover={{
												textDecoration: "underline",
												cursor: "help",
											}}
										>
											{row.withdrawalRate}%
										</Box>
									</ChakraTooltip>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

// ======== Component: EconomyInputCard ========
interface EconomyInputCardProps {
	inflationRatePercent: number;
	colaAdjustment: number;
	investmentReturn: number;
	onChangeInflationRatePercent: (
		valueAsString: string,
		valueAsNumber: number,
	) => void;
	onChangeColaAdjustment: (
		valueAsString: string,
		valueAsNumber: number,
	) => void;
	onChangeInvestmentReturn: (
		valueAsString: string,
		valueAsNumber: number,
	) => void;
}

const EconomyInputCard: React.FC<EconomyInputCardProps> = ({
	inflationRatePercent,
	colaAdjustment,
	investmentReturn,
	onChangeInflationRatePercent,
	onChangeColaAdjustment,
	onChangeInvestmentReturn,
}) => {
	return (
		<Card
			colorScheme=""
			bgColor="yellow.50"
			boxShadow="lg"
			borderColor="yellow.100"
			borderWidth="1px"
		>
			<CardHeader>
				<Heading size={"lg"}>Economic Assumptions</Heading>
				<Text mb={2}>
					Adjust these values to match your expectations for inflation, Social
					Security increases, and investment returns.
				</Text>
				<Text fontSize="sm" color="gray.600">
					The 20-year rate of inflation is 2.4%, while Social Security
					cost-of-living adjustment (COLA) is 2.3%. The S&amp;P500 yields 10.3%
					in the same period, while bond yields are in the 4.3-4.7% range.
					Common guidance is a 60/40 stocks/bonds mix, which puts the 20-year
					return at 8%.
				</Text>
			</CardHeader>

			<CardBody>
				<SimpleGrid columns={3} spacing={10}>
					<FormNumberInput
						value={inflationRatePercent}
						onChange={onChangeInflationRatePercent}
						placeholder="Enter inflation rate..."
						helperText="Rate of inflation (%)"
						min={0}
						max={100}
						step={0.1}
					/>

					<FormNumberInput
						value={colaAdjustment}
						onChange={onChangeColaAdjustment}
						placeholder="Enter COLA adjustment..."
						helperText="SSA cost-of-living adjustment (COLA) (%)"
						min={0}
						max={100}
						step={0.1}
					/>

					<FormNumberInput
						value={investmentReturn}
						onChange={onChangeInvestmentReturn}
						placeholder="Enter return rate..."
						helperText="Expected investment return (%)"
						min={0}
						max={100}
						step={0.1}
					/>
				</SimpleGrid>
			</CardBody>
		</Card>
	);
};

interface SocialSecurityTimingCardProps {
	initialPIAMonthly: number; // Monthly benefit at FRA (PIA) for initialization only
	colaAdjustment: number;
	onUpdateMonthlySS: (newMonthly: number) => void; // updates financialParams.socialSecurity
}

const SocialSecurityTimingCard: React.FC<SocialSecurityTimingCardProps> = ({
	initialPIAMonthly,
	colaAdjustment,
	onUpdateMonthlySS,
}) => {
	// Local state
	const currentYear = new Date().getFullYear();
	const [birthYear, setBirthYear] = useState<number>(1960);
	const [piaMonthly, setPiaMonthly] = useState<number>(initialPIAMonthly);
	const [claimingAge, setClaimingAge] = useState<number>(67); // default around FRA for modern cohorts
	const [isClaimingAgeDragging, setIsClaimingAgeDragging] =
		useState<boolean>(false);

	// Compute FRA based on birth year
	const getFRA = (
		by: number,
	): { years: number; months: number; age: number; label: string } => {
		// Source: SSA rules simplified; common cohorts
		let years = 67;
		let months = 0;
		if (by <= 1937) {
			years = 65;
			months = 0;
		} else if (by <= 1942) {
			years = 65;
			months = (by - 1937) * 2; // 65y 2m to 65y 10m
		} else if (by <= 1954) {
			years = 66;
			months = 0;
		} else if (by === 1955) {
			years = 66;
			months = 2;
		} else if (by === 1956) {
			years = 66;
			months = 4;
		} else if (by === 1957) {
			years = 66;
			months = 6;
		} else if (by === 1958) {
			years = 66;
			months = 8;
		} else if (by === 1959) {
			years = 66;
			months = 10;
		} else if (by >= 1960) {
			years = 67;
			months = 0;
		}
		const age = years + months / 12;
		const label = `${years}y ${months}m`;
		return { years, months, age, label };
	};

	const fra = getFRA(birthYear);

	// Compute adjusted monthly based on claiming age vs FRA
	const selectedMonthly = computeMonthlyFromPIA(
		piaMonthly,
		claimingAge,
		fra.age,
	);
	const monthlyAt62 = computeMonthlyFromPIA(piaMonthly, 62, fra.age);
	const monthlyAtFRA = computeMonthlyFromPIA(piaMonthly, fra.age, fra.age);
	const monthlyAt70 = computeMonthlyFromPIA(piaMonthly, 70, fra.age);

	// No automatic syncing. User applies changes via buttons below.

	const pctVsPIA =
		piaMonthly > 0
			? (((selectedMonthly - piaMonthly) / piaMonthly) * 100).toFixed(0)
			: "0";

	const formatAgeLabel = React.useCallback((age: number): string => {
		const years = Math.floor(age);
		const months = Math.round((age - years) * 12);
		if (months === 12) {
			return `${years + 1}y`;
		}
		return months > 0 ? `${years}y ${months}m` : `${years}y`;
	}, []);

	const formattedClaimingAge = formatAgeLabel(claimingAge);

	const sliderMin = 62;
	const sliderMax = 70;
	const sliderStep = 0.5;

	const sliderMarks = React.useMemo(() => {
		const steps = Math.round((sliderMax - sliderMin) / sliderStep);
		return Array.from({ length: steps + 1 }, (_, index) => {
			const age = sliderMin + index * sliderStep;
			return {
				value: parseFloat(age.toFixed(1)),
				label: formatAgeLabel(age),
				monthly: computeMonthlyFromPIA(piaMonthly, age, fra.age),
			};
		});
	}, [formatAgeLabel, fra.age, piaMonthly]);

	type ClaimOption = {
		key: string;
		age: number;
		label: string;
		monthly: number;
	};

	const claimOptions = React.useMemo<ClaimOption[]>(() => {
		const optionMap = new Map<string, ClaimOption>();
		const addOption = (age: number, monthly: number) => {
			if (!Number.isFinite(monthly) || monthly <= 0) {
				return;
			}
			const roundedAgeForKey = Math.round(age * 12);
			const key = `claim_${roundedAgeForKey}`;
			if (!optionMap.has(key)) {
				optionMap.set(key, {
					key,
					age,
					label: formatAgeLabel(age),
					monthly,
				});
			}
		};

		addOption(62, monthlyAt62);
		addOption(fra.age, monthlyAtFRA);
		addOption(70, monthlyAt70);
		addOption(claimingAge, selectedMonthly);

		return Array.from(optionMap.values()).sort((a, b) => a.age - b.age);
	}, [
		monthlyAt62,
		monthlyAtFRA,
		monthlyAt70,
		claimingAge,
		selectedMonthly,
		formatAgeLabel,
		fra.age,
	]);

	type CumulativePoint = {
		age: number;
		ageLabel: string;
		[key: string]: number | string;
	};

	const cumulativeBenefitData = React.useMemo<CumulativePoint[]>(() => {
		const baseAge = 62;
		const horizonYears = 30;
		const rows: CumulativePoint[] = Array.from(
			{ length: horizonYears + 1 },
			(_, idx) => {
				const age = baseAge + idx;
				return {
					age,
					ageLabel: formatAgeLabel(age),
				};
			},
		);

		claimOptions.forEach((option) => {
			const startMonth = Math.round((option.age - baseAge) * 12);
			let cumulative = 0;
			for (let yearIndex = 0; yearIndex <= horizonYears; yearIndex++) {
				const yearStartMonth = yearIndex * 12;
				for (let month = 0; month < 12; month++) {
					const currentMonth = yearStartMonth + month;
					if (currentMonth >= startMonth) {
						const yearsSinceClaim = Math.floor(
							(currentMonth - startMonth) / 12,
						);
						const monthlyBenefit =
							option.monthly * (1 + colaAdjustment / 100) ** yearsSinceClaim;
						cumulative += monthlyBenefit;
					}
				}
				rows[yearIndex][option.key] = cumulative;
			}
		});

		return rows;
	}, [claimOptions, colaAdjustment, formatAgeLabel]);

	const lineColors = ["#4C6FFF", "#22C55E", "#F97316", "#A855F7"];

	return (
		<Card
			bgColor="purple.50"
			boxShadow="lg"
			borderColor="purple.100"
			borderWidth="1px"
		>
			<CardHeader>
				<Heading size="lg">Social Security Timing</Heading>
				<Text>
					Primary Insurance Amount (PIA) is the monthly benefit you would
					receive at Full Retirement Age (FRA). Use the slider to set your
					expected monthly benefit for the plan.
				</Text>
			</CardHeader>
			<CardBody>
				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
					<FormNumberInput
						value={birthYear}
						onChange={(_, val) => setBirthYear(val)}
						placeholder="Birth year..."
						helperText={`Birth Year (FRA: ${fra.label})`}
						min={1900}
						max={currentYear}
						step={1}
					/>
					<FormNumberInput
						value={piaMonthly}
						onChange={(_, val) => setPiaMonthly(val)}
						placeholder="PIA at FRA (monthly)..."
						helperText="PIA (monthly at FRA)"
						step={1}
					/>
				</SimpleGrid>

				<Box mt={6}>
					<HStack justifyContent="space-between" mb={2}>
						<Text fontSize="sm" color="gray.600">
							Select claiming age
						</Text>
						<Text fontSize="sm" fontWeight="medium">
							{formattedClaimingAge}
						</Text>
					</HStack>
					<Box position="relative" pb={12} px={1}>
						<Slider
							aria-label="Claiming age"
							min={sliderMin}
							max={sliderMax}
							step={sliderStep}
							value={claimingAge}
							onChange={(value) => setClaimingAge(value)}
							onChangeStart={() => setIsClaimingAgeDragging(true)}
							onChangeEnd={() => setIsClaimingAgeDragging(false)}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							{sliderMarks.map((mark) => (
								<React.Fragment key={`mark-${mark.value}`}>
									<SliderMark
										value={mark.value}
										mt="1"
										transform="translateX(-50%)"
									>
										<Box w="1px" h="8px" bg="purple.300" />
									</SliderMark>
									<SliderMark
										value={mark.value}
										mt="9"
										transform="translateX(-50%)"
									>
										<VStack spacing={0} fontSize="xs" color="gray.600">
											<Text fontWeight="medium">{mark.label}</Text>
											<Text fontSize="2xs">{formatCurrency(mark.monthly)}</Text>
										</VStack>
									</SliderMark>
								</React.Fragment>
							))}
							<ChakraTooltip
								hasArrow
								placement="top"
								label={`${formattedClaimingAge} • ${formatCurrency(selectedMonthly)}`}
								isOpen={isClaimingAgeDragging ? true : undefined}
							>
								<SliderThumb boxSize={5} />
							</ChakraTooltip>
						</Slider>
					</Box>
				</Box>

				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6}>
					<Box
						p={4}
						borderWidth="1px"
						borderRadius="lg"
						bg="white"
						borderColor="purple.200"
					>
						<Text fontWeight="bold">Monthly at age {formattedClaimingAge}</Text>
						<Text fontSize="2xl">{formatCurrency(selectedMonthly)}</Text>
						<Text fontSize="sm" color="gray.600">
							{pctVsPIA}% vs PIA
						</Text>
						<Button
							mt={4}
							size="sm"
							colorScheme="purple"
							onClick={() => onUpdateMonthlySS(selectedMonthly)}
						>
							Use this amount
						</Button>
					</Box>
					<Box
						p={4}
						borderWidth="1px"
						borderRadius="lg"
						bg="white"
						borderColor="purple.200"
					>
						<Text fontWeight="bold">FRA</Text>
						<Text>{fra.label}</Text>
						<Text fontSize="sm" color="gray.600">
							PIA: {formatCurrency(monthlyAtFRA)}
						</Text>
					</Box>
					<Box
						p={4}
						borderWidth="1px"
						borderRadius="lg"
						bg="white"
						borderColor="purple.200"
					>
						<Text fontWeight="bold">COLA Assumption</Text>
						<Text>{colaAdjustment}%</Text>
						<Text fontSize="sm" color="gray.600">
							applied annually
						</Text>
					</Box>
				</SimpleGrid>

				<HStack spacing={4} mt={6} alignItems="stretch">
					<Box
						flex={1}
						p={4}
						borderWidth="1px"
						borderRadius="lg"
						bg="white"
						borderColor="purple.200"
					>
						<Text fontWeight="bold">Claim at 62</Text>
						<Text>{formatCurrency(monthlyAt62)}</Text>
						<Text fontSize="sm" color="gray.600">
							vs PIA:{" "}
							{piaMonthly > 0
								? (((monthlyAt62 - piaMonthly) / piaMonthly) * 100).toFixed(0)
								: 0}
							%
						</Text>
					</Box>
					<Box
						flex={1}
						p={4}
						borderWidth="1px"
						borderRadius="lg"
						bg="white"
						borderColor="purple.200"
					>
						<Text fontWeight="bold">Claim at FRA</Text>
						<Text>{formatCurrency(monthlyAtFRA)}</Text>
						<Text fontSize="sm" color="gray.600">
							Baseline (PIA)
						</Text>
					</Box>
					<Box
						flex={1}
						p={4}
						borderWidth="1px"
						borderRadius="lg"
						bg="white"
						borderColor="purple.200"
					>
						<Text fontWeight="bold">Claim at 70</Text>
						<Text>{formatCurrency(monthlyAt70)}</Text>
						<Text fontSize="sm" color="gray.600">
							vs PIA:{" "}
							{piaMonthly > 0
								? (((monthlyAt70 - piaMonthly) / piaMonthly) * 100).toFixed(0)
								: 0}
							%
						</Text>
					</Box>
				</HStack>

				<Accordion allowToggle mt={8}>
					<AccordionItem border="none" boxShadow="sm" borderRadius="lg">
						<h2>
							<AccordionButton borderTopRadius="lg" py={3} bg="purple.100">
								<Box flex="1" textAlign="left" fontWeight="bold">
									Compare cumulative lifetime benefits
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4} bg="white" borderBottomRadius="lg">
							<Box px={2} py={2}>
								<Text fontSize="sm" color="gray.600" mb={3}>
									This chart shows total Social Security benefits received at
									each age, assuming COLA adjustments of {colaAdjustment}% once
									benefits begin.
								</Text>
								<ChartContainer height={320}>
									<ResponsiveContainer width="100%" height="100%">
										<LineChart
											data={cumulativeBenefitData}
											margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="age"
												tickFormatter={(value) => `${value}`}
												label={{
													value: "Age",
													position: "insideBottomRight",
													offset: -10,
												}}
											/>
											<YAxis
												tickFormatter={(value) => formatCurrency(value)}
												width={110}
												label={{
													value: "Total benefits",
													angle: -90,
													position: "insideLeft",
												}}
											/>
											<Tooltip
												formatter={(value: number) => formatCurrency(value)}
												labelFormatter={(value: number) =>
													`Age ${formatAgeLabel(value)}`
												}
											/>
											<Legend />
											{claimOptions.map((option, index) => (
												<Line
													key={option.key}
													type="monotone"
													dataKey={option.key}
													name={`Claim at ${option.label}`}
													stroke={lineColors[index % lineColors.length]}
													strokeWidth={2}
													dot={false}
												/>
											))}
										</LineChart>
									</ResponsiveContainer>
								</ChartContainer>
							</Box>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</CardBody>
			<CardFooter>
				<Alert status="info" fontSize="sm">
					<AlertIcon />
					Early claiming reduction: first 36 months 5/9 of 1%/mo, additional
					months 5/12 of 1%/mo. Delayed credits after FRA: 2/3 of 1%/mo until
					age 70. COLA {colaAdjustment}%.
				</Alert>
			</CardFooter>
		</Card>
	);
};

// ======== Main Component: RetirementCalculator ========
const RetirementCalculator = (): JSX.Element => {
	// State for financial parameters
	const [financialParams, setFinancialParams] = useState<FinancialParams>({
		inflationRatePercent: 2.4,
		initialBalance: 100000,
		desiredMonthlyIncome: 3200,
		socialSecurity: 2863,
		colaAdjustment: 2.3,
		investmentReturn: 8,
	});

	// Single scenario version; no scenario selector state needed

	// Current parameters based on user input
	const currentYear = new Date().getFullYear();

	// Calculate our scenario
	const scenarioData = calculateScenario(financialParams);

	// Prepare chart data
	const chartData = prepareChartData(scenarioData);

	// Handler for updating financial parameters
	const handleUpdateParam = <K extends keyof FinancialParams>(
		param: K,
		value: number,
	) => {
		setFinancialParams((prev) => updateFinancialParam(prev, param, value));
	};

	// No longer needed since we only have one scenario
	// const handleScenarioClick = (option: ScenarioOption) => {
	//   setSelectedScenario(option);
	// };

	return (
		<VStack width="100%" align="stretch" spacing={8} py={4}>
			<MoneyInputCard
				initialBalance={financialParams.initialBalance}
				desiredMonthlyIncome={financialParams.desiredMonthlyIncome}
				socialSecurity={financialParams.socialSecurity}
				onChangeInitialBalance={(_, value) =>
					handleUpdateParam("initialBalance", value)
				}
				onChangeDesiredMonthlyIncome={(_, value) =>
					handleUpdateParam("desiredMonthlyIncome", value)
				}
				onChangeSocialSecurity={(_, value) =>
					handleUpdateParam("socialSecurity", value)
				}
			/>

			<WithdrawalPreviewCard
				scenarioData={scenarioData}
				currentYear={currentYear}
			/>

			<Box>
				<Accordion allowToggle>
					<AccordionItem border="none" boxShadow="sm" borderRadius="lg" mb={2}>
						<h2>
							<AccordionButton
								py={4}
								borderTopRadius="lg"
								bg="gray.100"
								_hover={{ bg: "gray.200" }}
							>
								<Box as="span" flex="1" textAlign="left" fontWeight="bold">
									View Detailed 30-Year Projection
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4} px={0}>
							<Box px={4} pb={4}>
								<SimpleGrid columns={3} spacing={6}>
									<FormNumberInput
										value={financialParams.initialBalance}
										onChange={(_, value) =>
											handleUpdateParam("initialBalance", value)
										}
										placeholder="Enter starting balance..."
										helperText="Current 401(k) or retirement savings balance"
										step={10000}
									/>
									<FormNumberInput
										value={financialParams.socialSecurity}
										onChange={(_, value) =>
											handleUpdateParam("socialSecurity", value)
										}
										placeholder="Enter Social Security..."
										helperText="Your expected monthly Social Security benefit"
										step={1}
									/>
									<FormNumberInput
										value={financialParams.desiredMonthlyIncome}
										onChange={(_, value) =>
											handleUpdateParam("desiredMonthlyIncome", value)
										}
										placeholder="Enter total monthly income..."
										helperText="Total monthly income needed in retirement"
										step={100}
									/>
								</SimpleGrid>
							</Box>
							<DetailedProjectionCard scenarioData={scenarioData} />
						</AccordionPanel>
					</AccordionItem>

					<AccordionItem border="none" boxShadow="sm" borderRadius="lg">
						<h2>
							<AccordionButton
								py={4}
								borderTopRadius="lg"
								bg="gray.100"
								_hover={{ bg: "gray.200" }}
							>
								<Box as="span" flex="1" textAlign="left" fontWeight="bold">
									View Savings Projection Chart
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4} px={0}>
							<Box px={4} pb={4}>
								<SimpleGrid columns={3} spacing={6}>
									<FormNumberInput
										value={financialParams.initialBalance}
										onChange={(_, value) =>
											handleUpdateParam("initialBalance", value)
										}
										placeholder="Enter starting balance..."
										helperText="Current 401(k) or retirement savings balance"
										step={10000}
									/>
									<FormNumberInput
										value={financialParams.socialSecurity}
										onChange={(_, value) =>
											handleUpdateParam("socialSecurity", value)
										}
										placeholder="Enter Social Security..."
										helperText="Your expected monthly Social Security benefit"
										step={1}
									/>
									<FormNumberInput
										value={financialParams.desiredMonthlyIncome}
										onChange={(_, value) =>
											handleUpdateParam("desiredMonthlyIncome", value)
										}
										placeholder="Enter total monthly income..."
										helperText="Total monthly income needed in retirement"
										step={100}
									/>
								</SimpleGrid>
							</Box>
							<BalanceProjectionCard
								chartData={chartData}
								inflationRatePercent={financialParams.inflationRatePercent}
								colaAdjustment={financialParams.colaAdjustment}
								investmentReturn={financialParams.investmentReturn}
								socialSecurity={financialParams.socialSecurity}
							/>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Box>

			<SocialSecurityTimingCard
				initialPIAMonthly={financialParams.socialSecurity}
				// currentMonthlySS={financialParams.socialSecurity}
				colaAdjustment={financialParams.colaAdjustment}
				onUpdateMonthlySS={(newMonthly) =>
					handleUpdateParam("socialSecurity", newMonthly)
				}
			/>

			<EconomyInputCard
				inflationRatePercent={financialParams.inflationRatePercent}
				colaAdjustment={financialParams.colaAdjustment}
				investmentReturn={financialParams.investmentReturn}
				onChangeInflationRatePercent={(_, value) =>
					handleUpdateParam("inflationRatePercent", value)
				}
				onChangeColaAdjustment={(_, value) =>
					handleUpdateParam("colaAdjustment", value)
				}
				onChangeInvestmentReturn={(_, value) =>
					handleUpdateParam("investmentReturn", value)
				}
			/>
		</VStack>
	);
};

export default RetirementCalculator;
