class Compare {

    async read(stockInput, stocksList) {
        const url = `http://localhost:3030/stocks/${stockInput}/compare`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "stocks": stocksList })
        });
        return response;
    }
}

export default new Compare();
