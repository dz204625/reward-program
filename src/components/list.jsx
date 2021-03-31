import React from "react";

export default class List extends React.Component {
    render(){
        return(
            <div>
                <label for="lists">Show the past 3 months transactions</label>
                <button onClick = {this.props.onClick} >Get Transaction</button>
            </div>
            
        )
    }

}
