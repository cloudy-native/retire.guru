import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  VStack,
  Tr,
  CardFooter,
  Alert,
  AlertIcon,
  useColorModeValue,
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

// ======== Types and Interfaces ========
interface ChartContainerProps extends BoxProps {
  children: React.ReactNode;
  height?: number;
}

interface ScenarioRow {
  year: number;
  ssMonthly: number;
  requiredFrom401kMonthly: number;
  totalMonthlyIncome: number;
  startingBalance: number;
  yearlyReturn: number;
  endingBalance: number;
  withdrawalRate: string;
}

type ScenarioOption = "62" | "FRA" | "70";

interface ChartData {
  year: number;
  "SS at 62": number;
  "SS at FRA": number;
  "SS at 70": number;
}

interface FinancialParams {
  inflationRatePercent: number;
  initialBalance: number;
  desiredMonthlyIncome: number;
  colaAdjustment: number;
  investmentReturn: number;
  ssMonthlyAt62: number;
  ssMonthlyAtFRA: number;
  ssMonthlyAt70: number;
}

interface FormNumberInputProps {
  value: number;
  onChange: (valueAsString: string, valueAsNumber: number) => void;
  helperText: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

// ======== Utility Functions ========
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// ======== Component: ChartContainer ========
const ChartContainer: React.FC<ChartContainerProps> = ({
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

// ======== Component: FormNumberInput ========
const FormNumberInput: React.FC<FormNumberInputProps> = ({
  value,
  onChange,
  helperText,
  placeholder,
  min,
  max,
  step,
}) => {
  const handleChange = (valueAsString: string, valueAsNumber: number) => {
    // If the field is empty, pass the empty string and prevent NaN
    if (valueAsString === "") {
      onChange(valueAsString, 0);
    } else {
      onChange(valueAsString, valueAsNumber);
    }
  };

  return (
    <FormControl>
      <NumberInput 
        value={value || ""} 
        onChange={handleChange} 
        min={min} 
        max={max} 
        step={step}
        keepWithinRange={true}
        clampValueOnBlur={true}
      >
        <NumberInputField placeholder={placeholder} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

// ======== Component: MoneyInputCard ========
interface MoneyInputCardProps {
  initialBalance: number;
  desiredMonthlyIncome: number;
  onChangeInitialBalance: (valueAsString: string, valueAsNumber: number) => void;
  onChangeDesiredMonthlyIncome: (valueAsString: string, valueAsNumber: number) => void;
}

const MoneyInputCard: React.FC<MoneyInputCardProps> = ({
  initialBalance,
  desiredMonthlyIncome,
  onChangeInitialBalance,
  onChangeDesiredMonthlyIncome,
}) => {
  return (
    <Card
      bgColor={useColorModeValue("blue.50", "blue.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("blue.100", "blue.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Your Money</Heading>
        <Text>
          Start by telling us your savings and how much per month you think
          you will need in retirement.
        </Text>
      </CardHeader>

      <CardBody>
        <SimpleGrid columns={3} spacing={10}>
          <FormNumberInput
            value={initialBalance}
            onChange={onChangeInitialBalance}
            placeholder="Enter starting balance..."
            helperText="Starting retirement savings, increments of $10,000"
            step={10000}
          />

          <FormNumberInput
            value={desiredMonthlyIncome}
            onChange={onChangeDesiredMonthlyIncome}
            placeholder="Enter monthly income..."
            helperText="Monthly income goal, increments of $100"
            step={100}
          />
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
  ssMonthlyAt62: number;
  ssMonthlyAtFRA: number;
  ssMonthlyAt70: number;
  selectedScenario: ScenarioOption;
  onScenarioClick: (option: ScenarioOption) => void;
}

const BalanceProjectionCard: React.FC<BalanceProjectionCardProps> = ({
  chartData,
  inflationRatePercent,
  colaAdjustment,
  investmentReturn,
  ssMonthlyAt62,
  ssMonthlyAtFRA,
  ssMonthlyAt70,
  selectedScenario,
  onScenarioClick,
}) => {
  const [showAllScenarios, setShowAllScenarios] = useState(true);
  
  const getScenarioButtonStyles = (option: ScenarioOption) => {
    const isActive = selectedScenario === option;

    return {
      colorScheme: isActive ? "blue" : "gray",
      variant: isActive ? "solid" : "outline",
      opacity: isActive ? 1 : 0.6,
      _hover: {
        opacity: isActive ? 1 : 0.8,
      },
    };
  };
  return (
    <Card
      bgColor={useColorModeValue("green.50", "green.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("green.100", "green.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Balance Projection</Heading>
        <Text>
          Given your financial goals, here's how your nest egg looks as you
          get older. We calculate three key scenarios: Age 62, 66 and 10
          months (FRA), and 70. Your savings grow, but you're withdrawing
          some to maintain your monthly goals.
        </Text>
        <br />
        <Text>
          Here's how to read it. The chart shows your balance at the end of
          each year for all three age scenarios for claiming Social
          Security. Find which line is yours based on when you claimed
          Social Security, or plan to. Try adjusting your financial picture
          above and watch the graphs change with it. As you increase your
          aspirations for monthly income, the lines slope down. When the
          lines touch the x-axis, your savings are gone. Time to dial it
          back a bit.
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Flex direction="column" align="flex-start" gap={2}>
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button
                {...getScenarioButtonStyles("62")}
                onClick={() => onScenarioClick("62")}
              >
                Age 62
              </Button>
              <Button
                {...getScenarioButtonStyles("FRA")}
                onClick={() => onScenarioClick("FRA")}
              >
                FRA
              </Button>
              <Button
                {...getScenarioButtonStyles("70")}
                onClick={() => onScenarioClick("70")}
              >
                Age 70
              </Button>
            </ButtonGroup>
            
            <FormControl display="flex" alignItems="center" width="auto">
              <FormHelperText mr={2} mb={0}>Show all scenarios</FormHelperText>
              <Switch 
                isChecked={showAllScenarios}
                onChange={() => setShowAllScenarios(!showAllScenarios)}
                colorScheme="green"
              />
            </FormControl>
          </Flex>
          
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
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const colorMode = useColorModeValue("light", "dark");
                      const tooltipStyles = {
                        backgroundColor: colorMode === "dark" ? "#1A202C" : "#FFFFFF",
                        border: `1px solid ${colorMode === "dark" ? "#2D3748" : "#E2E8F0"}`,
                        color: colorMode === "dark" ? "#FFFFFF" : "#1A202C",
                        padding: "10px",
                        borderRadius: "4px",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      };
                      
                      // Only show the relevant payload items based on selected scenarios
                      const filteredPayload = showAllScenarios 
                        ? payload 
                        : payload.filter(p => p.name === `SS at ${selectedScenario}`);
                      
                      return (
                        <div style={tooltipStyles}>
                          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Year: {label}</p>
                          {filteredPayload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color, margin: "2px 0" }}>
                              <span style={{ fontWeight: 600 }}>{entry.name}:</span> {formatCurrency(entry.value as number)}
                            </p>
                          ))}
                          <p style={{ fontSize: "0.8em", marginTop: "5px", opacity: 0.8 }}>
                            {filteredPayload[0]?.value > 0 
                              ? "Retirement savings balance at year end" 
                              : "Retirement savings depleted"}
                          </p>
                        </div>
                      );
                    }
                    
                    return null;
                  }}
                />
                <Legend />
                {(showAllScenarios || selectedScenario === "62") && (
                  <Line 
                    dataKey="SS at 62" 
                    stroke="#82ca9d" 
                    strokeWidth={selectedScenario === "62" ? 3 : 2}
                    dot={selectedScenario === "62" ? { r: 3 } : false}
                  />
                )}
                {(showAllScenarios || selectedScenario === "FRA") && (
                  <Line
                    dataKey="SS at FRA"
                    stroke="#8884d8"
                    strokeWidth={selectedScenario === "FRA" ? 3 : 2}
                    activeDot={selectedScenario === "FRA" ? { r: 8 } : { r: 6 }}
                    dot={selectedScenario === "FRA" ? { r: 3 } : false}
                  />
                )}
                {(showAllScenarios || selectedScenario === "70") && (
                  <Line 
                    dataKey="SS at 70" 
                    stroke="#ff7300" 
                    strokeWidth={selectedScenario === "70" ? 3 : 2}
                    dot={selectedScenario === "70" ? { r: 3 } : false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </VStack>
      </CardBody>
      <CardFooter>
        <Alert status="info">
          <AlertIcon />
          You can change the economic assumptions that went into calculating
          this at the bottom of the page. For this chart, the rate of
          inflation is {inflationRatePercent}%, COLA increase{" "}
          {colaAdjustment}%, and investment return {investmentReturn}%.
          Social Security at age 62 is {formatCurrency(ssMonthlyAt62)}, Full
          Retirement Age {formatCurrency(ssMonthlyAtFRA)}, and age 70{" "}
          {formatCurrency(ssMonthlyAt70)}.
        </Alert>
      </CardFooter>
    </Card>
  );
};

// ======== Component: DetailedProjectionCard ========
interface DetailedProjectionCardProps {
  selectedScenario: ScenarioOption;
  scenarioData: ScenarioRow[];
  onScenarioClick: (option: ScenarioOption) => void;
}

const DetailedProjectionCard: React.FC<DetailedProjectionCardProps> = ({
  selectedScenario,
  scenarioData,
  onScenarioClick,
}) => {
  const getScenarioButtonStyles = (option: ScenarioOption) => {
    const isActive = selectedScenario === option;

    return {
      colorScheme: isActive ? "blue" : "gray",
      variant: isActive ? "solid" : "outline",
      opacity: isActive ? 1 : 0.6,
      _hover: {
        opacity: isActive ? 1 : 0.8,
      },
    };
  };

  return (
    <Card
      bgColor={useColorModeValue("purple.50", "purple.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("purple.100", "purple.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Detailed Year-by-Year Projection</Heading>
        <Text>
          Here's how it all looks. If your monthly goals are completely
          covered by Social Security then your withdraw rate can go
          negative, which means you have money left over each month to
          invest back in your 401(k) or other tax-deferred account. Lucky
          you!
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Flex justify="flex-start" align="center" mb={2}>
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button
                {...getScenarioButtonStyles("62")}
                onClick={() => onScenarioClick("62")}
              >
                Age 62
              </Button>
              <Button
                {...getScenarioButtonStyles("FRA")}
                onClick={() => onScenarioClick("FRA")}
              >
                FRA
              </Button>
              <Button
                {...getScenarioButtonStyles("70")}
                onClick={() => onScenarioClick("70")}
              >
                Age 70
              </Button>
            </ButtonGroup>
          </Flex>

          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Year</Th>
                  <Th>SS Monthly</Th>
                  <Th>401(k) Monthly Withdrawal</Th>
                  <Th>Total Monthly Income</Th>
                  <Th>401(k) Balance</Th>
                  <Th>Withdrawal Rate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {scenarioData
                  .slice(0, 30)
                  .map((row, index) => (
                    <Tr key={index}>
                      <Td isNumeric>{row.year}</Td>
                      <Td isNumeric>{formatCurrency(row.ssMonthly)}</Td>
                      <Td isNumeric>
                        {formatCurrency(row.requiredFrom401kMonthly)}
                      </Td>
                      <Td isNumeric>
                        {formatCurrency(row.totalMonthlyIncome)}
                      </Td>
                      <Td isNumeric>{formatCurrency(row.endingBalance)}</Td>
                      <Td isNumeric>
                        <Box 
                          as="span" 
                          position="relative"
                          _hover={{
                            textDecoration: "underline",
                            cursor: "help"
                          }}
                          title={`This is the percentage of your 401(k) balance you're withdrawing annually. Financial advisors often suggest keeping this below 4% for sustainability.${
                            parseFloat(row.withdrawalRate) > 4 ? " Your withdrawal rate is higher than recommended." : ""
                          }`}
                        >
                          {row.withdrawalRate}%
                          {parseFloat(row.withdrawalRate) > 4 && (
                            <Box 
                              as="span" 
                              color="orange.500" 
                              ml={1}
                              fontSize="sm"
                            >
                              ⚠️
                            </Box>
                          )}
                        </Box>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </CardBody>
    </Card>
  );
};

// ======== Component: EconomyInputCard ========
interface EconomyInputCardProps {
  inflationRatePercent: number;
  colaAdjustment: number;
  investmentReturn: number;
  onChangeInflationRatePercent: (valueAsString: string, valueAsNumber: number) => void;
  onChangeColaAdjustment: (valueAsString: string, valueAsNumber: number) => void;
  onChangeInvestmentReturn: (valueAsString: string, valueAsNumber: number) => void;
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
      bgColor={useColorModeValue("yellow.50", "yellow.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("yellow.100", "yellow.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>The Economy</Heading>
        <Text>
          Feel free to adjust the rate of inflation, the Social Security
          COLA (cost-of-living adjustment), and the average investment rate
          of return. We have good values to start with.
        </Text>
        <br />
        <Text>
          The average rate of inflation for the last 30 years is 2.4%. The
          COLA increase during that same period is 2.3%. The S&P 500
          performance averages 10.3%. A more conservative portfolio of bonds
          averages from 4.2% to 4.7%. Common guidance suggests a portfolio
          of 60% stocks and 40% bonds. That would be 60% × 10.3% (stocks) +
          40% × 4.5% (bonds) = 8% average annual return.
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

// ======== Component: SocialSecurityInputCard ========
interface SocialSecurityInputCardProps {
  ssMonthlyAt62: number;
  ssMonthlyAtFRA: number;
  ssMonthlyAt70: number;
  onChangeSsMonthlyAt62: (valueAsString: string, valueAsNumber: number) => void;
  onChangeSsMonthlyAtFRA: (valueAsString: string, valueAsNumber: number) => void;
  onChangeSsMonthlyAt70: (valueAsString: string, valueAsNumber: number) => void;
}

const SocialSecurityInputCard: React.FC<SocialSecurityInputCardProps> = ({
  ssMonthlyAt62,
  ssMonthlyAtFRA,
  ssMonthlyAt70,
  onChangeSsMonthlyAt62,
  onChangeSsMonthlyAtFRA,
  onChangeSsMonthlyAt70,
}) => {
  return (
    <Card
      bgColor={useColorModeValue("pink.50", "pink.950")}
      boxShadow="lg"
      borderColor={useColorModeValue("pink.100", "pink.900")}
      borderWidth="1px"
    >
      <CardHeader>
        <Heading size={"lg"}>Social Security</Heading>
        <Text>Adjust the current Social Security limits as necessary.</Text>
        <br />
        <Alert status="info">
          <AlertIcon />
          Try setting, say, the FRA number to your specific Social Security
          payment amount. Then look at the FRA line in the graph, and switch
          the table view to FRA too. That will tailor all calculations
          specific to you.
        </Alert>
      </CardHeader>

      <CardBody>
        <SimpleGrid columns={3} spacing={10}>
          <FormNumberInput
            value={ssMonthlyAt62}
            onChange={onChangeSsMonthlyAt62}
            placeholder="SS benefit at age 62..."
            helperText="Age 62"
          />
          <FormNumberInput
            value={ssMonthlyAtFRA}
            onChange={onChangeSsMonthlyAtFRA}
            placeholder="SS benefit at FRA..."
            helperText="Full Retirement Age"
          />
          <FormNumberInput
            value={ssMonthlyAt70}
            onChange={onChangeSsMonthlyAt70}
            placeholder="SS benefit at age 70..."
            helperText="Age 70"
          />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

// ======== Main Component: RetirementCalculator ========
const RetirementCalculator = (): JSX.Element => {
  // State for financial parameters
  const [financialParams, setFinancialParams] = useState<FinancialParams>({
    inflationRatePercent: 2.4,
    initialBalance: 100000,
    desiredMonthlyIncome: 3000,
    colaAdjustment: 2.3,
    investmentReturn: 8,
    ssMonthlyAt62: 2572,
    ssMonthlyAtFRA: 3627,
    ssMonthlyAt70: 4500,
  });

  const [selectedScenario, setSelectedScenario] = useState<ScenarioOption>("62");

  // Current parameters based on user input
  const currentYear = new Date().getFullYear();

  // Calculate scenarios for different SS claiming ages
  const calculateScenario = (ssMonthlyBenefit: number, years = 30): ScenarioRow[] => {
    const results: ScenarioRow[] = [];
    const {
      initialBalance,
      desiredMonthlyIncome,
      colaAdjustment,
      inflationRatePercent,
      investmentReturn,
    } = financialParams;

    // Monthly figures
    let monthlySSBenefit = ssMonthlyBenefit;
    let requiredMonthlyIncome = desiredMonthlyIncome;
    let requiredFrom401k = requiredMonthlyIncome - monthlySSBenefit;
    let balance = initialBalance;

    for (let year = 0; year < years; year++) {
      const yearlySSBenefit = monthlySSBenefit * 12;
      const yearlyFrom401k = requiredFrom401k * 12;
      const totalYearlyIncome = yearlySSBenefit + yearlyFrom401k;
      const yearlyReturn = (balance * investmentReturn) / 100.0;
      const yearEndBalance = balance + yearlyReturn - yearlyFrom401k;

      results.push({
        year: currentYear + year,
        ssMonthly: monthlySSBenefit,
        requiredFrom401kMonthly: requiredFrom401k,
        totalMonthlyIncome: monthlySSBenefit + requiredFrom401k,
        startingBalance: balance,
        yearlyReturn: yearlyReturn,
        endingBalance: yearEndBalance > 0 ? yearEndBalance : 0,
        withdrawalRate: ((yearlyFrom401k / balance) * 100).toFixed(2),
      });

      // Update for next year
      monthlySSBenefit *= 1 + colaAdjustment / 100.0; // Apply COLA
      requiredMonthlyIncome *= 1 + inflationRatePercent / 100.0; // Adjust income for inflation
      requiredFrom401k = requiredMonthlyIncome - monthlySSBenefit;
      balance = yearEndBalance;

      // If balance goes negative, mark as depleted
      if (balance < 0) {
        for (let i = year + 1; i < years; i++) {
          results.push({
            year: currentYear + i,
            ssMonthly:
              monthlySSBenefit * Math.pow(1 + colaAdjustment / 100.0, i - year),
            requiredFrom401kMonthly: 0,
            totalMonthlyIncome:
              monthlySSBenefit * Math.pow(1 + colaAdjustment / 100.0, i - year),
            startingBalance: 0,
            yearlyReturn: 0,
            endingBalance: 0,
            withdrawalRate: "0.00",
          });
        }
        break;
      }
    }

    return results;
  };

  // Calculate our three scenarios
  const scenario62 = calculateScenario(financialParams.ssMonthlyAt62);
  const scenarioFRA = calculateScenario(financialParams.ssMonthlyAtFRA);
  const scenario70 = calculateScenario(financialParams.ssMonthlyAt70);

  // Get the scenario data based on the selected option
  const getScenario = (scenario: ScenarioOption): ScenarioRow[] => {
    switch (scenario) {
      case "62":
        return scenario62;
      case "FRA":
        return scenarioFRA;
      case "70":
        return scenario70;
      default:
        return scenarioFRA;
    }
  };

  // Prepare chart data
  const chartData: ChartData[] = [];
  for (let i = 0; i < 30; i++) {
    chartData.push({
      year: currentYear + i,
      "SS at 62": i < scenario62.length ? scenario62[i].endingBalance : 0,
      "SS at FRA": i < scenarioFRA.length ? scenarioFRA[i].endingBalance : 0,
      "SS at 70": i < scenario70.length ? scenario70[i].endingBalance : 0,
    });
  }

  // Event handlers - using function to update specific property in state
  const updateFinancialParam = <K extends keyof FinancialParams>(
    param: K,
    value: number
  ) => {
    setFinancialParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleScenarioClick = (option: ScenarioOption) => {
    setSelectedScenario(option);
  };

  return (
    <>
      <VStack width="100%" align="stretch" spacing={8} py={4}>
        <MoneyInputCard
          initialBalance={financialParams.initialBalance}
          desiredMonthlyIncome={financialParams.desiredMonthlyIncome}
          onChangeInitialBalance={(_, value) => updateFinancialParam('initialBalance', value)}
          onChangeDesiredMonthlyIncome={(_, value) => updateFinancialParam('desiredMonthlyIncome', value)}
        />

        <BalanceProjectionCard
          chartData={chartData}
          inflationRatePercent={financialParams.inflationRatePercent}
          colaAdjustment={financialParams.colaAdjustment}
          investmentReturn={financialParams.investmentReturn}
          ssMonthlyAt62={financialParams.ssMonthlyAt62}
          ssMonthlyAtFRA={financialParams.ssMonthlyAtFRA}
          ssMonthlyAt70={financialParams.ssMonthlyAt70}
          selectedScenario={selectedScenario}
          onScenarioClick={handleScenarioClick}
        />

        <DetailedProjectionCard
          selectedScenario={selectedScenario}
          scenarioData={getScenario(selectedScenario)}
          onScenarioClick={handleScenarioClick}
        />

        <EconomyInputCard
          inflationRatePercent={financialParams.inflationRatePercent}
          colaAdjustment={financialParams.colaAdjustment}
          investmentReturn={financialParams.investmentReturn}
          onChangeInflationRatePercent={(_, value) => updateFinancialParam('inflationRatePercent', value)}
          onChangeColaAdjustment={(_, value) => updateFinancialParam('colaAdjustment', value)}
          onChangeInvestmentReturn={(_, value) => updateFinancialParam('investmentReturn', value)}
        />

        <SocialSecurityInputCard
          ssMonthlyAt62={financialParams.ssMonthlyAt62}
          ssMonthlyAtFRA={financialParams.ssMonthlyAtFRA}
          ssMonthlyAt70={financialParams.ssMonthlyAt70}
          onChangeSsMonthlyAt62={(_, value) => updateFinancialParam('ssMonthlyAt62', value)}
          onChangeSsMonthlyAtFRA={(_, value) => updateFinancialParam('ssMonthlyAtFRA', value)}
          onChangeSsMonthlyAt70={(_, value) => updateFinancialParam('ssMonthlyAt70', value)}
        />
      </VStack>
    </>
  );
};

export default RetirementCalculator;