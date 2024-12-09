import { useState } from 'react';
import { Modal, Form, Input, Rate, Menu, ConfigProvider } from 'antd';
import { Star } from 'lucide-react';
import { IReview } from '../../interfaces/IReview';
import useQueryConfig from '../../hooks/useQueryConfig';
import { useParams } from 'react-router-dom';

const ReviewForm = ({
  productId,
  isUpdate,
  defaultValues,
  handleSubmit,
}: {
  productId?: string | number;
  isUpdate: boolean;
  defaultValues?: IReview;
  handleSubmit: any;
}) => {
  const { slug } = useParams();

  let id: string | number | undefined;

  if (slug) {
    const index = slug.lastIndexOf('.');
    id = slug.substring(index + 1);
  }

  const { refetch } = useQueryConfig('get-review', `/api/product/${id}/reviews?times=review`);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    if (isUpdate) {
      if (defaultValues?.id) handleSubmit(values, defaultValues?.id);
    } else {
      handleSubmit({
        product_id: productId,
        ...values,
      });
    }
    setIsModalVisible(false);
    refetch();

  };

  return (
    <div>
      {isUpdate ? (
        <Menu.Item key="2" onClick={showModal}>
          Update
        </Menu.Item>
      ) : (
        <p
          onClick={showModal}
          className="color-primary text-16px font-medium underline mt-8 hover:cursor-pointer"
        >
          Write a Review
        </p>
      )}
      <Modal
        title={<span className="text-[28px] font-semibold color-primary">Product Review</span>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={<span className="text-white">Submit</span>}
        cancelText={<div className="hover:bg-[#111111] hover:text-white transition-global">Cancel</div>}
        okButtonProps={{ className: 'bg-black hover:opacity-90 transition-global' }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
          initialValues={defaultValues}
        >
          <Form.Item
            label={<span className="font-semibold">Rating</span>}
            name="rating"
            rules={[{ required: true, message: 'Please enter your Rate' }]}
          >
            <Rate character={<Star />} className="text-yellow-400" />
          </Form.Item>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  hoverBorderColor: '#ccc',
                  activeBorderColor: '#111111',
                  activeShadow: '0 0 1px #111111',
                },
              },
            }}
          >
            <Form.Item
              label={<span className="font-semibold">Title</span>}
              name="title"
              rules={[{ required: true, message: 'Please enter a title for your review' }]}
            >
              <Input
                maxLength={100}
                placeholder="Enter a title for your review..."
                className="border rounded-lg p-2 w-full"
              />
            </Form.Item>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  hoverBorderColor: '#ccc',
                  activeBorderColor: '#111111',
                  activeShadow: '0 0 1px #111111',
                },
              },
            }}
          >
            <Form.Item
              label={<span className="font-semibold">Product Review</span>}
              name="text"
              rules={[{ required: true, message: 'Please enter your review' }]}
            >
              <Input.TextArea
                maxLength={200}
                rows={6}
                placeholder="Write your review here..."
                className="border rounded-lg p-2 w-full"
              />
            </Form.Item>
          </ConfigProvider>
        </Form>
      </Modal>
    </div>
  );
};

export default ReviewForm;
