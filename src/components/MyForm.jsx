import * as React from "react";

export default class MyForm extends React.Component{

  onClick(event) {
   
    event.preventDefault();
    const pro = this.inputProduct.value;
    const price = this.inputPrice.value;
   
    this.props.onSubmit(pro, price);
  
  }




  render(){

    return(
      <form  ref={form => this.form = form} onSubmit={this.onClick.bind(this)}>
        <label for="product"><b>Product:</b></label>
        <input  ref = {input => this.inputProduct = input} type="text" id="product" name="product" ></input>
        <label for="price"><b>Price:</b></label>
        <input ref = {input => this.inputPrice = input} type="text" id="price" name="price"  ></input>
        <input style = {{ margin: "0 1vw"}} type="submit" value="Add Transction"></input>
      </form> 
    )

  }
}
