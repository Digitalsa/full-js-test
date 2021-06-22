class CurrentSituation {

    async read(stockInput) {
        const url = `http://localhost:3030/stocks/${stockInput}/quote`;
        const response = await fetch(url);
        return response;
    }
}

export default new CurrentSituation();
