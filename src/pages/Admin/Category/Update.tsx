import { message, Select } from 'antd';
import { CopyPlus, SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonPrimary from '../../../components/Button';
import useCategory from '../../../hooks/useCategory';
import useProduct from '../../../hooks/useProduct';
import { ICategory } from '../../../interfaces/ICategory';
import { IProduct } from '../../../interfaces/IProduct';
import { showMessageActive } from '../../../utils/messages';
import ButtonEdit from '../components/Button/ButtonEdit';
import Heading from '../components/Heading';
import SkeletonComponent from '../components/Skeleton';
import TableAdmin from '../components/Table';
import { columnsAttribute } from '../Products/datas';
// import './style.scss';

const UpdateCategory = () => {
    const { id } = useParams<{ id: string }>();
    const { categories, mainCategories, loading, putCategory, addProductsToCategory, deleteProductFromCategory } =
        useCategory();
    const [initialValues, setInitialValues] = useState<ICategory | null>(null);
    const [categoryId, setCategoryId] = useState<string | number | null>(null);
    const [products, setProducts] = useState<any[]>([]);

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const { products: allProducts } = useProduct();

    const handleDeleteProduct = (productId: string | number) => {
        showMessageActive('Are you sure you want to delete this product?', '', 'warning', async () => {
            try {
                await deleteProductFromCategory(categoryId, [productId]);
            } catch (error) {
                message.error('Failed to delete product. Please try again.');
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

    // const handleFinish = useCallback(
    //     async (updatedCategory: ICategory) => {
    //         try {
    //             if (categoryId) {
    //                 // await putCategory({
    //                 //     ...updatedCategory,
    //                 //     id: categoryId,
    //                 //     products,
    //                 // });
    //                 message.success('Category updated successfully!');
    //             }
    //         } catch (error) {
    //             message.error('Failed to update category. Please try again.');
    //             console.error('Error updating category:', error);
    //         }
    //     },
    //     [categoryId, putCategory, products],
    // );

    const columnDelete = {
        title: 'Action',
        dataIndex: 'slug',
        key: '8',
        render: (slug: string | number, values: IProduct) => {
            return (
                <div className="flex-row-center gap-x-3">
                    <Link to={`/admin/add-variant/${slug}`}>
                        <ButtonEdit>
                            <CopyPlus />
                        </ButtonEdit>
                    </Link>
                    <Link to={`/admin/update-product/${slug}`}>
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
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>Add Category For Product</Heading>
                    {/* <FormCategory
                        mainCategories={mainCategories}
                        onFinish={handleFinish}
                        initialValues={initialValues}
                    /> */}
                    <section>
                        <div className="my-4">
                            <Select
                                mode="multiple"
                                value={selectedProducts}
                                onChange={(value) => setSelectedProducts(value)}
                                placeholder="Select products"
                                style={{ width: '360px', height: '50px', marginRight: '10px' }}
                            >
                                {allProducts.map((product) => (
                                    <Select.Option key={product.id} value={String(product.id)}>
                                        {product.name}
                                    </Select.Option>
                                ))}
                            </Select>
                            <ButtonPrimary
                                onClick={handleAddProducts}
                                width="w-[120px]"
                                height="h-[50px]"
                                htmlType="submit"
                            >
                                Add Products
                            </ButtonPrimary>
                        </div>
                        <div>
                            <TableAdmin
                                scroll={{ x: 'max-content' }}
                                rowKey="id"
                                columns={[...columnsAttribute, columnDelete]}
                                datas={products}
                            />
                        </div>
                    </section>
                </section>
            )}
        </>
    );
};

export default UpdateCategory;
