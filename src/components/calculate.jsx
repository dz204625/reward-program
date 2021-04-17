import React from "react";

export default class Calculate extends React.Component {
 
    render(){ 
       // console.log(this.props)   
        return(

    
            <div style = {{marginTop: "1vw"}}>
                <label for="months"><b>Monthly Rewards:</b></label>
                <input style = {{ margin: "0 1vw"}} onClick = {this.props.onClick} type="button" value="Get Monthly Reward"></input>
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