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
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 1000 * 3600,
    },
  );

  return (
    <div>
      {isLoading ? (
        "Loading Charts..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map(price => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "rgba(0,0,0,0)",
            },
            grid: {
              show: false,
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
            },
            yaxis: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#F2CD5C", "#F2921D", "#A61F69", "#400E32"],
                stops: [0, 100],
              },
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
