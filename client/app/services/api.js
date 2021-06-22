import axios from "axios";

// por enquanto é um servidor local, depois da pra mudar pra outro ou coisa assim:
//

const api = axios.create({
  baseURL: "",
});

export default api;
