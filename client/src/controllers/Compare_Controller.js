import CompareModel from '../model/Compare_Model'

class Compare {

    async read(stockInput, stocksList) {
        return await CompareModel.read(stockInput, stocksList)
    }
}

export default new Compare();
