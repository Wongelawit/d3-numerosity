
## Installing

If you use NPM, `npm install d3-numerosity`. Otherwise, download the [latest release](https://github.com/d3/d3-numerosity/releases/latest).

## Generate Stimulus
## d3-numerosity generate_stimulus supports 4 images by default
1. Red
2. Blue
3. Green
4. Yellow

## Example

`import d3 from 'd3-numerosity';`

```javascript
    componentDidMount() {

      var result = d3.stimulus.generate_stimulus([d3.images.red, d3.images.green], [75, 75]);
      
      var div = document.getElementById("root");
      div.innerHTML += result;
  }

  render() {
    return <div className="App" />;
  }
```


## Pass custom image

You can pass image url into generate_stimulus function or you can import image from you project and pass it into function.

1. Pass Image URL
```javascript
  d3.stimulus.generate_stimulus(['http://imageone.jpg', 'http://imagetwo.jpg'], [75, 75]);
```

2. Pass Custom Image

```javascript
  import imageOne from '/path/to/your/imageone'
  import imageTwo from '/path/to/your/imageTwo'

  d3.stimulus.generate_stimulus([imageOne, imageTwo], [75, 75]);

```


## Subcondition Generator
## d3-numerosity subconditions only supports 4 colors
1. RED
2. BLUE
3. GREEN
4. YELLOW

## Example

`import d3 from 'd3-numerosity';`

```javascript
    componentDidMount() {

      var result = d3.subcondition.numerosity('YELLOW');
      
      var div = document.getElementById("root");
      div.innerHTML += result;
  }

  render() {
    return <div className="App" />;
  }

```

### VisualSearch Generator

## VisualSearch supports 4 colors
1. RED
2. BLUE
3. GREEN
4. YELLOW

## Example

`import d3 from 'd3-numerosity';`

```javascript
    componentDidMount() {

      var result = d3.visualSearch.visualSearch('RED');
      
      var div = document.getElementById("root");
      div.innerHTML += result;
  }

  render() {
    return <div className="App" />;
  }

```


<!-- YOUR API DOCUMENTATION HERE. Use bold for symbols (such as constructor and method names) and italics for instances. See the other D3 modules for examples.

<a href="#numerosity" name="numerosity">#</a> <b>numerosity</b>()

Computes the answer to the ultimate question of life, the universe, and everything. -->
