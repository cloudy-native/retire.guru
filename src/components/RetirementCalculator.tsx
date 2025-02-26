import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormHelperText,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
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

interface ChartContainerProps extends BoxProps {
  children: React.ReactNode;
  height?: number;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  height = 300,
  ...boxProps
}) => {
  return (
    <Box height={`${height}px`} width="100%">
      {children}
    </Box>
  );
};

const RetirementCalculator = (): JSX.Element => {
  const [inflationRatePercent, setInflationRatePercent] = useState<number>(2.4);
  const [initialBalance, setInitialBalance] = useState<number>(100000);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] =
    useState<number>(3000);
  const [colaAdjustment, setColaAdjustment] = useState<number>(2.3);
  const [investmentReturn, setInvestmentReturn] = useState<number>(7.9);
  const [selectedScenario, setSelectedScenario] = useState("62");
  const [ssMonthlyAt62, setSsMonthlyAt62] = useState(2572);
  const [ssMonthlyAtFRA, setSsMonthlyAtFRA] = useState(3627);
  const [ssMonthlyAt70, setSsMonthlyAt70] = useState(4500);

  // Current parameters based on user input
  const currentYear = new Date().getFullYear();

  // Calculate scenarios for different SS claiming ages
  const calculateScenario = (ssMonthlyBenefit, years = 30) => {
    const results = [];

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
  const scenario62 = calculateScenario(ssMonthlyAt62);
  const scenarioFRA = calculateScenario(ssMonthlyAtFRA);
  const scenario70 = calculateScenario(ssMonthlyAt70);

  function getScenario(scenario: string) {
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
  }
  // Prepare chart data
  const chartData = [];
  for (let i = 0; i < 30; i++) {
    chartData.push({
      year: currentYear + i,
      "SS at 62": i < scenario62.length ? scenario62[i].endingBalance : 0,
      "SS at FRA": i < scenarioFRA.length ? scenarioFRA[i].endingBalance : 0,
      "SS at 70": i < scenario70.length ? scenario70[i].endingBalance : 0,
    });
  }

  type ScenarioOption = "62" | "FRA" | "70";

  const handleScenarioClick = (option: ScenarioOption) => {
    setSelectedScenario(option);
  };

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

  const detailedScenario = selectedScenario;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const handleChangeInflationRatePercent = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setInflationRatePercent(valueAsNumber);
  };

  const handleChangeColaAdjustmentPercent = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setColaAdjustment(valueAsNumber);
  };

  const handleChangeInvestmentReturn = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setInvestmentReturn(valueAsNumber);
  };

  const handleChangeInitialBalance = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setInitialBalance(valueAsNumber);
  };

  const handleChangeDesiredMonthlyIncome = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setDesiredMonthlyIncome(valueAsNumber);
  };

  const handleChangeSsMonthlyAt62 = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setSsMonthlyAt62(valueAsNumber);
  };

  const handleChangeSsMonthlyAt70 = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setSsMonthlyAt70(valueAsNumber);
  };

  const handleChangeSsMonthlyAtFRA = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    setSsMonthlyAtFRA(valueAsNumber);
  };

  return (
    <>
      <VStack width="100%" align="stretch" spacing={8}>
        <Card>
          <CardHeader>
            <Heading size={"lg"}>Your Money</Heading>
            <Text>
              Start by telling us your savings and how much per month you think
              you will need in retirement.
            </Text>
          </CardHeader>

          <CardBody>
            <SimpleGrid columns={3} spacing={10}>
              <FormControl>
                <NumberInput
                  value={initialBalance}
                  onChange={handleChangeInitialBalance}
                  step={10000}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  Starting retirement savings, increments of $10,000
                </FormHelperText>
              </FormControl>

              <FormControl>
                <NumberInput
                  value={desiredMonthlyIncome}
                  onChange={handleChangeDesiredMonthlyIncome}
                  step={100}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  Monthly income goal, increments of $100
                </FormHelperText>
              </FormControl>
            </SimpleGrid>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size={"lg"}>Balance Projection</Heading>
            <Text>
              Given your financial goals, here's how your nest egg looks as you
              get older. We calculate three key scenarios: Age 62, 66 and 10
              months (FRA), and 70. Your savings grow, but you're withdrawing
              some to maintain your monthly goals.
            </Text>
          </CardHeader>
          <CardBody>
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
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line dataKey="SS at 62" stroke="#82ca9d" strokeWidth={2} />
                  <Line
                    dataKey="SS at FRA"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line dataKey="SS at 70" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
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
              {formatCurrency(ssMonthlyAt70)}. You can change all of these
              numbers at the bottom of the page.
            </Alert>
          </CardFooter>
        </Card>
        <Card>
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
            <ButtonGroup size="md" isAttached variant="outline">
              <Button
                {...getScenarioButtonStyles("62")}
                onClick={() => handleScenarioClick("62")}
              >
                62
              </Button>
              <Button
                {...getScenarioButtonStyles("FRA")}
                onClick={() => handleScenarioClick("FRA")}
              >
                FRA
              </Button>
              <Button
                {...getScenarioButtonStyles("70")}
                onClick={() => handleScenarioClick("70")}
              >
                70
              </Button>
            </ButtonGroup>

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
                  {getScenario(selectedScenario)
                    .slice(0, 30)
                    .map((row, index) => (
                      <Tr key={index}>
                        <Td>{row.year}</Td>
                        <Td>{formatCurrency(row.ssMonthly)}</Td>
                        <Td>{formatCurrency(row.requiredFrom401kMonthly)}</Td>
                        <Td>{formatCurrency(row.totalMonthlyIncome)}</Td>
                        <Td>{formatCurrency(row.endingBalance)}</Td>
                        <Td>{row.withdrawalRate}%</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
        <Card>
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
              40% × 4.5% (bonds) = 7.9% average annual return.
            </Text>
          </CardHeader>

          <CardBody>
            <SimpleGrid columns={3} spacing={10}>
              <FormControl>
                <NumberInput
                  value={inflationRatePercent}
                  onChange={handleChangeInflationRatePercent}
                  min={0}
                  max={100}
                  step={0.1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Rate of inflation (%)</FormHelperText>
              </FormControl>

              <FormControl>
                <NumberInput
                  value={colaAdjustment}
                  onChange={handleChangeColaAdjustmentPercent}
                  min={0}
                  max={100}
                  step={0.1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  SSA cost-of-living adjustment (COLA) (%)
                </FormHelperText>
              </FormControl>

              <FormControl>
                <NumberInput
                  value={investmentReturn}
                  onChange={handleChangeInvestmentReturn}
                  min={0}
                  max={100}
                  step={0.1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Expected investment return (%)</FormHelperText>
              </FormControl>
            </SimpleGrid>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size={"lg"}>Social Security</Heading>
            <Text>Adjust the current Social Security limits as necessary.</Text>
          </CardHeader>

          <CardBody>
            <SimpleGrid columns={3} spacing={10}>
              <FormControl>
                <NumberInput
                  value={ssMonthlyAt62}
                  onChange={handleChangeSsMonthlyAt62}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Age 62</FormHelperText>
              </FormControl>
              <FormControl>
                <NumberInput
                  value={ssMonthlyAtFRA}
                  onChange={handleChangeSsMonthlyAtFRA}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Full Retirement Age</FormHelperText>
              </FormControl>
              <FormControl>
                <NumberInput
                  value={ssMonthlyAt70}
                  onChange={handleChangeSsMonthlyAt70}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>Age 70</FormHelperText>
              </FormControl>
            </SimpleGrid>
          </CardBody>
        </Card>{" "}
      </VStack>
    </>
  );
};

export default RetirementCalculator;
