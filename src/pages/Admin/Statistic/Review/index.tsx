import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useQueryConfig from '../../../../hooks/useQueryConfig';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieChartExample = () => {
    const { data: review } = useQueryConfig('statistic', '/api/statistics/review');
    const data = [
        { name: 'Five', value: review?.data?.five },
        { name: 'Four', value: review?.data?.four },
        { name: 'Three', value: review?.data?.three },
        { name: 'Two', value: review?.data?.two },
        { name: 'One', value: review?.data?.one },
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    name="Review"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartExample;
