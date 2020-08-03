
<!-- saved from url=(0068)http://esotericsoftware.com/files/runtimes/spine-ts/examples/canvas/ -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
  <script src="./spine-canvas.js"></script>
  <style>
    * { margin: 0; padding: 0; }
    body, html { height: 100% }
    canvas { position: absolute; width:100px ;height: 100px; }
  </style>
  </head><body>
  <canvas id="canvas" width="100" height="100"></canvas>
  
  <script>
  
  var lastFrameTime = Date.now() / 1000;
  var canvas, context;
  var assetManager;
  var skeleton, state, bounds;
  var skeletonRenderer;
  
  // var skelName = "spineboy-ess";
  var skelName = "alien";
  // var animName = "walk";
  var animName = "death";
  
  
  function init () {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
  
    skeletonRenderer = new spine.canvas.SkeletonRenderer(context);
    // enable debug rendering
    skeletonRenderer.debugRendering = false;
    // enable the triangle renderer, supports meshes, but may produce artifacts in some browsers
    skeletonRenderer.triangleRendering = false;
  
    assetManager = new spine.canvas.AssetManager();
    assetManager.loadText("./alien/export/" + skelName + ".json");
    assetManager.loadText("./alien/export/" + skelName +".atlas");
    assetManager.loadTexture("./alien/export/" + skelName+ ".png");
  
    requestAnimationFrame(run);
  }
  
  function run () {
    if (assetManager.isLoadingComplete()) {
      var data = loadSkeleton(skelName, animName, "default");
      console.log(data);
      
      skeleton = data.skeleton;
      state = data.state;
      bounds = data.bounds;
      requestAnimationFrame(render);
    } else {
      requestAnimationFrame(run);
    }
  }
  
  function loadSkeleton (name, initialAnimation, skin) {
    if (skin === undefined) skin = "default";
  
    // Load the texture atlas using name.atlas and name.png from the AssetManager.
    // The function passed to TextureAtlas is used to resolve relative paths.
    atlas = new spine.TextureAtlas(assetManager.get("./alien/export/" + name + ".atlas"), function(path) {
      return assetManager.get("./alien/export/" + path);
    });
  
    // Create a AtlasAttachmentLoader, which is specific to the WebGL backend.
    atlasLoader = new spine.AtlasAttachmentLoader(atlas);
  
    // Create a SkeletonJson instance for parsing the .json file.
    var skeletonJson = new spine.SkeletonJson(atlasLoader);
  
    // Set the scale to apply during parsing, parse the file, and create a new skeleton.
    var skeletonData = skeletonJson.readSkeletonData(assetManager.get("./alien/export/" + name + ".json"));
    var skeleton = new spine.Skeleton(skeletonData);
    skeleton.flipY = true;
    var bounds = calculateBounds(skeleton);
    skeleton.setSkinByName(skin);
  
    // Create an AnimationState, and set the initial animation in looping mode.
    var animationState = new spine.AnimationState(new spine.AnimationStateData(skeleton.data));
    animationState.setAnimation(0, initialAnimation, true);
    animationState.addListener({
      event: function(trackIndex, event) {
        // console.log("Event on track " + trackIndex + ": " + JSON.stringify(event));
      },
      complete: function(trackIndex, loopCount) {
        // console.log("Animation on track " + trackIndex + " completed, loop count: " + loopCount);
      },
      start: function(trackIndex) {
        // console.log("Animation on track " + trackIndex + " started");
      },
      end: function(trackIndex) {
        // console.log("Animation on track " + trackIndex + " ended");
      }
    })
  
    // Pack everything up and return to caller.
    return { skeleton: skeleton, state: animationState, bounds: bounds };
  }
  
  function calculateBounds(skeleton) {
    var data = skeleton.data;
    skeleton.setToSetupPose();
    skeleton.updateWorldTransform();
    var offset = new spine.Vector2();
    var size = new spine.Vector2();
    skeleton.getBounds(offset, size, []);
    return { offset: offset, size: size };
  }
  
  function render () {
    var now = Date.now() / 1000;
    var delta = now - lastFrameTime;
    lastFrameTime = now;
  
    resize();
    
    state.update(delta);
    state.apply(skeleton);
    skeleton.updateWorldTransform();
    skeletonRenderer.draw(skeleton);
  
    requestAnimationFrame(render);
  }
  
  function resize () {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (canvas.width != w || canvas.height != h) {
      canvas.width = w;
      canvas.height = h;
    }
  
    // magic
    var centerX = bounds.offset.x + bounds.size.x / 2;
    var centerY = bounds.offset.y + bounds.size.y / 2;
    var scaleX = bounds.size.x / canvas.width;
    var scaleY = bounds.size.y / canvas.height;
    var scale = Math.max(scaleX, scaleY) * 1.2;
    if (scale < 1) scale = 1;
    var width = canvas.width * scale;
    var height = canvas.height * scale;
  
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(1 / scale, 1 / scale);
    context.translate(-centerX, -centerY);
    context.translate(width / 2, height / 2);
  }
  
  (function() {
    init();
  }());
  
  </script>
  </body></html>