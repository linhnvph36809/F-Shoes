import { Form } from 'antd';
import Title from './components/Title';
import InputPrimary from '../../../components/Input';
import ButtonComponent from './components/Button';

const Register = () => {
    return (
        <>
            <section>
                <div className="my-10">
                    <Title>Faisons de toi un membre Nike.</Title>
                </div>
                <div>
                    <Form>
                        <InputPrimary placeholder="Code" />
                        <div className="flex-row-center gap-x-5">
                            <InputPrimary placeholder="First Name" />
                            <InputPrimary placeholder="Last Name" />
                        </div>
                        <InputPrimary placeholder="Password" />
                        <label htmlFor="" className="mb-3 block color-primary text-[14px]">
                            Date de naissance
                        </label>
                        <div className="flex gap-x-5">
                            <InputPrimary placeholder="Last Name" />
                            <InputPrimary placeholder="Last Name" />
                            <InputPrimary placeholder="Last Name" />
                        </div>
                        <p className="w-[80%] text-[#757575] text-16px font-medium my-10">
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
                            <ButtonComponent>Register</ButtonComponent>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default Register;
