import HistoryStocks_Model from "../model/History-stocks_Model";

class HistoryStocks {

    async read(stockInput, firstDateInput, lastDateInput) {
        return await HistoryStocks_Model.read(stockInput, firstDateInput, lastDateInput)
    }
}

export default new HistoryStocks();
