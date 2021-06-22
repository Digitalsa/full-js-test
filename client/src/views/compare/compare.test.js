import { render } from '@testing-library/react';
import Compare from './index';

test('Botão -> Buscar', () => {
    const utils = render(<Compare />);
    const linkElement = utils.getByText(/BUSCAR/i);
    expect(linkElement).toBeInTheDocument();

})

test('Label -> Informe o nome da ação a ser comparada', () => {

    const utils = render(<Compare />);
    const linkElement = utils.getByText("Informe o nome da ação:");
    expect(linkElement).toBeInTheDocument();
})

test('Label -> Informe o nome da ação a ser comparada', () => {
    const utils = render(<Compare />);
    const linkElement = utils.getByText(/Informe o nome da ação a ser comparada/i);
    expect(linkElement).toBeInTheDocument();
})