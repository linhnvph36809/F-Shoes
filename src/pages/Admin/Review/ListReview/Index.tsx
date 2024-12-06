import { EyeOutlined, StarFilled } from '@ant-design/icons';
import { message, Typography } from 'antd';
import { Trash2 } from 'lucide-react';
import LoadingBlock from '../../../../components/Loading/LoadingBlock';
import useReview from '../../../../hooks/useReview';
import { IReview } from '../../../../interfaces/IReview';
import ButtonEdit from '../../components/Button/ButtonEdit';
import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const ListReview = () => {
    const { reviews, loading, deleteReview } = useReview(); // Use the useReview hook

    const handleDeleteUser = async (id: string | number) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá Review này không?')) {
            try {
                await deleteReview(id); // Giả sử deleteUser trả về kết quả thành công hoặc lỗi

                message.success('Xóa Review thành công!');
            } catch (error) {
                message.error('Đã xảy ra lỗi khi xóa Review. Vui lòng thử lại.');
            }
        }
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        {/* Display the product image */}
                        <img
                            src={record.product.image_url}
                            alt="Product"
                            style={{ width: '250px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <br />
                    </div>
                </div>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_: any, record: IReview) => (
                <Text style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{record.title}</Text>
            ),
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
            render: (_: any, record: IReview) => (
                <Text style={{ fontStyle: 'italic', fontSize: '14px', color: '#555' }}>{record.text}</Text>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: 150,
            render: (rating: number) => (
                <div>
                    {Array.from({ length: rating }, (_, index) => (
                        <StarFilled key={index} style={{ color: 'gold', width: '20px' }} />
                    ))}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <div className="flex-row-center gap-x-5">
                    <ButtonEdit onClick={() => handleDeleteUser(record.id)}>
                        <Trash2 />
                    </ButtonEdit>
                    <ButtonEdit>
                        <Link to={`/detail/${record?.product?.slug}`}>
                            <EyeOutlined />
                        </Link>
                    </ButtonEdit>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Heading>List Review</Heading>
            {loading ? (
                <LoadingBlock />
            ) : (
                <section>
                    <TableAdmin
                        columns={columns}
                        dataSource={reviews}
                        pagination={false}
                        rowKey="id" // Ensure each row has a unique key
                    />
                </section>
            )}
        </div>
    );
};

export default ListReview;
