class HistoryStocks {

    async read(stockInput, firstDateInput, lastDateInput) {
        const url = `http://localhost:3030/stocks/${stockInput}/history?from=${firstDateInput}&to=${lastDateInput}`;
        const response = await fetch(url);
        return response;
    }
}

export default new HistoryStocks();
