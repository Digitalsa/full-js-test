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
      <Navbar color="light" light expand="md">
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/cotacao_recente">Cotação Atual</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/historico_preco">Historico de preços</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/comparar_preco">Comparar preços</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/projecao_ganhos">Projeção de ganhos</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;