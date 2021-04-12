import React from "react";

export default class Calculate extends React.Component {
 
    render(){ 
        console.log(this.props)
        this.displayMonthlyReward();
     
      
        
        return(

    
            <div>
                <label for="months">Monthly Rewards:</label>
                <input onClick = {this.props.onClick} type="button" value="Submit"></input>
                <ul>
                    
                    {this.props.reward.map((rew, index) => {
                    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    let rewardMonthIndex = this.props.months[index];
                    console.log( month[rewardMonthIndex]);
                    return <li>{month[rewardMonthIndex]} : {rew} pts</li>
                    
                })}
                  
                </ul>
               
                
    
                
            </div>
        )
    
        }
    
    
}