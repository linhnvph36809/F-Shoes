import { message, Select } from 'antd';
import { CopyPlus, SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonPrimary from '../../../components/Button';
import useCategory from '../../../hooks/useCategory';
import useProduct from '../../../hooks/useProduct';
import { ICategory } from '../../../interfaces/ICategory';
import { IProduct } from '../../../interfaces/IProduct';
import { showMessageActive, showMessageAdmin } from '../../../utils/messages';
import ButtonEdit from '../components/Button/ButtonEdit';
import Heading from '../components/Heading';
import SkeletonComponent from '../components/Skeleton';
import TableAdmin from '../components/Table';
import { columnsAttribute } from '../Products/datas';
import useQueryConfig from '../../../hooks/useQueryConfig';

const UpdateCategory = () => {
    const { id } = useParams<{ id: string }>();
    const { categories, loading, addProductsToCategory, deleteProductFromCategory } = useCategory();
    const [initialValues, setInitialValues] = useState<ICategory | null>(null);
    const [categoryId, setCategoryId] = useState<string | number | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const { data } = useQueryConfig(
        `all-product-admin-category`,
        `/api/product?include=categories,sale_price,variations`,
    );

    const allProducts = data?.data.data || [];

    const handleDeleteProduct = async (productId: string | number) => {
        showMessageActive('Are you sure you want to delete this product?', '', 'warning', async () => {
            try {
                await deleteProductFromCategory(categoryId, [productId]);
                setProducts((prev) => prev.filter((product) => product.id !== productId));
                showMessageAdmin('Product removed successfully!', '', 'success');
            } catch (error) {
                showMessageAdmin('Failed to delete product. Please try again.', '', 'error');
            }
        });
    };

    const handleAddProducts = async () => {
        try {
            const result = await addProductsToCategory(id, selectedProducts, allProducts);
            if (result.success) {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...result.addedProducts.filter((product) => !prevProducts.some((p) => p.id === product.id)),
                ]);
                message.success('Products added successfully!');
            }
        } catch (error) {
            message.error('Failed to add products. Please try again.');
        } finally {
            setSelectedProducts([]);
        }
    };

    useEffect(() => {
        if (id && categories.length > 0) {
            const categoryToUpdate = categories.find((category) => String(category.id) === id);
            if (categoryToUpdate) {
                setInitialValues(categoryToUpdate);
                setCategoryId(categoryToUpdate.id);
                if (categoryToUpdate.products) {
                    setProducts(categoryToUpdate.products);
                }
            } else {
                console.error('Category not found for id:', id);
            }
        }
    }, [id, categories]);

    const columnDelete = {
        title: 'Action',
        dataIndex: 'slug',
        key: '8',
        render: (_: string | number, values: IProduct) => {
            return (
                <div className="flex-row-center gap-x-3">
                    <Link to={`/admin/add-variant/${values.slug}`}>
                        <ButtonEdit>
                            <CopyPlus />
                        </ButtonEdit>
                    </Link>
                    <Link to={`/admin/update-product/${values.slug}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    <ButtonEdit onClick={() => handleDeleteProduct(values.id)}>
                        <Trash2 />
                    </ButtonEdit>
                </div>
            );
        },
    };

    return (
        <>
            <section>
                <Heading>Add Category For Product</Heading>
                <section>
                    <div className="my-4">
                        <Select
                            mode="multiple"
                            value={selectedProducts}
                            onChange={(value) => setSelectedProducts(value)}
                            placeholder="Select products"
                            className="font-medium"
                            style={{ width: '360px', height: '50px', marginRight: '10px' }}
                        >
                            {allProducts?.map((product: any) => (
                                <Select.Option key={product.id} value={String(product.id)}>
                                    {product.name}
                                </Select.Option>
                            ))}
                        </Select>
                        <ButtonPrimary
                            onClick={handleAddProducts}
                            width="w-[150px]"
                            height="h-[50px]"
                            htmlType="submit"
                        >
                            Add Products
                        </ButtonPrimary>
                    </div>
                    {loading ? (
                        <SkeletonComponent className="mt-10" />
                    ) : (
                        <div>
                            <TableAdmin
                                scroll={{ x: 'max-content' }}
                                rowKey="id"
                                columns={[...columnsAttribute, columnDelete]}
                                datas={products}
                            />
                        </div>
                    )}
                </section>
            </section>
        </>
    );
};

export default UpdateCategory;
