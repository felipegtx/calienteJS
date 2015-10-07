![Raska](logo.png "Raska.js")

HTML5 canvas visual directed graph creation tool.

## What's this - *exactly*?

You can either go take a look at the **[live sample of a simple graph](http://felipegtx.github.io/RaskSample.html)** 
or **[read about it](http://felipegte.com/2015/08/20/raska-criacaoexportacao-de-grafos-direcionados-usando-html5/)** (*Pt-br*).

You can also take a look into the commented source code 
**[here](http://felipegtx.github.io/Raska/docs/index.html)**

### Roadmap
- [ ] Visual tool to create Directed graphs
  - [x] Square
  - [x] Triangle
  - [x] Circle
  - [x] Arrow
  - [ ] Custom shape drawing tool
- [x] Add/Remove elements programatically
- [x] Add/Remove elements' links programatically
- [x] Generic collision/click check algorithm
- [x] Animation library
    - [x] FadeIn effect
    - [x] FadeOut effect
    - [x] Move effect
- [x] Save to image
- [x] Export to JSON
- [x] Import from JSON
- [x] Fullscreen mode
 - [x] Go/back from fullscreen
 - [ ] Automatically adapt to screen size changes (when in fullscreen)
- [ ] Element properties panel
- [ ] Unity tests

##Usage

Here are the basic setup for the library. If you need/want to learn more, please refer to the [docs](http://felipegtx.github.io/Raska/docs/index.html)

### Basic setup
- Create a canvas element in your page

```html
<canvas id="raskaContent" width="800" height="600"></canvas>
```

- Add raska.js library

```html
<script type="text/javascript" src="src/raska.js"></script>
```

- Initialize it to a valid *Canvas*

```javascript
raska.installUsing({ targetCanvasId: "raskaContent" });
```

### Element tracking / repositioning

To create a circle, you can easily just do

```javascript
var circle = raska.newCircle();
```

Don't forget to register it in the library in order to get it rendered. To do so, just call the ```plot``` method like so:

```javascript
raska.plot(circle);
```

By keeping the reference to the element you can easily (re)define its properties (eg: its position) at any time without any further hassle. For example if you want it to move to the right you can just do:

```javascript
circle.x += 10;
```

### Animation

By using ```raska.animation``` you can easily set a new behaviour to your element. 

```javascript
 //// The raska animation
raska.animation.on(circle)

    /// Fade in the circle
     .fadeIn()
     
    /// Execute the animations in loop 
    ///     PS: here you can also provide an parameter to set the interval beteween animations
      .loop();
```

### Examples

- [Directed graph](http://felipegtx.github.io/RaskSample.html) 
   - **Get a JSON from a canvas**
      ```javascript
      raska.getElementsString()
      ```
      
   - **Load a JSON into the canvas**
      ```javascript
      /// Here we grap the JSON from a previous graph we've saved and...
      var elementGraph = document.getElementById("elementGraph").value;
      
      /// load it back into the canvas
      raska.loadElementsFrom(elementGraph);
      ```
   - **Adding a subscriber for click iteractions on a given element (touchscreen friendly)**
   
      ```javascript
      triangle.on.click(function (x, y, e, ev) {
        console.log("You've clicked in this triangle", e);
      });
      ```
- [Container](http://felipegtx.github.io/Raska/samples/ContainerSample.html)
   - **Tracking the mouse position**
   
      ```javascript
      raska.onCanvasInteraction("mousemove", /// this could also be 'click'
         function (evtData) {
           console.log("The mouse is moving", evtData);
         });
      ```
- [Logo builder](http://felipegtx.github.io/Raska/samples/LogoBuilder.html)
- [Animation](http://felipegtx.github.io/Raska/samples/AnimationSample.html)
- [A simple game](http://felipegtx.github.io/Raska/samples/AnimationSample2.html)

### Public delegates / cutpoints

Raska' public interface provides a handlfull of helper delegates to allow you to proper control/handle the elements behaviour/interaction. 

The delegates are the following:
* Any Raska element exposes
  * The ```on``` property
     * [```click```](http://felipegtx.github.io/Raska/docs/classes/_basicElement.html#method-click) method
     * [```release```](http://felipegtx.github.io/Raska/docs/classes/_basicElement.html#method-release) method
  * [```canLink```](http://felipegtx.github.io/Raska/docs/classes/_basicElement.html#method-canLink) delegate (customizable *via override*) allows you to control whether or not a new link can be stabilished between two elements.
  * [```isSerializable```](http://felipegtx.github.io/Raska/docs/classes/_basicElement.html#method-isSerializable) delegate (customizable *via override*) allows you to control whether or not a given element should be serialized as part of the JSON graph.
  * [```notifyDisableStateOn```](http://felipegtx.github.io/Raska/docs/classes/_basicElement.html#method-notifyDisableStateOn) method allows you to subscribe to receive a notification whenever an element **is abou to** get removed from the canvas

## Known limitations

For now, only Google Chrome is supported.
