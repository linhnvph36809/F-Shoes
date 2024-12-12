import ButtonPrimary from '../../../../components/Button';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';

const ButtonSubmit = ({ width = 'w-[120px]', height = 'h-[56px]', loading, children = "Submit" }: any) => {
    return (
        <ButtonPrimary width={width} height={height} htmlType="submit">
            {loading ? <LoadingSmall /> : children}
        </ButtonPrimary>
    );
};

export default ButtonSubmit;
