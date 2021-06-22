import { render } from '@testing-library/react';
import Historystocks from './index';



test('Botão -> Buscar', () => {
    const utils = render(<Historystocks />);
    const linkElement = utils.getByText(/BUSCAR/i);
    expect(linkElement).toBeInTheDocument();

})

test('Label -> Informe o nome da ação', () => {

    const utils = render(<Historystocks />);
    const linkElement = utils.getByText("Informe o nome da ação:");
    expect(linkElement).toBeInTheDocument();
})

test('Calendario -> Data Inicial', () => {
    const utils = render(<Historystocks />);
    const linkElement = utils.getByText(/Data Inicial/i);
    expect(linkElement).toBeInTheDocument();
})

test('Calendario -> Data Final', () => {
    const utils = render(<Historystocks />);
    const linkElement = utils.getByText(/Data final/i);
    expect(linkElement).toBeInTheDocument();
})
