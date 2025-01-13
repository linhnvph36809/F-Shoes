
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SquarePen } from 'lucide-react';

import Heading from '../../components/Heading';
import TableAdmin from '../../components/Table';
import { columnsAttribute } from './datas';
import useAttribute, { QUERY_KEY } from '../../../../hooks/useAttribute';
import SkeletonComponent from '../../components/Skeleton';
import ButtonEdit from '../../components/Button/ButtonEdit';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { PATH_ADMIN } from '../../../../constants/path';
import ButtonDelete from '../../components/Button/ButtonDelete';
import { showMessageActive } from '../../../../utils/messages';
import { FormattedMessage } from 'react-intl';
import ModalAddAttribute from './ModalAddAttribute';
import { useEffect, useState } from 'react';
import { handleChangeMessage } from '../../../../utils';
import { useContextGlobal } from '../../../../contexts';
import PaginationComponent from '../../../../components/Pagination';


export const KEY = 'attribute';

const AddAttribute = () => {
    const {locale} = useContextGlobal();
    const navigate = useNavigate();
    const location = useLocation();
    const urlQuery = new URLSearchParams(location.search);
    const page = urlQuery.get('page') || 1;
    
    const { data, isLoading } = useQueryConfig([QUERY_KEY, `attribute-page=${page}`], `/api/attribute?include=values&times=attribute&paginate=true&per_page=5&page=${page}`);
    const totalItems = data?.data?.paginator.total_item || 0;
    const pageSize = data?.data?.paginator.per_page || 10;
    console.log(data,'da');
    
    
    const { deleteAttribute,loadingDelete } = useAttribute();
    const [attributeDeletedId,setAttributeDeletedId] = useState<number|string>(0);
    const handleDeleteAttribute = (id: string | number) => {
        if (id) {
          
            showMessageActive(
                handleChangeMessage(
                    locale
                    ,'Are you sure that you want to delete this attribute?',
                    'Bạn có chắc muốn xóa thuộc tính này?')
                    , '', 'warning', () => {
                setAttributeDeletedId(id);
            });
        }
    };
    useEffect(() => {
        if(attributeDeletedId !== 0){
            deleteAttribute(attributeDeletedId);
        }
        
    },[attributeDeletedId]);
    useEffect(() => {
        if(!loadingDelete && attributeDeletedId !== 0){
            setAttributeDeletedId(0);
        }
    },[loadingDelete]);
    const handlePageChange = (page: number) => {
        urlQuery.set('page', `${page}`);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    const Edit = {
        title: '',
        dataIndex: 'id',
        key: '5',
        render: (id: any,record:any) => {
            let btnDelete = <ButtonDelete onClick={() => handleDeleteAttribute(id)} />
            if(loadingDelete && attributeDeletedId !== 0 && attributeDeletedId === id){
                btnDelete = <ButtonDelete loading={true} />
            }
            return (
                <div className="flex gap-2">
                    <Link to={PATH_ADMIN.UPDATE_ATTRIBUTE + id}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    {record?.can_delete ?btnDelete : ''}
                </div>
            );
        },
    };

    return (
        <>
            <section>
                <Heading>
                    <FormattedMessage id="Attribute" />
                </Heading>
                <ModalAddAttribute />
                <div className="mt-10">
                    {isLoading ? (
                        <SkeletonComponent />
                    ) : (
                        <TableAdmin columns={[...columnsAttribute, Edit]}  pagination={false} rowKey="id" datas={data?.data?.data} />
                    )}
                </div>
                <PaginationComponent
                className="mt-4"
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                handlePageChange={handlePageChange}
            />

            </section>
        </>
    );
};
export default AddAttribute;
