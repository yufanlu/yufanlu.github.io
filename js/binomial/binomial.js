/// <reference path="../../typings/index.d.ts">
var Parameter = (function () {
    function Parameter(period, an, bn) {
        if (period === void 0) { period = 0; }
        if (an === void 0) { an = 0.1; }
        if (bn === void 0) { bn = 0; }
        this.period = period;
        this.an = an;
        this.bn = bn;
    }
    return Parameter;
}());
var BinnomialTree = (function () {
    function BinnomialTree(select_selector, table_selector, tree_selector, width, height, padding) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.select = d3.select("#" + select_selector);
        this.table = d3.select("#" + table_selector);
        this.tree = d3.select("#" + tree_selector);
        this.column = ['period', 'an', 'bn'];
        this.chart_width = this.width - 2 * this.padding;
        this.chart_height = this.height - 2 * this.padding;
        this.parameters = [];
        this.period = Number(this.select.property("value"));
        this.buildTable();
        this.buildTree();
        this.select.on('change', function () {
            _this.period = Number(_this.select.property("value"));
            _this.update();
        });
    }
    BinnomialTree.prototype.buildTable = function () {
        for (var i = 0; i < this.period + 1; ++i) {
            this.parameters.push({ period: i, an: 0.1, bn: (i == 0) ? 0 : 0.01 });
        }
        // clean up first
        if (!this.table.select("table").empty()) {
            this.table.select("table").remove();
        }
        // build the table
        var table = this.table.append("table");
        var thead = table.append('thead').append('tr')
            .selectAll('th')
            .data(this.column).enter()
            .append('th')
            .text(function (title, i) { return title; });
        var tr = table.append('tbody').selectAll("tr")
            .data(this.parameters).enter()
            .append("tr")
            .selectAll("td")
            .data(function (row, i) { return [row.period, row.an, row.bn]; }).enter()
            .append("td")
            .text(function (v) { return v; })
            .style("text-align", "center");
    };
    BinnomialTree.prototype.update = function () {
        this.parameters = [];
        this.buildTable();
        this.buildTree();
    };
    BinnomialTree.prototype.buildTree = function () {
        if (!this.tree.select("svg").empty()) {
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
        var steps = 2 * this.period + 1;
    };
    return BinnomialTree;
}());
var tree = new BinnomialTree("period", "parameter", "btree", 600, 400, 15);
//# sourceMappingURL=binomial.js.map</reference>