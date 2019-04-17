var d3 = require("d3");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const diamondShape = (dimenstion) => {
    return "M " + dimenstion / 2 + " 0 L " + dimenstion + " " + dimenstion / 2 + " L " + dimenstion / 2 + " " + dimenstion + " L 0 " + dimenstion / 2 + " L " + dimenstion / 2 + " 0";
}

const createSvg = (shape, data) => {
    switch (shape) {
        case 'circle':
            let circleDom = new JSDOM(`<!DOCTYPE html><body></body></html>`);
            var bodySelection = d3.select(circleDom.window.document.body);
            var svgSelection = bodySelection.append("svg")
                .attr("width", data.size * 2)
                .attr("height", data.size * 2);
            var circleSelection = svgSelection.append("circle")
                .attr("cx", data.size)
                .attr("cy", data.size)
                .attr("r", data.size)
                .style("fill", data.color);
            return circleDom.window.document.body.innerHTML;
        case 'square':
            let squareDom = new JSDOM(`<!DOCTYPE html><body></body></html>`);
            var bodySelection = d3.select(squareDom.window.document.body);
            var svgSelection = bodySelection.append("svg")
                .attr("width", data.size * 2)
                .attr("height", data.size * 2);
            var squareSelection = svgSelection.append("rect")
                .attr("x", data.size)
                .attr("y", data.size)
                .attr("width", data.size)
                .attr("height", data.size)
                .style("fill", data.color);
            return squareDom.window.document.body.innerHTML;
        case 'diamond':
            let diamondDom = new JSDOM(`<!DOCTYPE html><body></body></html>`);
            var bodySelection = d3.select(diamondDom.window.document.body);
            var svgSelection = bodySelection.append("svg")
                .attr("width", data.size * 2)
                .attr("height", data.size * 2);
            svgSelection
                .append("path")
                // trying to draw a diamond here 
                .attr("d", diamondShape(data.size))
                .style("stroke-width", 1)
                .style("stroke-dasharray", "1,0")
                .style("fill", data.color)
            return diamondDom.window.document.body.innerHTML;


    }
}

exports.generate_stimulus = (stimuli, distribution_size) => {

    let rows = 24;
    let columns = 24;

    let target = stimuli[0];
    let distractor = stimuli[1];

    let target_number = distribution_size[0];
    let distractor_number = distribution_size[1];

    // Extract img dimensions so can force empty boxes to be of same height/width
    let img = new Image();
    img.src = distractor;
    let item_width = 11;
    let item_height = 11;

    const distractorSvg = createSvg(distractor.shape, distractor)

    const targetSvg = createSvg(target.shape, target);


    let distractor_html = `<div class="grid-item">${distractorSvg}</div>`;
    let target_html = `<div class="grid-item"">${targetSvg}</div>`;
    let empty_item_html = `<div class="grid-item" style="height: ${item_height}px; width: ${item_width}px""></div>`;

    let html =
        `<div class='grid-container' style = 'grid-template-columns: repeat(${columns}, minMax(10px, 1fr));` +
        ` grid-template-rows: repeat("${rows}"}, minMax(10px, 1fr));'>`;

    let distractor_coordinates = [];

    let target_coordinates = generate_coordinates(rows, columns, target_number, null);
    if (distractor_number != 0) {
        distractor_coordinates = generate_coordinates(rows, columns, distractor_number, target_coordinates);
    }

    console.log({ distractor_coordinates });

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let curr_coord = JSON.stringify([r, c]);

            // console.log({ curr_coord });
            if (distractor_coordinates.includes(curr_coord)) {
                html += distractor_html;
            } else if (target_coordinates.includes(curr_coord)) {
                html += target_html;
            } else {
                html += empty_item_html;
            }

        }
    }

    return html;

};

/**
* Generates random coordinate given row and column values.
*
* @param  row                  {int}
*         col                  {int}
*
* @return [row, col] (JSON stringified so can do object comparisons)
*/
function generate_random_coordinate(row, col) {

    let x = get_random_int(row);
    let y = get_random_int(col);

    return JSON.stringify([x, y]);
}

/**
* Generates a random population, that can exclude a coordinate set if desired.
*
* @param  row                   {int}
*         col                   {int}
*         size                  {int}
*         excluding_coordinates {array of coordinates to exclude}
*                               Set this to null if do not want to exclude anything
*
* @return coordinates          [ [x1, y1], [x2, y2] ... ]
*/
function generate_coordinates(row, col, size, excluding_coordinates) {

    let coordinates = [];

    while (coordinates.length < size) {
        let coord = generate_random_coordinate(row, col);

        if (!coordinates.includes(coord)) {
            if (excluding_coordinates === null) {
                coordinates.push(coord);
            } else if (!excluding_coordinates.includes(coord)) {
                coordinates.push(coord);
            }
        }
    }

    return coordinates;
}

/**
* Generates random integer given max value.
*
* @param  max                   {int}
* @return integer
*/
function get_random_int(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

