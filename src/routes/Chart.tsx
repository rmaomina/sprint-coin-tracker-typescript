import { fetchCoinHistory } from "api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, isError, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000,
    },
  );

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      {isLoading
        ? "Loading Charts..."
        : data && (
            <ApexChart
              type="candlestick"
              series={[
                {
                  data: data?.map(price => ({
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close],
                  })),
                },
              ]}
              options={{
                theme: {
                  mode: "dark",
                  palette: "palette1",
                },
                chart: {
                  height: 500,
                  width: 500,
                  toolbar: {
                    tools: {},
                  },
                  background: "rgba(0,0,0,0)",
                },
                grid: {
                  show: false,
                },
                plotOptions: {
                  candlestick: {
                    wick: {
                      useFillColor: true,
                    },
                  },
                },
                xaxis: {
                  labels: {
                    show: false,
                    datetimeFormatter: {
                      month: "mmm 'yy",
                    },
                  },
                  type: "datetime",
                  categories: data?.map(date => date.time_close),
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                yaxis: {
                  show: false,
                },
                tooltip: {
                  y: {
                    formatter: v => `$ ${v.toFixed(2)}`,
                  },
                },
              }}
            />
          )}
    </div>
  );
}

export default Chart;
