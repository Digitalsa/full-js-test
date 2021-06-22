import { render } from '@testing-library/react';
import Compare from './index';

test('Botão -> Buscar', () => {
    const utils = render(<Compare />);
    const linkElement = utils.getByText(/BUSCAR/i);
    expect(linkElement).toBeInTheDocument();

})

test('Label -> Informe o nome da ação', () => {

    const utils = render(<Compare />);
    const linkElement = utils.getByText("Informe o nome da ação:");
    expect(linkElement).toBeInTheDocument();
})

test('Label -> Data da compra', () => {
    const utils = render(<Compare />);
    const linkElement = utils.getByText(/Data da compra:/i);
    expect(linkElement).toBeInTheDocument();
})

test('Label -> Nº de ações', () => {
    const utils = render(<Compare />);
    const linkElement = utils.getByText("Nº de ações:");
    expect(linkElement).toBeInTheDocument();
})