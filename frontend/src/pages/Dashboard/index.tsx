import React, { useState, useCallback, useEffect, useMemo } from "react";
import {useAuth}  from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calender,
} from "./styles";
import { FiPower, FiClock} from  'react-icons/fi';
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const {signOut, user} = useAuth();

  useEffect(() => {
    fetch('https://api.novadax.com/v1/market/tickers')
    .then(response =>response.json())
    .then(data => console.log(data))
  }, []);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img src="https://github.com/github.png?size=50"
            alt="Imagem de Usuário" />
            <div>
              <span>Bem-vindo,</span>
              <strong>Administrador</strong>
            </div>

          </Profile>
          <button type="button" onClick={signOut}><FiPower/></button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Currency Portfólio</h1>
          <p>As criptomoedas mais conceituadas do mercado em um só lugar.</p>

          <NextAppointment>
            <strong>Títulos/Símbolos disponíveis</strong>
          </NextAppointment>
          <Section>
            <Appointment>
              <div>
                <strong>
                  <p>BTC</p> <br />
                  R$ de Vendas &nbsp; | &nbsp; R$ de Compra
                </strong>
              </div>
            </Appointment>
            <Appointment>
              <div>
                <strong>
                  <p>VET</p> <br />
                  R$ de Vendas &nbsp; | &nbsp; R$ de Compra
                </strong>
              </div>
            </Appointment>
            <Appointment>
              <div>
                <strong>
                  <p>WBTC</p> <br />
                  R$ de Vendas &nbsp; | &nbsp; R$ de Compra
                </strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calender>
          <NextAppointment>
            <strong>Cateira </strong>
          </NextAppointment>
          <Section>
            <Appointment>
              <div>
                <img src="https://avatars.githubusercontent.com/u/19843798?v=4" alt="Imagem da Carteira" />
                <strong>
                  <p>Gelzieny</p>
                </strong>
              </div>
            </Appointment>
            <Appointment>
              <div>
                <img src="https://github.com/github.png?size=50" alt="Imagem da Carteira" />
                <strong>
                  <p>Administrador</p>
                </strong>
              </div>
            </Appointment>
          </Section>
        </Calender>
      </Content>
    </Container>
  );
}

export default Dashboard;
