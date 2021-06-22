import EarningsProjection_Model from "../model/Earnings-projection_Model";

class EarningsProjection {

    async read(stockInput, purchasedAmountInput, purchasedAtInput) {
        return await EarningsProjection_Model.read(stockInput, purchasedAmountInput, purchasedAtInput)
    }
}

export default new EarningsProjection();
