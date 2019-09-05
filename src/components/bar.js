import React, {Component} from "react"
import * as d3 from "d3"
import './Bar.css'

class Bar extends Component{
    constructor(props){
        super();
        this.state = {
            width : 0, 
            height : 0
        }
    }

    width = 0;
    height = 0;
    margin = { y : 50, x : 50 };
    xScale = d3.scaleBand().padding(0.2);
    yScale = d3.scaleLinear().domain([0,100]);

    

    drawChart(){
        const old = document.querySelector("#svg-bar")
        if(old != null){
            old.remove()
        }
        const area = document.querySelector("#bar");
        this.width = area.offsetWidth - (3 * this.margin.x);
        this.height = area.offsetHeight  - (3 * this.margin.y);
        this.yScale.range([this.height,0]);
        this.xScale.range([0,this.width]).domain(this.props.datas.map((d) => d.item));
        const svg = d3.select(area).append("svg");
        svg
        .attr("width",this.width + (2 * this.margin.x))
        .attr("height",this.height + (2 * this.margin.y))
        .attr("id","svg-bar");
        
        svg.append('text')
        .attr('x',(this.width / 2) + this.margin.x)
        .attr('y',this.margin.y / 2)
        .attr('class','title')
        .attr('text-anchor','middle')
        .attr(this.props.title);

        svg.append('text')
        .attr('x',(this.width / 2) + this.margin.x)
        .attr('y',(this.margin.y * 2))
        .attr('transform',`translate(0,${this.height - (this.margin.y / 4)})`)
        .attr('class','title')
        .text('x axis title');

        svg.append('text')
        .attr('x',-(this.height/2) - this.margin.y)
        .attr('y',(this.margin.x / 2.4))
        .attr('transform','rotate(-90)')
        .attr('class','title')
        .text('y axis title');



        const chart = svg.append("g")
        .attr("transform",`translate(${this.margin.x},${this.margin.y})`);
        
        chart.append('g').attr('class','axis').call(d3.axisLeft(this.yScale));
        chart.append('g').attr('class','axis').attr('transform',`translate(0,${this.height})`).call(d3.axisBottom(this.xScale));

        chart.append('g').attr('class','grid-hline')
        .call(d3.axisLeft().scale(this.yScale).tickSize(-this.width,0,0).tickFormat(''));

        chart.selectAll()
        .data(this.props.datas)
        .enter()
            .append('rect')
            .attr('class','bar')
            .attr('x',(d) => this.xScale(d.item))
            .attr('y',(d) => this.yScale(d.value))
            .attr('height',(d) => this.height - this.yScale(d.value))
            .attr('width', this.xScale.bandwidth());
    }

    componentWillReceiveProps(nextProps){
        this.drawChart();
    }

    handleResize = e => {
        this.drawChart();
    };
    
    componentDidMount() {
        this.drawChart();
        window.addEventListener("resize", this.handleResize);
        
    }

    render(){
        return(
            <div id="bar" className="h100">                
            </div>            
        );
    }
}

export default Bar;