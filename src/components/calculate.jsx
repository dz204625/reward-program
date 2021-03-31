import React from "react";

export default class Calculate extends React.Component {
    

  

    render(){ 
        return(
    
            <div>
                <label for="months">Monthly Rewards:</label>
                <input onClick = {this.props.onClick} type="button" value="Submit"></input>
                <p>{this.props.reward} </p>
            </div>
        )
    }
       
    
    
}