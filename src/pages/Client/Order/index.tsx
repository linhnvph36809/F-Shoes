import React, { useState } from 'react';
import { Form, Button, Divider, Typography, Row, Col, Card, Progress, Select, Input, Checkbox, Radio } from 'antd';
import InputPrimary from '../../../components/Input';
import { CreditCardOutlined,  GoogleOutlined, SearchOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;
const { Option } = Select;

const provinces = [
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'hochiminh', label: 'TP. Hồ Chí Minh' },
    { value: 'danang', label: 'Đà Nẵng' },
    { value: 'haiphong', label: 'Hải Phòng' },
    { value: 'cantho', label: 'Cần Thơ' },
    { value: 'angiang', label: 'An Giang' },
    { value: 'bariavungtau', label: 'Bà Rịa - Vũng Tàu' },
    { value: 'bacgiang', label: 'Bắc Giang' },
    { value: 'backan', label: 'Bắc Kạn' },
    { value: 'baclieu', label: 'Bạc Liêu' },
    { value: 'bacninh', label: 'Bắc Ninh' },
    { value: 'bentre', label: 'Bến Tre' },
    { value: 'binhdinh', label: 'Bình Định' },
    { value: 'binhduong', label: 'Bình Dương' },
    { value: 'binhphuoc', label: 'Bình Phước' },
    { value: 'binhthuan', label: 'Bình Thuận' },
    { value: 'camau', label: 'Cà Mau' },
    { value: 'caobang', label: 'Cao Bằng' },
    { value: 'daklak', label: 'Đắk Lắk' },
    { value: 'daknong', label: 'Đắk Nông' },
    { value: 'dienbien', label: 'Điện Biên' },
    { value: 'dongnai', label: 'Đồng Nai' },
    { value: 'dongthap', label: 'Đồng Tháp' },
    { value: 'gialai', label: 'Gia Lai' },
    { value: 'hagiang', label: 'Hà Giang' },
    { value: 'hanam', label: 'Hà Nam' },
    { value: 'hatinh', label: 'Hà Tĩnh' },
    { value: 'haugiang', label: 'Hậu Giang' },
    { value: 'hoabinh', label: 'Hòa Bình' },
    { value: 'hungyen', label: 'Hưng Yên' },
    { value: 'khanhhoa', label: 'Khánh Hòa' },
    { value: 'kiengiang', label: 'Kiên Giang' },
    { value: 'kontum', label: 'Kon Tum' },
    { value: 'laichau', label: 'Lai Châu' },
    { value: 'lamdong', label: 'Lâm Đồng' },
    { value: 'langson', label: 'Lạng Sơn' },
    { value: 'laocai', label: 'Lào Cai' },
    { value: 'longan', label: 'Long An' },
    { value: 'namdinh', label: 'Nam Định' },
    { value: 'nghean', label: 'Nghệ An' },
    { value: 'ninhbinh', label: 'Ninh Bình' },
    { value: 'ninhthuan', label: 'Ninh Thuận' },
    { value: 'phutho', label: 'Phú Thọ' },
    { value: 'phuyen', label: 'Phú Yên' },
    { value: 'quangbinh', label: 'Quảng Bình' },
    { value: 'quangnam', label: 'Quảng Nam' },
    { value: 'quangngai', label: 'Quảng Ngãi' },
    { value: 'quangninh', label: 'Quảng Ninh' },
    { value: 'quangtri', label: 'Quảng Trị' },
    { value: 'soctrang', label: 'Sóc Trăng' },
    { value: 'sonla', label: 'Sơn La' },
    { value: 'tayninh', label: 'Tây Ninh' },
    { value: 'thaibinh', label: 'Thái Bình' },
    { value: 'thainguyen', label: 'Thái Nguyên' },
    { value: 'thanhhoa', label: 'Thanh Hóa' },
    { value: 'thuauthienhue', label: 'Thừa Thiên Huế' },
    { value: 'tiengiang', label: 'Tiền Giang' },
    { value: 'travinh', label: 'Trà Vinh' },
    { value: 'tuyenquang', label: 'Tuyên Quang' },
    { value: 'vinhlong', label: 'Vĩnh Long' },
    { value: 'vinhphuc', label: 'Vĩnh Phúc' },
    { value: 'yenbai', label: 'Yên Bái' }
];

