import React, { useState } from 'react';
import { Avatar, Badge, Button, Card, Dropdown, Menu, Radio } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { UserOutlined, EyeOutlined, ShoppingCartOutlined, ShoppingOutlined, DownOutlined, GoogleOutlined } from '@ant-design/icons';

import './style.scss';
import { Pie } from '@ant-design/charts';

// Dữ liệu mẫu cho biểu đồ doanh thu và doanh số
const revenueData = [
  { name: 'Sep', revenue: 30, sales: 20 },
  { name: 'Oct', revenue: 40, sales: 25 },
  { name: 'Nov', revenue: 50, sales: 30 },
  { name: 'Dec', revenue: 45, sales: 35 },
  { name: 'Jan', revenue: 70, sales: 50 },
  { name: 'Feb', revenue: 60, sales: 45 },
];

// Dữ liệu mẫu cho biểu đồ lợi nhuận theo tuần
const profitData = [
  { name: 'M', sales: 40, revenue: 60 },
  { name: 'T', sales: 55, revenue: 70 },
  { name: 'W', sales: 50, revenue: 65 },
  { name: 'T', sales: 35, revenue: 50 },
  { name: 'F', sales: 60, revenue: 80 },
  { name: 'S', sales: 70, revenue: 90 },
  { name: 'S', sales: 60, revenue: 80 },
];

