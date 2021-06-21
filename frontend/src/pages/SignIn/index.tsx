import React, { useRef, useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";


import getValidationErrors from "../../utils/getValidationErrors";

import Input from '../../components/Input';
import Button from '../../components/Button';


import { Container, Content, Background } from './styles';
import { AuthContext } from "../../hooks/auth";

interface SignInFormData {
  email: string;
  senha: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {user, signIn} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);


  const history = useHistory();

  const handleSubmit = useCallback(async(data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().email("Digite um e-mail válido") .required("E-mail obrigatório"),
        password: Yup.string().required("Senha obrigatória"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      signIn({email: data.email, senha: data.senha});
    } catch (err) {
      const erros = getValidationErrors(err);

      formRef.current?.setErrors(erros);
    }
  }, [signIn]);


  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Password" />

          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;

