import axios from 'axios';

const transcationApiUrl = "http://localhost:8080/api/transactions";

class TransactionService{

    getTransactions(){
        return axios.get(transcationApiUrl);  
    }

    saveTransaction(transaction){
        return axios.post(transcationApiUrl,transaction);
    }
}

export default new TransactionService();