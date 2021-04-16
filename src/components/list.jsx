import React from "react";

export default class List extends React.Component {
    render(){
       
        return(
            <div style = {{ margin: "3vw 0"}}>
                <label for="lists">Show the past 3 months transactions</label>
                <button style = {{ margin: "0 1vw"}} onClick = {this.props.onClick} >Get Transaction</button>
            </div>
            
        )
    }

}
