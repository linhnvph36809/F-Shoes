import { Form } from 'antd';
import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';
import LoadingSmall from '../../../components/Loading/LoadingSmall';

const CheckEmail = ({ handleCheckEmail, loading }: any) => {
    return (
        <section>
            <div className="my-10">
                <Title>Saisis ton adresse e-mail pour nous rejoindre ou te connecter.</Title>
            </div>
            <div>
                <Form
                    onFinish={(e) => {
                        handleCheckEmail(e);
                    }}
                >
                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter email',
                            },
                        ]}
                    >
                        <InputPrimary placeholder="Email" type="email" />
                    </Form.Item>
                    <p className="w-[80%] text-[#757575] sm:text-[12px] md:text-base font-medium sm:my-5 md:my-10">
                        En continuant, j'accepte la{' '}
                        <a href="#" className="underline">
                            {' '}
                            Politique de confidentialité
                        </a>{' '}
                        et aux
                        <a href="#" className="underline">
                            Conditions d'utilisation
                        </a>{' '}
                        de Nike.
                    </p>
                    <div className="flex justify-end">
                        <ButtonComponent htmlType="submit">{loading ? <LoadingSmall /> : 'Continuer'}</ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default CheckEmail;
