class EarningsProjection {

    async read(stockInput, purchasedAmountInput, purchasedAtInput) {
        const url = `http://localhost:3030/stocks/${stockInput}/gains?purchasedAmount=${purchasedAmountInput}&purchasedAt=${purchasedAtInput}`;
        const response = await fetch(url);
        return response;
    }
}

export default new EarningsProjection();
