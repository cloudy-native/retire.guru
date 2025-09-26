import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
	Alert,
	AlertIcon,
	Box,
	Card,
	CardBody,
	CardHeader,
	Container,
	Heading,
	Image,
	Link,
	ListItem,
	OrderedList,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	UnorderedList,
	VStack,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import balanceProjection from "../images/balance-projection.png";
import balanceTable from "../images/balance-table.png";
import buyingPowerDiminishing from "../images/buying-power-diminishing.png";
import buyingPowerLevel from "../images/buying-power-level.png";
import economy from "../images/economy.png";
import incomePreview from "../images/income-preview.png";
import withdrawingTooMuch from "../images/withdrawing-too-much.png";
import yourFinancials from "../images/your-financials.png";
import cumulativeLifetimeBenefits from "../images/cumulative-lifetime-benefits.png";
import socialSecurityTiming from "../images/social-security-timing.png";

const HelpPageHero = () => {
	const bgGradient = "linear(to-b, blue.50, white)";
	const accentColor = "blue.600";
	const textColor = "gray.700";

	return (
		<Box
			bg="blue.50"
			bgGradient={bgGradient}
			pt={16}
			pb={10}
			borderBottomWidth="1px"
			borderBottomColor="gray.200"
		>
			<Stack spacing={6} textAlign="center">
				<Heading
					as="h1"
					fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
					fontWeight="bold"
					color={accentColor}
					lineHeight="1.2"
				>
					How to Use the Retirement Calculator
				</Heading>

				<Text
					fontSize={{ base: "md", md: "lg" }}
					color={textColor}
					maxW="3xl"
					mx="auto"
					lineHeight="1.8"
				>
					A comprehensive guide to using our retirement calculator to plan your
					financial future with confidence.
				</Text>
			</Stack>
		</Box>
	);
};

interface HelpSectionProps {
	title: string;
	children: React.ReactNode;
}

const HelpSection: React.FC<HelpSectionProps> = ({ title, children }) => {
	const bgColor = "white";
	const borderColor = "gray.200";
	const headingColor = "blue.600";

	return (
		<Card
			p={5}
			shadow="md"
			borderWidth="1px"
			borderRadius="lg"
			bg={bgColor}
			borderColor={borderColor}
			mb={6}
		>
			<CardHeader p={0} pb={2}>
				<Heading as="h2" size="lg" color={headingColor}>
					{title}
				</Heading>
			</CardHeader>
			<CardBody p={0} pt={2}>
				{children}
			</CardBody>
		</Card>
	);
};

