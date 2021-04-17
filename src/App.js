import React from "react";
import MyForm  from "./components/MyForm";
import Table from "./components/table";
import List from "./components/list";
import Calculate from "./components/calculate";
import TransactionService from "./services/transactionServices";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            date: null,
            product: null,
            amount: null,
            reward: null,
            rows : [],
            monthlyReward: [],
            months:[],
             
            };
    this.getAll3MonthsTransaction = this.getAll3MonthsTransaction.bind(this);
    this.getMonthlyReward = this.getMonthlyReward.bind(this);
            
  }

  componentDidMount(){
    //console.log("DidMount",TransactionService.getTransactions())
    TransactionService.getTransactions().then(res => this.setState({rows: res.data.reverse()}));
  }


onSubmit(pro, price){
 // console.log(pro, price);
 TransactionService.getTransactions().then(res => this.setState({
    product: pro,
    amount: price,
    rows: res.data.reverse()}, this.addTransaction));
}


calReward(price){
  if (price >=50 && price < 100) {
    return price-50;
  } else if (price >100){
    return (2*(price-100) + 50);
  }
  return 0;
}


addTransaction(){

  //const mydate = new Date().toISOString().split('T')[0];
  const mydate = new Date().toLocaleDateString()

  let transaction = {
    id:0,
    product:this.state.product,
    amount: this.state.amount,
    date: mydate,
    reward : this.calReward(this.state.amount),
  }

  TransactionService.saveTransaction(transaction);
  
}


calTotalReward(){
  let total=0;
  this.state.rows.forEach(row=>total+=row.reward);
  return total;
}


getAll3MonthsTransaction(){
  //console.log("clicked");
  let today = new Date();
  const threeOldDate = today.setMonth(today.getMonth() - 3);
  let filteredList = this.state.rows.filter(trans => new Date(trans.date) > threeOldDate);
  
  this.setState({
    rows : filteredList,
  })

}

getMonthlyReward(){


  let last12MonthRewardsInDesc = [];
  let months =[];
 
  for(let i=0; i<12; i++) {
      let monthsIndex = (new Date).getMonth() - i; 
      let filteredList = this.state.rows.filter(trans => (new Date(trans.date)).getMonth() == monthsIndex );
      last12MonthRewardsInDesc[i] = filteredList.reduce((acc,key)=>key.reward+acc,0);
      if(monthsIndex >= 0){
        months[i] = monthsIndex;
      };

      if(monthsIndex < 0){
        months[i] = monthsIndex + 12;
      }
     
     
      

  }
 
 this.setState({
   monthlyReward: last12MonthRewardsInDesc,
   months: months,
  
 });

}



render(){
  const style ={
    padding: "0 10vw 20vw",
  }
 
  return (
    <div style = {style}>
        <h1>Rewards Summary</h1>
        <List  onClick = {this.getAll3MonthsTransaction}/>
        <Table rows={this.state.rows} />
        <h3>Total Rewards: {this.calTotalReward()} pts</h3>
        <Calculate onClick = {this.getMonthlyReward} reward = {this.state.monthlyReward} months = {this.state.months} />
        <MyForm onSubmit = {this.onSubmit.bind(this)} />  
      </div>

    
  );

}
 
};

export default App;
