
/* Appropriateness ratings (row: situations; columns: behavior) */
var data = [
    [2.52, 6.21, 2.10, 8.17, 4.23, 3.60, 3.62, 7.27, 1.21, 1.77, 5.33, 1.79, 2.21, 6.23, 1.94],
    [5.00, 8.56, 8.73, 3.62, 7.79, 3.77, 3.12, 2.88, 3.58, 2.23, 4.50, 4.42, 3.04, 8.00, 3.79],
    [1.44, 8.08, 4.27, 4.87, 5.48, 7.04, 5.17, 7.17, 1.52, 2.15, 4.17, 3.12, 3.08, 7.10, 3.00],
    [2.56, 8.52, 4.92, 2.58, 8.44, 2.29, 2.54, 3.96, 1.67, 2.50, 3.25, 2.29, 3.21, 7.13, 1.96],
    [7.94, 8.42, 7.71, 7.00, 8.13, 5.63, 5.40, 7.77, 3.06, 5.00, 5.06, 7.42, 5.21, 8.10, 6.92],
    [1.38, 3.29, 2.38, 2.85, 1.38, 1.77, 3.52, 3.58, 0.62, 1.42, 1.92, 1.71, 3.13, 2.60, 1.33],
    [1.94, 8.46, 1.08, 4.85, 1.73, 0.75, 1.31, 2.48, 1.04, 1.21, 1.83, 1.48, 1.37, 5.88, 1.65],
    [5.58, 8.19, 4.75, 3.38, 4.83, 1.46, 4.96, 4.81, 1.46, 2.81, 4.08, 3.54, 3.71, 7.40, 4.88],
    [2.46, 4.98, 6.21, 2.73, 7.48, 4.08, 4.13, 1.73, 1.37, 2.58, 1.71, 2.31, 7.15, 7.94, 2.42],
    [1.96, 8.25, 5.17, 5.38, 7.67, 2.90, 6.21, 4.71, 1.90, 5.04, 4.31, 3.75, 3.44, 8.23, 4.13],
    [1.63, 7.40, 4.79, 3.04, 5.10, 1.31, 5.12, 4.48, 1.58, 2.54, 2.58, 2.12, 3.48, 6.77, 1.73],
    [2.83, 7.25, 2.81, 3.46, 2.35, 2.83, 5.04, 4.75, 1.77, 5.12, 3.48, 3.65, 4.79, 5.90, 3.52],
    [6.15, 8.58, 8.52, 8.29, 7.94, 8.85, 7.67, 8.58, 4.25, 6.81, 7.52, 6.73, 8.00, 8.17, 6.44],
    [4.40, 7.88, 6.54, 7.73, 7.19, 6.08, 5.50, 8.56, 2.40, 4.00, 4.88, 4.58, 3.88, 7.75, 3.60],
    [4.12, 8.08, 5.08, 4.56, 8.04, 2.98, 5.23, 3.69, 2.04, 3.85, 4.98, 7.12, 4.31, 7.90, 7.94]
];
var rowLabels = ["Class", "Date", "Bus", "Family dinner", "Park", "Church", "Job interview", "Sidewalk", "Movies", "Bar", "Elevator", "Restroom", "Own room", "Dorm lounge", "Football game"];
var columnLabels = ["Run", "Talk", "Kiss", "Write", "Eat", "Sleep", "Mumble", "Read", "Fight", "Belch", "Argue", "Jump", "Cry", "Laugh", "Shout"];

/* Layout constants */
var width = 960,
    height = 600;

/* Initialization of SVG graphics */
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);



var cellWidth = 45;
var cellHeight = 32.5;
var cell_distance = 1;
var x_space = 80;
var y_space = 40;
var left_x = 200;
max_data = 10;
min_data = 0;

var colorScale = function(data_value){
	if (data_value <= 2) {
		return '#c7e9b4'
	}
	if(data_value <= 4){
		return '#a1dab4'
	}

	if(data_value <= 6){
		return '#41b6c4'
	}
	if(data_value <= 8){
		return '#2c7fb8'
	}
	if(data_value <=10){
		return '#253494'
	}
}

function SelectionContainer() {

    this.firstSelection = [];
    this.secondSelection = [];

    this.selectionType = 'none';

    SelectionContainer.prototype.selectNext(dom) = function(dom) {
        console.log(dom);
    }
}

