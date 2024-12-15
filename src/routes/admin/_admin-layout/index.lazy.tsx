import { HomeOutlined } from '@ant-design/icons';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Card, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../components/app-chart';

export const Route = createLazyFileRoute('/admin/_admin-layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <HomeOutlined />
        <span>Trang chủ</span>
      </div>

      <Card>
        <div className='flex items-center justify-between py-2'>
          <p className='text-lg font-semibold'>
            Tổng số khách hàng mua hàng và thêm vào giỏ hàng
          </p>

          <DatePicker.RangePicker
            format='DD/MM/YYYY'
            defaultValue={[
              dayjs().subtract(7, 'days').startOf('day'),
              dayjs().endOf('day'),
            ]}
          />
        </div>

        <div className='h-[80%] w-full mx-auto mt-4'>
          <ChartContainer
            config={{
              desktop: {
                label: 'Desktop',
                color: '#FD5C00',
              },
              mobile: {
                label: 'Mobile',
                color: '#1C1E66',
              },
            }}
            className='min-h-[200px] h-[500px] w-full'
          >
            <BarChart
              accessibilityLayer
              data={[
                { month: 'January', desktop: 186, mobile: 80 },
                { month: 'February', desktop: 305, mobile: 200 },
                { month: 'March', desktop: 237, mobile: 120 },
                { month: 'April', desktop: 73, mobile: 190 },
                { month: 'May', desktop: 209, mobile: 130 },
                { month: 'June', desktop: 214, mobile: 140 },
              ]}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
              <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
}
