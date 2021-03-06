// import stimulus from './stimulus';
const helper = require('./helper');
const images = require('./images');

const PATH = "stimuli/";
const COLORS = ["BLUE", "GREEN", "RED", "YELLOW"];
const DIMENSIONS = ["LUM", "CHR", "HUE"];
const OPPOSITE_COLORS = { "BLUE": "YELLOW", "YELLOW": "BLUE", "GREEN": "RED", "RED": "GREEN" };
const DISTANCES = ["-2", "-1", "+1", "+2"];
const SET_SIZES = [12, 18, 27, 41];

const HEX_COLORS = {
    // BLUES
    "BLUE_LUM-2": "#005a95",
    "BLUE_LUM-1": "#006ca9",
    "BLUE_LUM": "#007ebc", // TARGET
    "BLUE_LUM+1": "#2391d1",
    "BLUE_LUM+2": "#43a4e6",

    "BLUE_CHR-2": "#6a7887e",
    "BLUE_CHR-1": "#4d7ba1",
    "BLUE_CHR": "#007ebc", // TARGET
    "BLUE_CHR+1": "#0081d9",
    "BLUE_CHR+2": "#0085f7",

    "BLUE_HUE-2": "#008897",
    "BLUE_HUE-1": "#0085ad",
    "BLUE_HUE": "#007ebc", // TARGET
    "BLUE_HUE+1": "#5575bc",
    "BLUE_HUE+2": "#816ab1",

    // GREENS
    "GREEN_LUM-2": "#006228",
    "GREEN_LUM-1": "#007438",
    "GREEN_LUM": "#20874a", // TARGET
    "GREEN_LUM+1": "#399b5c",
    "GREEN_LUM+2": "#4eaf6e",

    "GREEN_CHR-2": "#5e7e66",
    "GREEN_CHR-1": "#468358",
    "GREEN_CHR": "#20874a", // TARGET
    "GREEN_CHR+1": "#008d33",
    "GREEN_CHR+2": "#00920c",

    "GREEN_HUE-2": "#6b7e21",
    "GREEN_HUE-1": "#4d8433",
    "GREEN_HUE": "#20874a", // TARGET
    "GREEN_HUE+1": "#008a67",
    "GREEN_HUE+2": "#008b82",

    //REDS
    "RED_LUM-2": "#9e210f",
    "RED_LUM-1": "#b63821",
    "RED_LUM": "#cd4c32", // TARGET
    "RED_LUM+1": "#e45f43",
    "RED_LUM+2": "#fe7657",

    "RED_CHR-2": "#aa6453",
    "RED_CHR-1": "#bc5942",
    "RED_CHR": "#cd4c32", // TARGET
    "RED_CHR+1": "#dc391f",
    "RED_CHR+2": "#eb1607",

    "RED_HUE-2": "#d83862",
    "RED_HUE-1": "#d54049",
    "RED_HUE": "#cd4c32", // TARGET
    "RED_HUE+1": "#c05819",
    "RED_HUE+2": "#ae6500",

    //YELLOWS
    "YELLOW_LUM-2": "#b19e41",
    "YELLOW_LUM-1": "#c6b254",
    "YELLOW_LUM": "#dbc667", // TARGET
    "YELLOW_LUM+1": "#f1da7a",
    "YELLOW_LUM+2": "#fff08e",

    "YELLOW_CHR-2": "#d1c6a3",
    "YELLOW_CHR-1": "#d7c685",
    "YELLOW_CHR": "#dbc667", // TARGET
    "YELLOW_CHR+1": "#dec644",
    "YELLOW_CHR+2": "#dfc602",

    "YELLOW_HUE-2": "#ffaf7d",
    "YELLOW_HUE-1": "#f4bc6a",
    "YELLOW_HUE": "#dbc667", // TARGET
    "YELLOW_HUE+1": "#bfce6d",
    "YELLOW_HUE+2": "#9fd57d"
};

/* Returns array of all subconditions for a given color and dimension.
 * For example, get_subcondition_set("BLUE", "LUM") will subconditions for:
 * - opposite target of same dimension: YELLOW_LUM
 * - all possible targets from other dimensions: BLUE_LUM_-2, BLUE_LUM_-1 ... BLUE_HUE+1, BLUE_HUE+2
 * - all possible ratios for both populations: 1.12,1.14,1.2,1.5,2
 * That gives 13 possible subconditions. X 10 for each ratio with both colours as higher, gives 130. 
 * To take into account target present/not present, X 2 for boolean, gives 78.
 *  
 * @ param color            {string} "BLUE", "GREEN", "RED", "YELLOW"
 *
 * @ return                 {array}  array contain assoc array of subcondition constants
 */