const selectionContainer = {
    firstSelection: null,
    secondSelection: null,
    lastIndexPushedTo: -1,
    selectionMode: 'row',
    selectNext: function(dom) {
        console.log(dom);
        if (dom.classList.contains(this.selectionMode)) {
            this.lastIndexPushedTo = (this.lastIndexPushedTo + 1) % 2;
            console.log(this.lastIndexPushedTo);
            if (this.lastIndexPushedTo < 1) {
                this.unselect(this.firstSelection);
                this.firstSelection = dom;
            } else {
                this.unselect(this.secondSelection);
                this.secondSelection = dom;
            }
            console.log(this.firstSelection);
        }
    },
    unselect: function(dom) {
        if (dom) dom.classList.remove('selected');
    },
    changeSelectionModeTo: function(mode) {
        unselect(this.firstSelection);
        unselect(this.secondSelection);
        this.firstSelection = null;
        this.secondSelection = null;
        this.selectionMode = mode;
    }
}

var xScale = d3.scaleBand()
        .domain(columnLabels)
        .rangeRound([x_space, width - left_x])
        .paddingInner(0.5);


var yScale = d3.scaleBand()
        .domain(rowLabels)
        .rangeRound([y_space, height -40])
        .paddingInner(0.05);


var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickValues(columnLabels);

var yAxis = d3.axisRight()
        .scale(yScale)
        .tickValues(rowLabels);

var groups = svg
    .selectAll('g.rows')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'rows');

var node_matrix = [];


for (i = 0; i < d3.selectAll('.rows').size(); i++) {

   var row_rects = d3.selectAll('.rows')
                .on('click', function() {
                d3.select(this).attr('class', 'row selected');
                selectionContainer.selectNext(this);
                });

      var rectGroup = d3.select(row_rects.nodes()[i]).selectAll('rect')
				.data(data[i])
		      	.enter()
		      	.append('g')
		      	.attr('class', "singleRect")
                .call(function(row){ node_matrix.push(row); });
		      rectGroup
	      		.append('rect')
	      		.on("mouseover", handleMouseOver)
	      		.on("mouseout", handleMouseOut)
	      		.attr('rx', '3')
	      		.attr('ry', '3')
	      		.style('border-radius', '2px')
				.attr('x', function(d, i) {
           return x_space + i * (cellWidth + cell_distance)
        })

        		.attr('y', (y_space + i * (cellHeight + cell_distance + 1.5)))
       			.attr('width', cellWidth)
				.attr('height', cellHeight)
				.attr('fill', function(d) { return colorScale(d); });

				rectGroup
					.append('text')
					.attr('x', function(d, i){ return x_space + i * (cellWidth + cell_distance) + cellWidth/2 })
					.attr('y', (y_space + (i * (35 /* improve readability */)) + cellHeight/1.55))
					.on("mouseover", handleMouseOver)
					.on("mouseout", handleMouseOut)
					.attr('text-anchor', 'middle')
					.html(function(d){ return d })
					.style('display', 'none');


}

console.log(node_matrix);


function handleMouseOver(d, i) {  // Add interactivity
			var parent = d3.select(this.parentNode)
			parent.select(':nth-child(2)')
				 .attr('fill', 'black')
				 .attr('font-weight', 'bold')
				.style('display', 'block');

            }

function handleMouseOut(d, i) {  // Add interactivity
		var parent = d3.select(this.parentNode)
			parent.select(':nth-child(2)')
				.style('display', 'none');
            }

var differnence = function(vec1, vec2){

}

  svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .attr('class', 'x-axis');

svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .attr('class', 'y-axis');

var legend = svg.append("rect")
		.attr("x", 87)
		.attr("y", 570)
		.attr("height", 20)
		.attr("width", 80)
		.attr("fill", "#c7e9b4")
var legendsek = svg.append("text")
		.attr("x", 115)
		.attr("y", 585)
		.attr("fill", "white")
		.html("0-2");
var legend2 = svg.append("rect")
		.attr("x", 167)
		.attr("y", 570)
		.attr("height", 20)
		.attr("width", 80)
		.attr("fill", "#a1dab4");
var legend2sek = svg.append("text")
		.attr("x", 200)
		.attr("y", 585)
		.attr("fill", "white")
		.html("2-4");
var legend3 = svg.append("rect")
		.attr("x", 247)
		.attr("y", 570)
		.attr("height", 20)
		.attr("width", 80)
		.attr("fill", "#41b6c4");
var legendsek3 = svg.append("text")
		.attr("x", 270)
		.attr("y", 585)
		.attr("fill", "white")
		.html("4-6");
var legend4 = svg.append("rect")
		.attr("x", 327)
		.attr("y", 570)
		.attr("height", 20)
		.attr("width", 80)
		.attr("fill", "#2c7fb8");
var legendsek4 = svg.append("text")
		.attr("x", 350)
		.attr("y", 585)
		.attr("fill", "white")
		.html("6-8");
var legend5 = svg.append("rect")
		.attr("x", 407)
		.attr("y", 570)
		.attr("height", 20)
		.attr("width", 80)
		.attr("fill", "#253494");
var legendsek5 = svg.append("text")
		.attr("x", 430)
		.attr("y", 585)
		.attr("fill", "white")
		.html("8-10");