const Statistic = () => {
    const [timePeriod, setTimePeriod] = useState('Month');

    const handleTimePeriodChange = (e) => {
      setTimePeriod(e.target.value);
    };

    const [selectedPeriod, setSelectedPeriod] = useState('Last Week');

  // Hàm xử lý khi người dùng chọn một mục trong menu
  const handleMenuClick = (e) => {
    setSelectedPeriod(e.key);
  };
    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="This Week">This Week</Menu.Item>
          <Menu.Item key="Last Week">Last Week</Menu.Item>
        </Menu>
      );

      //component biểu đò tròn
      const data = [
        { type: 'Desktop', value: 65, color: '#6366F1' },
        { type: 'Tablet', value: 34, color: '#7C3AED' },
        { type: 'Mobile', value: 45, color: '#60A5FA' },
        { type: 'Unknown', value: 12, color: '#0EA5E9' },
      ];
      // Cấu hình biểu đồ tròn (Pie chart)
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        innerRadius: 0.6,
        color: data.map((item) => item.color),
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: { fontSize: 14, textAlign: 'center' },
        },
        interactions: [{ type: 'element-active' }],
      };
      // Menu cho phần chọn thời gian
      const menuAnalytic = (
        <Menu>
          <Menu.Item key="1">Monthly</Menu.Item>
          <Menu.Item key="2">Weekly</Menu.Item>
        </Menu>
      );
      const dataDasboard = [
        {
          icon: <EyeOutlined />,
          amount: "$3.456K",
          title: "Total views",
          percentage: "0.43%",
          positive: true,
        },
        {
          icon: <ShoppingCartOutlined />,
          amount: "$45.2K",
          title: "Total Profit",
          percentage: "4.35%",
          positive: true,
        },
        {
          icon: <ShoppingOutlined />,
          amount: "2.450",
          title: "Total Product",
          percentage: "2.59%",
          positive: true,
        },
        {
          icon: <UserOutlined />,
          amount: "3.456",
          title: "Total Users",
          percentage: "0.95%",
          positive: false,
        },
      ];
  // Component thẻ chỉ số
  const DashboardCard = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {dataDasboard.map((item, index) => (
          <Card
            key={index}
            className="flex flex-col items-center p-4 shadow-md hover:shadow-lg"
            style={{ borderRadius: "8px" }}
          >
            <div className="text-5xl text-black-600">{item.icon}</div>
            <div className="text-4xl font-semibold">{item.amount}</div>
            <div className="flex items-center ">
  <div className="text-gray-600 mr-10 text-2xl">{item.title}</div>
  <div className={`text-2xl ${item.positive ? "text-black-600" : "text-gray-600"}`}>
  {item.positive ? "↑" : "↓"} {item.percentage}
</div>

</div>

          </Card>
        ))}
      </div>
    );
  };

  // Component biểu đồ doanh thu
  const RevenueChart = () => (
    <div className="revenue-chart-container bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
      <div className="flex justify-center items-center">
  <span className="text-black-600 font-semibold mr-6">● Total Revenue</span>
  <span className="text-gray-600 font-semibold">● Total Sales</span>
</div>

        <Radio.Group
            onChange={handleTimePeriodChange}
            defaultValue="Month"
            buttonStyle="solid"
            size="small"
            style={{ display: 'flex', gap: '8px' }} 
>
            <Radio.Button value="Day" style={{ backgroundColor: 'black', color: 'white' }}>Day</Radio.Button>
            <Radio.Button value="Week" style={{ backgroundColor: 'black', color: 'white' }}>Week</Radio.Button>
            <Radio.Button value="Month" style={{ backgroundColor: 'black', color: 'white' }}>Month</Radio.Button>
    </Radio.Group>
</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#000000 " activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="sales" stroke="#888888" />
        </LineChart>
      </ResponsiveContainer>
    </div>

  );

  // Component biểu đồ lợi nhuận
  const ProfitChart = () => (
    <div className="revenue-chart-container bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-black-600 font-semibold mr-2"> Revenue</span>
          <span className="text-gray-600 font-semibold"> Sales</span>
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
      <Button
      size="small">
        {selectedPeriod} <DownOutlined />
      </Button>
    </Dropdown>
</div>
<ResponsiveContainer width="100%" height={300}>
      <BarChart data={profitData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#000000 " />
        <Bar dataKey="revenue" fill="#888888" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );

  //Biểu đồ tròn
  const Analytics= () => (
    <div className="revenue-chart-container bg-white p-4 rounded-lg shadow-md " >
      <div className="flex items-center justify-between mb-2">
      <span className="text-black-600 font-semibold mr-2">Visitors Analytics</span>
      <Dropdown overlay={menuAnalytic}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Monthly <DownOutlined />
        </a>
      </Dropdown>
    </div>
    <Pie {...config} />
    <div className="flex justify-around mt-6">
      {data.map((item) => (
        <div key={item.type} className="text-center">
          <div className="flex items-center">
            <span className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className="font-medium">{item.type}</span>
          </div>
          <span className="text-black-500">{item.value}%</span>
        </div>
      ))}
    </div>
  </div>
  );

  // Bảng TopChannel
  const TopChannels = () => {
    const channelData = [
      { source: 'Google', visitors: '3.5K', revenue: '$5,768', sales: 590, conversion: '4.8%', color: '#6366F1' },
      { source: 'Twitter', visitors: '2.2K', revenue: '$4,635', sales: 467, conversion: '4.3%', color: '#1DA1F2' },
      { source: 'Github', visitors: '2.1K', revenue: '$4,290', sales: 420, conversion: '3.7%', color: '#333' },
      { source: 'Vimeo', visitors: '1.5K', revenue: '$3,580', sales: 389, conversion: '2.5%', color: '#1AB7EA' },
      { source: 'Facebook', visitors: '1.2K', revenue: '$2,740', sales: 230, conversion: '1.9%', color: '#1877F2' },
    ];
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full">
        <span className="text-black-600 font-semibold mr-2">Top Channels</span>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2">SOURCE</th>
              <th>VISITORS</th>
              <th>REVENUE</th>
              <th>SALES</th>
              <th>CONVERSION</th>
            </tr>
          </thead>
          <tbody>
            {channelData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 flex items-center">
                  <Avatar style={{ backgroundColor: item.color }} icon={<GoogleOutlined />} />
                  <span className="ml-3 font-medium">{item.source}</span>
                </td>
                <td>{item.visitors}</td>
                <td className="text-black-600">{item.revenue}</td>
                <td>{item.sales}</td>
                <td className="text-gray-600">{item.conversion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  // bảng Chat
  const Chats = () => {
    const chatData = [
      { name: 'Devid Heilo', message: 'Hello, how are you?', time: '12 min', status: 'online', unread: 3 },
      { name: 'Henry Fisher', message: 'I am waiting for you', time: '5:54 PM', status: 'online', unread: 0 },
      { name: 'Wilium Smith', message: 'Where are you now?', time: '10:12 PM', status: 'away', unread: 0 },
      { name: 'Henry Deco', message: 'Thank you so much!', time: 'Sun', status: 'online', unread: 2 },
      { name: 'Jubin Jack', message: 'I really love that!', time: 'Oct 23', status: 'offline', unread: 0 },
    ];
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <span className="text-black-600 font-semibold mr-2">Chats</span>
        <div>
          {chatData.map((chat, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Badge dot color={chat.status === 'online' ? 'green' : chat.status === 'away' ? 'yellow' : 'red'}>
                  <Avatar>{chat.name.charAt(0)}</Avatar>
                </Badge>
                <div className="ml-3">
                  <h4 className="font-medium">{chat.name}</h4>
                  <p className="text-gray-500 text-sm">{chat.message}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-500 text-sm">{chat.time}</span>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">{chat.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render toàn bộ Dashboard
  return (
    <div>
         <div className="">
            <DashboardCard />
         </div>
    <div className="min-h-screen bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


      <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-4">

        <RevenueChart />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-4">

        <ProfitChart />

      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-4">

        <Analytics />

      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-4">

        <TopChannels />
        <Chats />
     </div>

    </div>

     </div>
  );
};

export default Statistic;
