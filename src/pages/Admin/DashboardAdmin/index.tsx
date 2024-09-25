import { Content } from 'antd/es/layout/layout';
import { Card, Col, Row } from 'antd';
import Heading from '../components/Heading';

const AdminDashboard = () => {
    return (
        <Content className="bg-gray-50">
            <section className="mb-5">
                <div className="flex justify-between items-center">
                    <Heading>Dashboard</Heading>
                    <a href="#" className="text-blue-500">
                        See All
                    </a>
                </div>
                <Row gutter={16}>
                    <Col span={12}>
                        {/* Card 1 */}
                        <Card className="bg-blue-500 text-white shadow" style={{ borderRadius: '8px' }}>
                            <p className="text-2xl">$5,756</p>
                            <p className="mt-2">CARD HOLDER: Eddy Cusuma</p>
                            <p className="text-sm mt-2">3778 **** **** 1234</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        {/* Card 2 */}
                        <Card className="shadow border" style={{ borderRadius: '8px' }}>
                            <p className="text-2xl">$5,756</p>
                            <p className="mt-2">CARD HOLDER: Eddy Cusuma</p>
                            <p className="text-sm mt-2">3778 **** **** 1234</p>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Weekly Activity */}
            <section className="mb-5">
                <h2 className="text-xl font-semibold mb-3">Weekly Activity</h2>
                <Card className="bg-white p-5 shadow" style={{ borderRadius: '8px' }}>
                    {/* Add your chart here */}
                    <p>Chart goes here...</p>
                </Card>
            </section>

            {/* Expense Statistics */}
            <section className="mb-5">
                <h2 className="text-xl font-semibold mb-3">Expense Statistics</h2>
                <Card className="bg-white p-5 shadow" style={{ borderRadius: '8px' }}>
                    {/* Pie chart here */}
                    <p>Pie chart goes here...</p>
                </Card>
            </section>

            {/* Recent Transactions */}
            <section className="mb-5">
                <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
                <Card className="bg-white p-5 shadow" style={{ borderRadius: '8px' }}>
                    {/* Transaction list here */}
                    <p>Transaction list goes here...</p>
                </Card>
            </section>
        </Content>
    );
};

export default AdminDashboard;
