import { Form } from 'antd';

import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';

const Password = () => {
    return (
        <section>
            <div className="my-10">
                <Title>Quel est ton mot de passe ?.</Title>
            </div>
            <div>
                <Form>
                    <InputPrimary placeholder="Password" type="password" />
                    <p className="w-[80%] text-[#757575] md:text-base font-medium sm:my-5 md:my-10">
                        <a href="#" className="underline">
                            Mot de passe oublié ?
                        </a>{' '}
                    </p>
                    <div className="flex justify-end">
                        <ButtonComponent>Se connecter</ButtonComponent>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Password;
