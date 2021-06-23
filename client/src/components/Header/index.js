import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{ backgroundColor: '#0d6efd' }} color="faded" dark expand="md">
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/cotacao_recente"><b>Cotação Atual</b></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/historico_preco"><b>Historico de preços</b></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/comparar_preco"><b>Comparar preços</b></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/projecao_ganhos"><b>Projeção de ganhos</b></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;