const HelpPage: React.FC<PageProps> = () => {
	const textColor = "gray.700";

	return (
		<>
			<HelpPageHero />

			<Container maxW="6xl" py={12}>
				<VStack spacing={10} align="stretch">
					<HelpSection title="Getting Started">
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Our retirement calculator helps you understand how your retirement
							savings might last through your golden years. Adjust your inputs
							to see how inflation, investment returns, Social Security, and
							income needs affect your plan and withdrawal rates.
						</Text>

						<Alert status="info" mb={4}>
							<AlertIcon />
							For the most accurate results, gather information about your
							current retirement savings, expected Social Security benefits, and
							desired monthly income in retirement before using the calculator.
						</Alert>
					</HelpSection>

					<HelpSection title="Step 1: Enter Your Financial Information">
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Use the inputs in the "Your Financials" and "Economic Assumptions"
							cards at the top of the page. For convenience, the three "Your
							Financials" inputs are also duplicated directly above the chart
							and table so you can tweak values while viewing results.
						</Text>

						<Image
							src={yourFinancials}
							alt="Your Financials"
							borderRadius="lg"
							maxW="100%"
							my={4}
						/>

						<UnorderedList spacing={2} pl={5} mb={4}>
							<ListItem>
								<Text fontWeight="bold">Starting Balance:</Text> Your current
								retirement savings across accounts.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Social Security (monthly):</Text> Your
								expected monthly benefit.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Total Monthly Income:</Text> Your target
								monthly income in retirement (before tax).
							</ListItem>
						</UnorderedList>

						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							In "Economic Assumptions":
						</Text>

						<Image
							src={economy}
							alt="Economic Assumptions"
							borderRadius="lg"
							maxW="100%"
							my={4}
						/>

						<UnorderedList spacing={2} pl={5} mb={4}>
							<ListItem>
								<Text fontWeight="bold">Inflation:</Text> Used to adjust your
								income goal and compute buying power (real dollars).
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">COLA:</Text> Annual Social Security
								cost-of-living adjustment.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Investment Return:</Text> Annual return
								applied to your balance.
							</ListItem>
						</UnorderedList>
					</HelpSection>

					<HelpSection title="Step 2: Review the Income Preview">
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							The Income Preview highlights key years in your retirement plan
							and summarizes the monthly goal, Social Security income, and the
							401(k) withdrawal required to meet that goal. It also flags when
							your withdrawal rate exceeds the commonly-cited 4% guideline.
						</Text>

						<Image
							src={incomePreview}
							alt="Income Preview"
							borderRadius="lg"
							maxW="100%"
							my={4}
						/>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Use this section to quickly gauge whether your plan appears
							sustainable in the near- and medium‑term and whether you may need
							to adjust your monthly income goal, Social Security assumption, or
							expected returns.
						</Text>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Here, the withdrawal rate starts slightly above 4% ⚠️ in years 1–2.
							With the current inflation, COLA, and return inputs, it declines
							and remains under 4% in subsequent years.
						</Text>
					</HelpSection>

					<HelpSection title="Step 3: Understand the Balance Projection Chart">
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							The Balance Projection chart shows how your retirement savings may
							change over time. It includes two lines:
						</Text>

						<Image
							src={balanceProjection}
							alt="Balance Projection chart"
							borderRadius="lg"
							maxW="100%"
							my={4}
						/>

						<OrderedList spacing={2} pl={5} mb={4}>
							<ListItem>
								<Text fontWeight="bold">Balance (Nominal):</Text> Your raw
								account balance without adjusting for inflation.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Balance (Buying Power):</Text> Your
								balance adjusted for inflation to reflect today's dollars.
							</ListItem>
						</OrderedList>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							When a line reaches zero, your savings would be depleted at that
							point in time. Update inputs above the chart to see immediate
							changes.
						</Text>
					</HelpSection>

					<HelpSection title="Step 4: Review the Detailed 30-Year Projection Table">
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Below the chart, you'll find a detailed year-by-year breakdown of
							your retirement finances. This table shows:
						</Text>

						<Image
							src={balanceTable}
							alt="Detailed 30-Year Projection Table"
							borderRadius="lg"
							maxW="100%"
							my={4}
						/>

						<OrderedList spacing={2} pl={5} mb={4}>
							<ListItem>
								<Text fontWeight="bold">Social Security Monthly Income:</Text>{" "}
								Your projected monthly benefit, increasing with cost-of-living
								adjustments.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">401(k) Monthly Withdrawal:</Text> How
								much you'll need to withdraw from savings to meet your income
								goal.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Total Monthly Income:</Text> Combined
								income from Social Security and retirement savings.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">401(k) Balance:</Text> Your remaining
								retirement savings at the end of each year.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Withdrawal Rate:</Text> The percentage
								of your savings you're withdrawing annually. The "4% rule"
								suggests keeping this under 4% for sustainability.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Buying Power Columns:</Text> Total
								monthly income and ending balance expressed in today's dollars
								(inflation-adjusted) so you can compare real value over time.
							</ListItem>
						</OrderedList>

						<Alert status="info" mb={4}>
							<AlertIcon />
							Tip: You can tweak the inputs directly above the table to see
							updates reflected immediately.
						</Alert>
					</HelpSection>

					<HelpSection title="Step 5: Interpreting the Results">
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							The best sustainability signal is the Balance (Buying Power) line
							in the chart. Because inflation erodes purchasing power, the
							nominal Balance line can rise even while your real
							(inflation‑adjusted) spending power is flat or falling. Aim to
							keep the Buying Power line roughly level over time. A gently
							rising line suggests extra cushion; a gently declining line
							suggests you may need to spend a little less or improve
							assumptions.
						</Text>

						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							How to interpret and adjust:
						</Text>
						<OrderedList spacing={2} pl={5} mb={4}>
							<ListItem>
								<Text fontWeight="bold">If Buying Power is level:</Text> Your
								plan is roughly sustainable under current assumptions. Keep
								monitoring and revisit annually.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">If Buying Power declines:</Text> Reduce
								the monthly income goal, delay retirement, increase savings, or
								use more conservative inflation/return assumptions.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">
									If you see withdrawal warnings or depletion:
								</Text>{" "}
								Your withdrawal rate exceeds the 4% guideline or your savings
								run out. Lower the income target, increase Social Security
								assumptions (if realistic), or assume lower returns and re‑plan.
							</ListItem>
						</OrderedList>

						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							Setting monthly income to <strong>$3,300</strong> keeps the Buying
							Power line approximately level. This is a good signal that your
							plan is sustainable under current assumptions.
						</Text>

						<Image
							src={buyingPowerLevel}
							alt="Buying power roughly level at $3,300 monthly income"
							borderRadius="lg"
							maxW="100%"
							my={2}
						/>

						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							Increasing monthly income to <strong>$3,400</strong> makes Buying
							Power trend downward — consider reducing spending or improving
							assumptions.
						</Text>

						<Image
							src={buyingPowerDiminishing}
							alt="Buying power diminishing at $3,400 monthly income"
							borderRadius="lg"
							maxW="100%"
							my={2}
						/>

						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							Withdrawing enough for a <strong>$3,500</strong> monthly income
							leads to eventual depletion — warnings and the table will reflect
							this.
						</Text>

						<Image
							src={withdrawingTooMuch}
							alt="Withdrawals too high at $3,500 — funds deplete"
							borderRadius="lg"
							maxW="100%"
							my={2}
						/>

						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							Levers to adjust when results aren’t acceptable:
						</Text>
						<OrderedList spacing={2} pl={5} mb={4}>
							<ListItem>
								<Text fontWeight="bold">Monthly income goal:</Text> Try small
								adjustments (±$100–$200) and observe the Buying Power trend.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Social Security:</Text> Update your
								expected benefit and COLA to match your statement/assumptions.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Investment return:</Text> Use more
								conservative returns if your portfolio will be safer in
								retirement.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Start date/savings:</Text> Delay
								retirement or increase savings contributions to improve
								longevity.
							</ListItem>
						</OrderedList>
					</HelpSection>

					<HelpSection title="Step 6: Explore Social Security Timing">
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Use the new "Social Security Timing" section to experiment with
							different claiming ages. Add your birth year, adjust your Primary
							Insurance Amount (PIA), move the slider to pick a claiming date,
							and compare how monthly benefits shift between ages 62, Full
							Retirement Age (FRA), and 70.
						</Text>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							We need to know the year you were born because Full Retirement Age
							(FRA) for Social Security, set at 65 for those born before 1938,
							rose under 1983 reforms to 66 for 1943–1954 births, then to 67 for
							those born in 1960 or later, stabilizing in 2023. No further
							changes have occurred by 2025; claiming at 62 cuts benefits up to
							30%, while delaying to 70 increases them by 8% yearly.
						</Text>

						<Image
							src={socialSecurityTiming}
							alt="Social Security timing slider"
							borderRadius="lg"
							maxW="100%"
							my={4}
						/>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Open the chart to view a cumulative benefits chart. This
							visualization shows the total Social Security dollars received
							over time for each claiming age option, including the custom age
							you choose.
						</Text>

						<Image
							src={cumulativeLifetimeBenefits}
							alt="Social Security timing cumulative chart"
							borderRadius="lg"
							maxW="100%"
							my={4}
						/>

						<UnorderedList spacing={2} pl={5} mb={4}>
							<ListItem>
								<Text fontWeight="bold">Claiming Age Slider:</Text> Displayed in
								years and months so you can precisely match your planned start
								date.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Use This Amount Button:</Text> Instantly
								applies the selected monthly Social Security benefit to the main
								calculator inputs.
							</ListItem>
							<ListItem>
								<Text fontWeight="bold">Cumulative Benefit Chart:</Text>{" "}
								Compares how total lifetime benefits stack up when claiming
								early versus waiting.
							</ListItem>
						</UnorderedList>

						<Alert status="info">
							<AlertIcon />
							Screenshots coming soon—replace these placeholders once your
							visuals are ready.
						</Alert>
					</HelpSection>

					<HelpSection title="Social Security Benefits">
						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							Social Security benefits are a critical component of retirement
							income. Only you get to decide when to start receiving benefits.
						</Text>
						<Text fontSize="md" lineHeight="tall" mb={2} color={textColor}>
							The table below provides a comprehensive overview of U.S. Social
							Security retirement benefits, focusing on key claiming ages.
							Benefits are based on your Primary Insurance Amount (PIA)—the
							monthly amount at Full Retirement Age (FRA)—calculated from your
							35 highest-earning years (adjusted for inflation). Claiming before
							FRA reduces benefits permanently; delaying past FRA increases them
							via delayed retirement credits (up to age 70).
						</Text>

						<TableContainer mb={6}>
							<Table size="sm">
								<Thead>
									<Tr>
										<Th>Claiming Age</Th>
										<Th isNumeric>Reduction/Credit from PIA</Th>
										<Th isNumeric>Typical Monthly Benefit</Th>
										<Th isNumeric>Maximum Monthly Benefit</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>62</Td>
										<Td isNumeric>-30% (up to, depending on FRA)</Td>
										<Td isNumeric>$1,346</Td>
										<Td isNumeric>$2,831</Td>
									</Tr>
									<Tr>
										<Td>66</Td>
										<Td isNumeric>-20% to 0% (varies by birth year)</Td>
										<Td isNumeric>$1,811</Td>
										<Td isNumeric>$3,795</Td>
									</Tr>
									<Tr>
										<Td>67</Td>
										<Td isNumeric>0%</Td>
										<Td isNumeric>$1,922</Td>
										<Td isNumeric>$4,018</Td>
									</Tr>
									<Tr>
										<Td>70</Td>
										<Td isNumeric>+24% to +32% (8% per year past FRA)</Td>
										<Td isNumeric>$2,733</Td>
										<Td isNumeric>$5,108</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>

						<Text fontWeight="bold" mb={2}>
							Descriptions
						</Text>
						<UnorderedList pl={5} mb={6}>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										Age 62:
									</Text>{" "}
									Earliest eligibility; benefits reduced for early claiming.
									Suitable if you need income soon or have health concerns.
								</Text>
							</ListItem>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										Age 66:
									</Text>{" "}
									Near-FRA for those born 1943–1954; partial reduction if FRA
									&gt; 66.
								</Text>
							</ListItem>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										Age 67:
									</Text>{" "}
									FRA for those born 1960+; full unreduced benefit.
								</Text>
							</ListItem>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										Age 70:
									</Text>{" "}
									Latest claiming age; maximizes lifetime payout for most (no
									further credits after 70).
								</Text>
							</ListItem>
						</UnorderedList>

						<UnorderedList pl={5} mb={4}>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										FRA:
									</Text>{" "}
									Varies by birth year (e.g., 66 years 10 months for those born
									in 1959; 67 for 1960+). Use your birth year to determine exact
									FRA.
								</Text>
							</ListItem>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										Typical Amounts:
									</Text>{" "}
									Average monthly benefits for retired workers claiming at each
									age, based on SSA data as of mid-2025 (after 2.5% COLA). These
									reflect a mix of earners and claiming strategies.
								</Text>
							</ListItem>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										Maximum Amounts:
									</Text>{" "}
									For high earners (at or above the 2025 wage cap of $176,100
									for 35+ years), assuming optimal claiming.
								</Text>
							</ListItem>
							<ListItem>
								<Text>
									<Text as="span" fontWeight="bold">
										Reduction/Credit:
									</Text>{" "}
									Percentage adjustment from PIA. Early: ~5/9% per month before
									FRA. Delayed: 2/3% per month after FRA (8% annually) until age
									70.
								</Text>
							</ListItem>
						</UnorderedList>
					</HelpSection>

					<HelpSection title="Data Sources">
						<Text fontWeight="bold">
							Rate of Inflation and Cost-of-Living Adjustments (COLA)
						</Text>
						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							The average rate of inflation in the US is typically measured
							using the Consumer Price Index for All Urban Consumers (CPI-U) and
							calculated as the arithmetic mean of the year-over-year percentage
							changes (December to December) over the specified period. Data is
							sourced from the US Bureau of Labor Statistics (BLS) via reliable
							aggregators. (See below.)
						</Text>

						<TableContainer mb={6}>
							<Table size="sm">
								<Thead>
									<Tr>
										<Th>Period (Years)</Th>
										<Th isNumeric>Ending Year</Th>
										<Th isNumeric>Average Annual Inflation Rate (%)</Th>
										<Th isNumeric>Average Annual SS COLA (%)</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>1</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>2.4</Td>
										<Td isNumeric>2.5</Td>
									</Tr>
									<Tr>
										<Td>2</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>3.0</Td>
										<Td isNumeric>2.9</Td>
									</Tr>
									<Tr>
										<Td>5</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>3.2</Td>
										<Td isNumeric>4.5</Td>
									</Tr>
									<Tr>
										<Td>10</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>2.6</Td>
										<Td isNumeric>2.9</Td>
									</Tr>
									<Tr>
										<Td>20</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>2.3</Td>
										<Td isNumeric>2.2</Td>
									</Tr>
									<Tr>
										<Td>30</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>2.3</Td>
										<Td isNumeric>2.3</Td>
									</Tr>
									<Tr>
										<Td>40</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>2.8</Td>
										<Td isNumeric>2.9</Td>
									</Tr>
									<Tr>
										<Td>50</Td>
										<Td isNumeric>2025</Td>
										<Td isNumeric>3.6</Td>
										<Td isNumeric>3.8</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Inflation varies from year to year, and multi‑year averages can
							differ significantly. Below are the highest and lowest rolling
							average inflation rates for common periods between 1975 and 2024.
						</Text>

						<TableContainer mb={6}>
							<Table size="sm">
								<Thead>
									<Tr>
										<Th>Period Length</Th>
										<Th>Highest Average Inflation</Th>
										<Th>Lowest Average Inflation</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>1 Year</Td>
										<Td>13.5% (1980)</Td>
										<Td>-0.4% (2009)</Td>
									</Tr>
									<Tr>
										<Td>5 Years</Td>
										<Td>9.8% (1977–1981)</Td>
										<Td>1.3% (2012–2016)</Td>
									</Tr>
									<Tr>
										<Td>10 Years</Td>
										<Td>7.8% (1975–1984)</Td>
										<Td>1.6% (2009–2018)</Td>
									</Tr>
									<Tr>
										<Td>20 Years</Td>
										<Td>5.7% (1975–1994)</Td>
										<Td>2.1% (2001–2020)</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>

						<Text fontWeight="bold">Historical Investment Returns</Text>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							The table below summarizes rolling average returns through 2023
							for common horizons. Here, "CONSERVATIVE (20/80) (%)" refers to a
							portfolio of 20% stocks and 80% bonds, "MODERATE (50/50) (%)"
							refers to a portfolio of 50% stocks and 50% bonds, and "AGGRESSIVE
							(80/20) (%)" refers to a portfolio of 80% stocks and 20% bonds.
						</Text>

						<TableContainer mb={6}>
							<Table size="sm">
								<Thead>
									<Tr>
										<Th>Period (Years)</Th>
										<Th isNumeric>Ending Year</Th>
										<Th isNumeric>S&amp;P 500 (%)</Th>
										<Th isNumeric>Bonds (%)</Th>
										<Th isNumeric>Conservative (20/80) (%)</Th>
										<Th isNumeric>Moderate (50/50) (%)</Th>
										<Th isNumeric>Aggressive (80/20) (%)</Th>
									</Tr>
								</Thead>
								<Tbody>
									<Tr>
										<Td>1</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>24.23</Td>
										<Td isNumeric>5.53</Td>
										<Td isNumeric>9.20</Td>
										<Td isNumeric>14.88</Td>
										<Td isNumeric>20.56</Td>
									</Tr>
									<Tr>
										<Td>2</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>8.40</Td>
										<Td isNumeric>0.35</Td>
										<Td isNumeric>1.75</Td>
										<Td isNumeric>4.38</Td>
										<Td isNumeric>6.99</Td>
									</Tr>
									<Tr>
										<Td>5</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>15.69</Td>
										<Td isNumeric>-3.12</Td>
										<Td isNumeric>2.87</Td>
										<Td isNumeric>6.29</Td>
										<Td isNumeric>9.70</Td>
									</Tr>
									<Tr>
										<Td>10</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>12.03</Td>
										<Td isNumeric>1.50</Td>
										<Td isNumeric>3.81</Td>
										<Td isNumeric>6.77</Td>
										<Td isNumeric>9.72</Td>
									</Tr>
									<Tr>
										<Td>20</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>9.60</Td>
										<Td isNumeric>3.72</Td>
										<Td isNumeric>5.10</Td>
										<Td isNumeric>6.66</Td>
										<Td isNumeric>8.22</Td>
									</Tr>
									<Tr>
										<Td>30</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>10.19</Td>
										<Td isNumeric>4.85</Td>
										<Td isNumeric>6.57</Td>
										<Td isNumeric>7.52</Td>
										<Td isNumeric>8.47</Td>
									</Tr>
									<Tr>
										<Td>40</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>10.94</Td>
										<Td isNumeric>6.20</Td>
										<Td isNumeric>7.31</Td>
										<Td isNumeric>8.57</Td>
										<Td isNumeric>9.83</Td>
									</Tr>
									<Tr>
										<Td>50</Td>
										<Td isNumeric>2023</Td>
										<Td isNumeric>11.42</Td>
										<Td isNumeric>6.05</Td>
										<Td isNumeric>7.66</Td>
										<Td isNumeric>8.74</Td>
										<Td isNumeric>9.82</Td>
									</Tr>
								</Tbody>
							</Table>
						</TableContainer>

						<Text fontWeight="bold">Sources</Text>

						<UnorderedList pl={5} mb={6}>
							<ListItem>
								<Link
									href="https://www.bls.gov/data/"
									isExternal
									color="blue.600"
								>
									BLS Data <ExternalLinkIcon mx="2px" />
								</Link>
							</ListItem>
							<ListItem>
								<Link
									href="https://www.ssa.gov/OACT/COLA/colaseries.html"
									isExternal
									color="blue.600"
								>
									Social Security Cost-of-Living Adjustments (COLA){" "}
									<ExternalLinkIcon mx="2px" />
								</Link>
							</ListItem>
							<ListItem>
								<Link
									href="https://www.usinflationcalculator.com/"
									isExternal
									color="blue.600"
								>
									US Inflation Calculator <ExternalLinkIcon mx="2px" />
								</Link>
							</ListItem>
							<ListItem>
								<Link
									href="https://www.macrotrends.net/2526/sp-500-historical-annual-returns"
									isExternal
									color="blue.600"
								>
									S&P 500 Historical Annual Returns{" "}
									<ExternalLinkIcon mx="2px" />
								</Link>
							</ListItem>
							<ListItem>
								<Link
									href="https://www.investopedia.com/terms/l/lehmanaggregatebondindex.asp"
									isExternal
									color="blue.600"
								>
									Bloomberg Aggregate Bond Index (overview){" "}
									<ExternalLinkIcon mx="2px" />
								</Link>
							</ListItem>
							<ListItem>
								<Link
									href="https://www.financialsamurai.com/investment-strategies-for-retirement-based-on-modern-portfolio-theory/"
									isExternal
									color="blue.600"
								>
									Investment Strategies for Retirement (MPT){" "}
									<ExternalLinkIcon mx="2px" />
								</Link>
							</ListItem>
						</UnorderedList>
					</HelpSection>

					<Alert status="warning">
						<AlertIcon />
						Remember that this calculator provides projections based on
						consistent returns and inflation rates, while real-world conditions
						will vary. Consult with a financial advisor to develop a
						comprehensive retirement strategy tailored to your specific
						situation.
					</Alert>
				</VStack>
			</Container>
		</>
	);
};

export default HelpPage;

export const Head: HeadFC = () => (
	<title>Retire Guru | Retirement Calculator Help</title>
);
