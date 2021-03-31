import React from "react";
import MyForm  from "./components/MyForm";
import Table from "./components/table";
import List from "./components/list";
import Calculate from "./components/calculate";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            date: null,
            product: null,
            amount: null,
            reward: null,
            rows : [
              {date: "3/28/2021" , product: "p1", amount: 120, reward: 90},
              {date: "3/27/2021" , product: "p1", amount: 120, reward: 90},
              {date: "2/28/2021" , product: "p2", amount: 50, reward: 0 },
              {date: "2/27/2021" , product: "p2", amount: 50, reward: 0 },
              {date: "2/26/2021" , product: "p2", amount: 50, reward: 0 },
              {date: "2/25/2021" , product: "p2", amount: 50, reward: 0 },
              {date: "1/20/2021" , product: "p3", amount: 100, reward: 50},
              {date: "1/19/2021" , product: "p3", amount: 100, reward: 50},
              {date: "1/17/2021" , product: "p3", amount: 100, reward: 50},
              {date: "1/15/2021" , product: "p3", amount: 100, reward: 50},
              {date: "12/19/2020" , product: "p3", amount: 100, reward: 50},
              
              
              ],
              monthlyReward: [],
            };
    this.getAll3MonthsTransaction = this.getAll3MonthsTransaction.bind(this);
    this.getMonthlyReward = this.getMonthlyReward.bind(this);
            
  }


onSubmit(pro, price){
  console.log(pro, price);
  this.setState(
     {
      product: pro,
      amount: price,
    }
  , this.addTransaction)
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

  this.state.rows.unshift(transaction); 
  
}


calTotalReward(){
  let total=0;
  this.state.rows.forEach(row=>total+=row.reward);
  return total;
}


getAll3MonthsTransaction(){
  console.log("clicked");
  let today = new Date();
  const threeOldDate = today.setMonth(today.getMonth() - 3);
  let filteredList = this.state.rows.filter(trans => new Date(trans.date) > threeOldDate);
  
  this.setState({
    rows : filteredList,
  })

}

getMonthlyReward(){
 /*console.log(this.state.rows);
 let years = [];
 this.state.rows.forEach(row=>years.push((new Date(row.date)).getFullYear()));
 let yearSet = new Set(years);
 console.log(yearSet.entries);*/
 let last12MonthRewardsInDesc = [];
 for(let i=0; i<12; i++) {
     let filteredList = this.state.rows.filter(trans => (new Date(trans.date)).getMonth() == (new Date).getMonth() - i );
     last12MonthRewardsInDesc[i] = filteredList.reduce((acc,key)=>key.reward+acc,0);
 }
 console.log(last12MonthRewardsInDesc);

 this.setState({
   monthlyReward: last12MonthRewardsInDesc,
 })


}


render(){
 
  return (
    <div>
        <h1>Rewards Summary</h1>
        <List  onClick = {this.getAll3MonthsTransaction}/>
        <Table rows={this.state.rows} />
        <h3>Total Rewards: {this.calTotalReward()} pts</h3>
        <Calculate onClick = {this.getMonthlyReward} reward = {this.state.monthlyReward} />
        <MyForm onSubmit = {this.onSubmit.bind(this)} />  
      </div>

    
  );

}
 
};

export default App;