function get_subcondition_set(color, population_size) {

    let subconditions = [];

    if (!COLORS.includes(color)) {
        throw Error(color + " is not supported.");
    }

    // Get target path
    let target_path = construct_path(color, "CHR", null); // Force CHR, all target hex same anyway
    let target_name = color;
    let target_hex = get_hex_code(color, "CHR");

    // Get opposite color w/ same dimension
    let opposite_path = get_opposite_target(color, "CHR"); // Force CHR, all target hex same anyway
    let opposite_name = OPPOSITE_COLORS[color];
    let opposite_hex_code = get_hex_code(color, "CHR", null);

    // Push for 1 population 16 repetitions of each set size
    if (population_size === 1) {
        for (let set_size of SET_SIZES) {
            let i = 0;
            while (i < 16) {
                subconditions = subconditions.concat(construct_subcondition(target_path, target_name, undefined, undefined, [set_size, 0], undefined, "1 Population", target_hex));
                i++;
            }
        }
    } else {
        // Push all other targets
        for (let set_size of SET_SIZES) {
            for (let distractor_size of SET_SIZES) {
                subconditions = subconditions.concat(construct_subcondition(target_path, target_name, opposite_path, opposite_name, [set_size, distractor_size], opposite_hex_code, opposite_name, target_hex));
            }
        }
        for (let set_size2 of SET_SIZES) {
            for (let dimension of DIMENSIONS) {
                for (let distance of DISTANCES) {
                    for (let set_size_distractor of SET_SIZES) {
                        let distractor_path = construct_path(color, dimension, distance);
                        let distractor_name = construct_name(color, dimension, distance);
                        let hex_code = get_hex_code(color, dimension, distance);
                        subconditions = subconditions.concat(construct_subcondition(target_path, target_name, distractor_path, distractor_name, [set_size2, set_size_distractor], hex_code, dimension + " " + distance, target_hex));
                    }
                }
            }
        }
    }
    return subconditions;
}

/* Constructs path of opposite color but same dimension.
 *  
 * @ param color            {string} "BLUE", "GREEN", "RED", "YELLOW"
 * @ param dimension        {string} "LUM", "CHR", "HUE"
 *
 * @ return                 {string}  path to opposite color of same dimension
 */
function get_opposite_target(color, dimension) {

    let opposite_color = OPPOSITE_COLORS[color];

    return construct_path(opposite_color, dimension, null);
}

/* Returns the hexadecimal code of a given color.
 *
 * @ param color            {string} "BLUE", "GREEN", "RED", "YELLOW"
 * @ param dimension        {string} "LUM", "CHR", "HUE"
 * @ param distance         {string} "-2", "-1", "+1", "+2"
 *
 * @ return                 {string} code of hex
 */
function get_hex_code(color, dimension, distance) {

    let hex_code = construct_name(color, dimension, distance);

    return HEX_COLORS[hex_code];
}

/* Constructs subcondition assoc array containing target path, distractor path,
 * population ratio and whether target is present/not present.
 *  
 * @ param target           {string} Path to target
 * @ param target_name      {string} Name of target color
 * @ param distractor       {string} Path to distractor
 * @ param distractor_name  {string} Name of distractor color
 * @ param sizes            {array}  Array of population sizes [target,distractor]
 * @ param hex_code         {string} Hex code of distractor color
 * @ param name             {string} Condition name
 *
 * @ return                 {array}  containing 2 assoc arrays, one for target present, one for target false
 */
function construct_subcondition(target, target_name, distractor, distractor_name, sizes, hex_code, name, target_hex) {

    return [
        {
            "condition_name": name,
            "target_path": target,
            "target_name": target_name,
            "target_hex": target_hex,
            "distractor_path": distractor,
            "distractor_name": distractor_name,
            "target_size": sizes[0],
            "distractor_size": sizes[1],
            "distractor_hex_code": hex_code
        }
    ];
}

/* Constructs path to the svg.
 *
 * @ param color            {string} "BLUE", "GREEN", "RED", "YELLOW"
 * @ param dimension        {string} "LUM", "CHR", "HUE"
 * @ param distance         {string} "-2", "-1", "+1", "+2"
 *
 * @ return                 {string}  path to the svg
 */
function construct_path(color, dimension, distance) {

    let path = color + "_" + dimension;

    if (distance) {
        return path + distance + ".svg";
    }

    return path + ".svg";
}

/* Constructs name of the color.
 *  
 * @ param color            {string} "BLUE", "GREEN", "RED", "YELLOW"
 * @ param dimension        {string} "LUM", "CHR", "HUE"
 * @ param distance         {string} "-2", "-1", "+1", "+2"
 *
 * @ return                 {string} Name of the color
 */
function construct_name(color, dimension, distance) {

    let name = color + "_" + dimension;

    if (distance) {
        return name + distance;
    }

    return name;
}

exports.numerosity = (color) => {
    const result = get_subcondition_set(color, 2)

    let subconditionsArray = [];
    const index = Math.floor(Math.random() *  result.length);
    subconditionsArray = result.sort(() => Math.random() - 0.5);
    const stiResult = helper.generate_stimulus(
        [images.images[subconditionsArray[index].distractor_path], images.images[subconditionsArray[index].target_path]],
        [subconditionsArray[index].distractor_size, subconditionsArray[index].target_size]
    )
    
    return stiResult;
}