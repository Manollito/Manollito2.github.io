const data = {
    "name": "Root",
    "info": "This is the root node",
    "children": [
        { "name": "Child 1", "info": "This is child 1" },
        { "name": "Child 2", "info": "This is child 2" },
        { "name": "Child 3", "info": "This is child 3" },
        { "name": "Child 4", "info": "This is child 4" },
        { "name": "Child 5", "info": "This is child 5" },
        { "name": "Child 6", "info": "This is child 6" },
        { "name": "Child 7", "info": "This is child 7" }
    ]
};

const width = 960;
const height = 600;
const radius = 100;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "#f9f9f9")
    .style("border", "1px solid #d3d3d3")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.1)")
    .style("font-size", "12px")
    .style("color", "#333");

const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

const root = d3.hierarchy(data);

const nodes = root.descendants();
const links = root.links();

const angle = 2 * Math.PI / (nodes.length - 1);

nodes.forEach((node, i) => {
    if (i === 0) {
        node.x = 0;
        node.y = 0;
    } else {
        node.x = radius * Math.cos((i - 1) * angle);
        node.y = radius * Math.sin((i - 1) * angle);
    }
});

const link = g.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y)
    .attr("stroke", "#87CEEB")
    .attr("stroke-width", 1.5);

const node = g.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`)
    .on("mouseover", function(event, d) {
        tooltip.style("visibility", "visible")
            .text(d.data.name + ": " + d.data.info);
    })
    .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
        tooltip.style("visibility", "hidden");
    });

node.append("circle")
    .attr("r", d => d.children ? 5 : 10)
    .attr("fill", "#0000FF") // Color azul para los círculos
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5);

node.append("text")
    .attr("dy", 3)
    .attr("x", d => d.children ? -8 : 10)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
