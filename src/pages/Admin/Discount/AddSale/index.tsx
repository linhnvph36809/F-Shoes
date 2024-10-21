import { Form, Input, Button, DatePicker, Table, Checkbox, Select } from 'antd';
import Heading from '../../components/Heading';


const { Option } = Select;

const AddSale = () => {
  const [form] = Form.useForm();

  // Dữ liệu mẫu cho danh sách sản phẩm
  const dataSource = [
    {
      key: '1',
      image: 'https://via.placeholder.com/50',
      name: 'Giày MLB Chunky Wide New York [Trắng - 39]',
      quantity: 20,
      price: '150,000 đ',
    },
    {
      key: '2',
      image: 'https://via.placeholder.com/50',
      name: 'Giày MLB Chunky Wide New York [Đen - 39]',
      quantity: 10,
      price: '100,000 đ',
    },
    {
      key: '3',
      image: 'https://via.placeholder.com/50',
      name: 'Giày MLB Chunky Wide New York [Đen - 40]',
      quantity: 20,
      price: '100,000 đ',
    },
  ];

  // Cột cho bảng sản phẩm
  const columns = [
    {
      title: '',
      dataIndex: 'select',
      key: 'select',
      render: () => <Checkbox />,
    },
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: any) => <img src={image} alt="product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price:any) => <span style={{ color: 'black' }}>{price}</span>,
    },
  ];

  return (
    <div className="discount-product-list">
      <Heading>Add Sale</Heading>
      <Form
        form={form}
        layout="vertical"
        className="form-container"
      >
        <div className="form-row">
          <Form.Item
            label="Discount code"
            name="code"
            rules={[{ required: true, message: 'Please enter the discount code' }]}
          >
            <Input placeholder="Enter the discount code..." />
          </Form.Item>
          <Form.Item
            label="Name of the discount campaign"
            name="name"
            rules={[{ required: true, message: 'Please enter the name of the discount campaign' }]}
          >
            <Input placeholder="Enter the name of the discount campaign..." />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Value (%)"
            name="discountValue"
            rules={[{ required: true, message: 'Please enter the discount percentage' }]}
          >
            <Input suffix="%" placeholder="Enter the discount percentage..." />
          </Form.Item>
          <Form.Item
            label="Start date"
            name="startDate"
            rules={[{ required: true, message: 'Please select a start date' }]}
          >
            <DatePicker showTime format="MM/DD/YYYY HH:mm:ss" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="End date"
            name="endDate"
            rules={[{ required: true, message: 'Please select an end date' }]}
          >
            <DatePicker showTime format="MM/DD/YYYY HH:mm:ss" />
          </Form.Item>
        </div>

        <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
        Add another discount period
        </Button>


      </Form>

      <div className="product-list">
        <h3>Detailed product list</h3>

        {/* Form tìm kiếm sản phẩm */}
        <div className="search-filters">
          <Input placeholder="Product name" style={{ width: 200, marginRight: 20 }} />
          <Select placeholder="Choose a size" style={{ width: 150, marginRight: 20 }}>
            <Option value="39">39</Option>
            <Option value="40">40</Option>
          </Select>
          <Select placeholder="Choose a color." style={{ width: 150, marginRight: 20 }}>
            <Option value="trang">White</Option>
            <Option value="den">Black</Option>
          </Select>
          <Select placeholder="Choose the type of sole" style={{ width: 150, marginRight: 20 }}>
            <Option value="casual">Casual</Option>
            <Option value="sport">Sport</Option>
          </Select>
          
          <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
          Refresh 
        </Button>
        <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
        Search
        </Button>

        </div>

        {/* Bảng danh sách sản phẩm */}
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
};

export default AddSale;