const Order = () => {
    const [showManualAddressForm, setShowManualAddressForm] = useState(false);

    const handleLinkClick = () => {
        setShowManualAddressForm(true);
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

  return (
    <Row gutter={16} style={{ padding: '20px' }}>
      {/* Left Side - Form */}
      <Col xs={24} md={12}>
        <Card bordered={false}>
          
          
          <Form layout="vertical">
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
          <Title level={3}>Delivery</Title>
          <Button type="default" style={{ marginBottom: '15px' ,marginRight: '10px'}}>Become a Member</Button>
          <Button type="default" style={{ marginBottom: '25px' }}>Login</Button>
            <Title level={4}>Enter your name and address:</Title>
            <Text type="secondary">
                If you have a promo code, you will be able to input it after filling in your contact details.
            </Text>
            
            <Form layout="vertical" style={{ marginTop: '20px' }}>

             
            {!showManualAddressForm ? (
    <>
        <Form.Item label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
            <InputPrimary placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
            <InputPrimary placeholder="Last Name" />
        </Form.Item>
        <Form.Item label="Address">
            <InputPrimary placeholder="Start typing a street address or postcode" prefix={<SearchOutlined />} />
            <Text type="secondary" style={{ fontSize: '12px' }}>
                We do not ship to P.O. boxes
            </Text>
        </Form.Item>
        <a onClick={handleLinkClick} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
    Enter address manually
</a>
    </>
) : (
    <>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
            <InputPrimary placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
            <InputPrimary placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="address1" label="Address 1" rules={[{ required: true, message: 'Please enter your address' }]}>
            <InputPrimary placeholder="Address line 1" />
        </Form.Item>
        <Form.Item name="address2" label="Address 2">
            <InputPrimary placeholder="Address line 2" />
        </Form.Item>
        <Form.Item name="address3" label="Address 3">
            <InputPrimary placeholder="Address line 3" />
        </Form.Item>
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item label="Postal Code">
                    <InputPrimary placeholder="Postal Code" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item label="City">
                    <InputPrimary placeholder="City" />
                </Form.Item>
            </Col>
        </Row>
        <Form.Item label="Province/Municipality">
            <Select placeholder="Province/Municipality" style={{ width: '100%' }}>
                {provinces.map((province) => (
                    <Option key={province.value} value={province.value}>
                        {province.label}
                    </Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item label="Country">
            <InputPrimary value="Vietnam" readOnly suffix={<span style={{ color: 'green' }}>●</span>} />
        </Form.Item>
    </>
)}
            
            </Form>
        </div>
             
            
            <div style={{ borderTop: '1px solid #ddd', marginTop: '20px' }}></div>
             
            <div style={{width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <Title level={3}>Billing</Title>
            <p>What's your billing address?</p>

            <Checkbox onChange={handleCheckboxChange}>
                Billing matches shipping address
            </Checkbox> 

            {!isChecked && (
               <Form layout="vertical">
                <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
              <InputPrimary placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
              <InputPrimary placeholder="Last Name" />
            </Form.Item>
            <Form.Item name="address1" label="Address 1" rules={[{ required: true, message: 'Please enter your address' }]}>
              <InputPrimary placeholder="Address line 1" />
            </Form.Item>
            <Form.Item name="address2" label="Address 2" >
              <InputPrimary placeholder="Address line 2" />
            </Form.Item>
            <Form.Item name="address3" label="Address 3" >
              <InputPrimary placeholder="Address line 3" />
            </Form.Item>
                
               <Row gutter={16}>
                   <Col xs={24} md={12}>
                       <Form.Item label="Postal Code">
                           <InputPrimary placeholder="Postal Code" />
                       </Form.Item>
                   </Col>
                   <Col xs={24} md={12}>
                       <Form.Item label="City">
                           <InputPrimary placeholder="City" />
                       </Form.Item>
                   </Col>
               </Row>
   
               <Form.Item label="Province/Municipality">
               <Select placeholder="Province/Municipality" style={{ width: '100%' }}>
               {provinces.map((province) => (
                   <Option key={province.value} value={province.value}>
                       {province.label}
                   </Option>
               ))}
           </Select>
               </Form.Item>
   
               <Form.Item label="Country">
                   <InputPrimary value="Vietnam" readOnly suffix={<span style={{ color: 'green' }}>●</span>} />
               </Form.Item>
   
               <h3>What's your contact information?</h3>
               

               <Form layout="vertical" style={{ marginTop: '20px' }}>
               <Form.Item >
                   <InputPrimary placeholder="Email" />
                   <Text type="secondary">A confirmation email will be sent after checkout.</Text>
               </Form.Item>
   
               <Form.Item >
                   <InputPrimary placeholder="Phone Number" />
                   <Text type="secondary">A carrier might contact you to confirm delivery.</Text>
               </Form.Item>
               </Form>
               </Form>
   
            )}
            </div>
            <div style={{ borderTop: '1px solid #ddd', marginTop: '20px' }}></div>
            <div style={{width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <Title level={3} style={{ marginBottom: '16px' }}>Shipping</Title>
            
            <Text style={{ fontSize: '16px', color: '#555', marginTop: '25px' }}>250,000₫ Shipping</Text>
            
            <div style={{ marginTop: '16px' }}>
                <Text strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Shipment One</Text>
                <Text style={{ fontSize: '14px', color: '#555' }}>Arrives Mon, Nov 4 - Mon, Nov 11</Text>
            </div>
            
            <div style={{ marginTop: '16px' }}>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                    This is an international shipment requiring customs clearance
                </Text>
            </div>
            <div style={{ borderTop: '1px solid #ddd', marginTop: '20px' }}></div>
            </div>
            <div style={{width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px'}}>
            <Title level={3}>Payment</Title>
            
            {/* Promo Code */}
            <Form layout="vertical" style={{ marginBottom: '20px' }}>
                <Form.Item label="Have a promo code?">
                    <Input placeholder="Promo" />
                </Form.Item>
            </Form>
            
            {/* Payment Method */}
            <Form.Item label="How would you like to pay?">
                <Radio.Group onChange={handlePaymentChange} style={{ width: '100%' }}>
                    <Radio.Button value="card" style={styles.radioButton}>
                        <CreditCardOutlined style={styles.icon} /> Credit or Debit Card
                    </Radio.Button>
                    <Radio.Button value="paypal" style={styles.radioButton}>
                        <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={styles.iconImage}  /> PayPal
                    </Radio.Button>
                    <Radio.Button value="googlepay" style={styles.radioButton}>
                        <GoogleOutlined style={styles.icon} /> Google Pay
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>
            
            {/* Credit Card Details Form */}
            {selectedPayment === 'googlepay' && (
                <div style={{ marginTop: '20px' }}>
                    <Text type="secondary" style={{ fontSize: '12px', marginBottom: '10px', display: 'block' }}>
                        By clicking G Pay, you agree to ESW's <Link to="#">Terms and Conditions</Link>.
                    </Text>
                    
                    <Button type="primary" block style={styles.googlePayButton}>
                        Buy with <span style={{ fontWeight: 'bold', color: '#4285F4' }}>G</span>
                        <span style={{ fontWeight: 'bold', color: '#EA4335' }}>o</span>
                        <span style={{ fontWeight: 'bold', color: '#FBBC05' }}>o</span>
                        <span style={{ fontWeight: 'bold', color: '#4285F4' }}>g</span>
                        <span style={{ fontWeight: 'bold', color: '#34A853' }}>l</span>
                        <span style={{ fontWeight: 'bold', color: '#EA4335' }}>e</span> Pay
                    </Button>
                </div>
            )}
            {selectedPayment === 'paypal' && (
                <div style={{ marginTop: '20px' }}>
                    <Text type="secondary" style={{ fontSize: '12px', marginBottom: '10px', display: 'block' }}>
                        By clicking Pay with PayPal, you agree to the eShopWorld <Link href="#">Terms and Conditions</Link>.
                    </Text>
                    
                    <Button type="primary" block style={styles.paypalButton}>
                        Pay with <span style={{ fontWeight: 'bold' }}>PayPal</span>
                    </Button>
                </div>
            )}
            {selectedPayment === 'card' && (
                <Form layout="vertical" style={{ marginTop: '20px' }}>
                    <Title level={5}>Enter your payment details:</Title>
                    
                    <Form.Item label="Name on card">
                        <Input placeholder="Name on card" />
                    </Form.Item>
                    
                    <Form.Item label="Card number">
                        <Input placeholder="Card number" />
                    </Form.Item>
                    
                    <Form.Item style={{ display: 'flex', gap: '10px' }}>
                        <Form.Item label="MM/YY" style={{ flex: 1 }}>
                            <Input placeholder="MM/YY" />
                        </Form.Item>
                        
                        <Form.Item label="CVV" style={{ flex: 1 }}>
                            <Input placeholder="CVV" />
                        </Form.Item>
                    </Form.Item>
                    
                    <Text type="secondary" style={{ fontSize: '12px', marginBottom: '20px', display: 'block' }}>
                        By clicking Place Order, you agree to the ESW Terms and Conditions.
                    </Text>
                    
                    <Button type="primary" block style={styles.placeOrderButton}>
                        Place Order
                    </Button>
                </Form>
            )}
        </div>
          </Form>
        </Card>
      </Col>

      {/* Right Side - Order Summary */}
      <Col xs={24} md={12}>
      <div style={{width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
            <Card bordered={false}>
                <Title level={3}>Order Summary</Title>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text>Subtotal</Text>
                    <Text>3,669,000₫</Text>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text>Delivery/Shipping</Text>
                    <Text>250,000₫</Text>
                </div>
                
                <div style={{ margin: '16px 0', fontSize: '12px' }}>
                    <Text>Add 1,331,000₫ more to earn Free Shipping!</Text>
                    <Progress
                        percent={73}
                        showInfo={false}
                        strokeColor="#4caf50"
                        style={{ marginTop: '8px' }}
                    />
                    <Text style={{ float: 'right' }}>5,000,000₫</Text>
                </div>

                <Divider />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '8px' }}>
                    <Text>Total</Text>
                    <Text>3,919,000₫</Text>
                </div>

                <Divider />

                <div style={{ marginBottom: '16px' }}>
                    <Title level={5} style={{ marginBottom: '8px' }}>Arrives Fri, Nov 1 - Fri, Nov 8</Title>
                    <Text>Tatum 3 PF 'Zero Days Off' Basketball Shoes</Text>
                    <div style={{ marginTop: '8px' }}>
                        <Text>Qty: 1</Text>
                        <br />
                        <Text>Size EU 40</Text>
                        <br />
                        <Text>3,669,000₫</Text>
                    </div>
                </div>

                <Row justify="center">
                    <img
                        src="https://static.nike.com/a/images/f_jpg,b_rgb:FFFFFF,q_auto,h_400/03240aad-2e7f-43df-b129-65fefe67e8a6/FZ6601_002"
                        alt="Tatum 3 PF 'Zero Days Off' Basketball Shoes"
                        style={{ width: '100px', marginTop: '12px' }}
                    />
                </Row>
            </Card>
            </div>
        </Col>
    </Row>
  );
};
const styles = {
    radioButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '10px',
        width: '100%',
    },
    icon: {
        marginRight: '8px',
        fontSize: '18px',
        height: '19px',
    },
    placeOrderButton: {
        backgroundColor: '#f0f0f0',
        color: '#333',
        borderRadius: '5px',
        height: '40px',
    },
    paypalButton: {
        backgroundColor: '#909090',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '5px',
        height: '40px',
    },
    googlePayButton: {
        backgroundColor: '#909090',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '5px',
        height: '40px',
    },
    iconImage: {
        marginRight: '8px',
        height: '18px',
        verticalAlign: 'middle', // Đảm bảo hình ảnh nằm giữa dòng
    },
};
export default Order;
