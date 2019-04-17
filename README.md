# d3-numerosity

YOUR DESCRIPTION HERE. Replace all instances of `numerosity` in this file with the name of your new plugin.

## Installing

If you use NPM, `npm install d3-numerosity`. Otherwise, download the [latest release](https://github.com/d3/d3-numerosity/releases/latest).

## Generate Stimulus
## d3-numerosity generate_stimulus supports 3 Shapes
1. sqaure
2. circle
3. diamond

## It accepts size and color as well

## Example

`import d3 from 'd3-numerosity';`

```javascript
    componentDidMount() {

      var result = d3.stimulus.generate_stimulus([
        {
          shape: 'circle',
          size: 10,
          color: 'red'
        },
        {
          shape: 'square',
          size: 20,
          color: '#4286f4'
        }
      ], [10, 10]);
      
      var div = document.getElementById("root");
      div.innerHTML += result;
  }

  render() {
    return <div className="App" />;
  }
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
