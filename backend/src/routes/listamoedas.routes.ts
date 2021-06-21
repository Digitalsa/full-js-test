import { Router } from 'express';
import { api } from '../config/api';

export const listaMoedasRoutes = Router();


listaMoedasRoutes.get(
  useEffect(() => {
    fetch('https://api.novadax.com/v1/market/tickers')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
)
