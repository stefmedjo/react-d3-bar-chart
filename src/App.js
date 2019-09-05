import React,{Component} from 'react';
import Bar from "./components/bar"

class App extends Component {

  constructor(){
    super();
    this.state = {
      sales : {
        title : "Sales",
        datas : [
          { item : "orange", value : 54 },
          { item : "mango", value : 21 },
          { item : "apple", value : 13 },
          { item : "pineapple", value : 75 },
          { item : "banana", value : 46 },
          { item : "coconut", value : 37 },
        ]
      }      
    }
  }

  render(){
    return (
      <div className="h100">
        <Bar datas={ this.state.sales.datas } title={this.state.sales.title}/>
      </div>
    );
  }
}

export default App;
