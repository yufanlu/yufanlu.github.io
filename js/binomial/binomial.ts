/// <reference path="../../typings/index.d.ts" />


class Parameter{
    constructor(public period: number = 0, public an:number = 0.1, public bn:number = 0){}
}

class BinnomialTree{
    parameters: Parameter[]; column: string[];
    chart_width: number; chart_height: number; period: number;
    block_width: number; block_height: number;
    select: d3.Selection<any>; table: d3.Selection<any>; tree: d3.Selection<any>;
    constructor(select_selector: string, table_selector: string, tree_selector:string,
                public width:number, public height: number, public padding: number){
        this.select = d3.select("#" + select_selector);
        this.table = d3.select("#" + table_selector);
        this.tree = d3.select("#" + tree_selector);
        this.column = ['period', 'an', 'bn'];

        this.chart_width  = this.width  - 2 * this.padding;
        this.chart_height = this.height - 2 * this.padding;

        this.parameters = [];
        this.period = Number(this.select.property("value"));

        this.buildTable();
        this.buildTree();

        this.select.on('change', () => {
            this.period = Number(this.select.property("value"));
            this.update();
        });
    }

    buildTable(){
        for(var i :number = 0; i < this.period + 1; ++i){
            this.parameters.push({ period: i, an: 0.1, bn: (i == 0) ? 0 : 0.01});
        }

        // clean up first
        if(!this.table.select("table").empty()){
            this.table.select("table").remove();
        }

        // build the table
        var table = this.table.append("table");
        var thead = table.append('thead').append('tr')
                         .selectAll('th')
                         .data(this.column).enter()
                         .append('th')
                         .text((title:string,i) => { return title; })

        var tr = table.append('tbody').selectAll("tr")
                      .data(this.parameters).enter()
                      .append("tr")
                      .selectAll("td")
                      .data((row:Parameter,i) => { return [row.period, row.an, row.bn]; }).enter()
                      .append("td")
                      .text((v) => { return v; })
                      .style("text-align", "center");
    }
    update(){
        this.parameters = [];
        this.buildTable();
        this.buildTree();
    }
    buildTree(){
        if(!this.tree.select("svg").empty()){
            this.tree.select("svg").remove();
        }

        // build the table
        var svg = this.tree
                      .append("svg")
                      .attr("width", this.width)
                      .attr("height", this.height)
                      .style("diplay", "block")
                      .style("margin", "0 auto");

        // calculate steps, setup drawing
        var horizontal_steps :number = 2 * this.period + 1;
        var vertical_setps :number = Math.pow(2, this.period);

        this.block_width = Math.floor(this.chart_width / horizontal_steps);
        this.block_height = Math.floor(this.chart_width / vertical_setps);
    }
}

var tree = new BinnomialTree("period", "parameter", "btree", 600, 400, 15);
