import { render } from '@testing-library/react';
import CurrentSituation from './index';

test('Botão -> Buscar', () => {
    const utils = render(<CurrentSituation />);
    const linkElement = utils.getByText(/BUSCAR/i);
    expect(linkElement).toBeInTheDocument();

})

test('Label -> Informe o nome da ação', () => {
    const utils = render(<CurrentSituation />);
    const linkElement = utils.getByText(/Informe o nome da ação/i);
    expect(linkElement).toBeInTheDocument();
})