require('../../../Common/spine-canvas')
import spine from '../../../Common/spine-canvas'
let alien = {
  spinePath:'',
  skelName:'',
  animName:'',
  lastFrameTime : Date.now() / 1000,
  canvas:null, 
  context:null,
  assetManager:null,
  skeleton:null, 
  state:null, 
  bounds:null,
  skeletonRenderer:null,
  init() {
    this.spinePath='./resource/'
    this.skelName='alien'
    this.animName='death'
    this.createDom();
  },
  createDom() {
    let canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    canvas.id = 'zPlug__alien'
    document.body.appendChild(canvas)
    this.spineInit(canvas)
  },
  spineInit(canvas){
    let context = canvas.getContext("2d");
    this.skeletonRenderer = new spine.canvas.SkeletonRenderer(context);
    // enable debug rendering
    this.skeletonRenderer.debugRendering = false;
    // enable the triangle renderer, supports meshes, but may produce artifacts in some browsers
    this.skeletonRenderer.triangleRendering = false;

    this.assetManager = new spine.canvas.AssetManager();
    this.assetManager.loadText(this.spinePath + this.skelName + ".json");
    this.assetManager.loadText(this.spinePath + this.skelName + ".atlas");
    this.assetManager.loadTexture(this.spinePath + this.skelName + ".png");

    requestAnimationFrame(this.runSpine);
  },
  runSpine(){
    console.log('++++');
    console.log(this.assetManager);
    
    
    if (this.assetManager.isLoadingComplete()) {
      var data = this.loadSkeleton(this.skelName, this.animName, "default");
      this.skeleton = data.skeleton;
      this.state = data.state;
      this.bounds = data.bounds;
      requestAnimationFrame(this.render);
    } else {
      requestAnimationFrame(this.runSpine);
    }
  },
  loadSkeleton(name, initialAnimation, skin) {
    if (skin === undefined) skin = "default";

    // Load the texture atlas using name.atlas and name.png from the AssetManager.
    // The function passed to TextureAtlas is used to resolve relative paths.
    let atlas = new spine.TextureAtlas(this.assetManager.get(this.spinePath + name + ".atlas"), function (path) {
      return this.assetManager.get(this.spinePath + path);
    });

    // Create a AtlasAttachmentLoader, which is specific to the WebGL backend.
    let atlasLoader = new spine.AtlasAttachmentLoader(atlas);

    // Create a SkeletonJson instance for parsing the .json file.
    var skeletonJson = new spine.SkeletonJson(atlasLoader);

    // Set the scale to apply during parsing, parse the file, and create a new skeleton.
    var skeletonData = skeletonJson.readSkeletonData(this.assetManager.get(this.spinePath + name + ".json"));
    var skeleton = new spine.Skeleton(skeletonData);
    skeleton.flipY = true;
    var bounds = calculateBounds(skeleton);
    skeleton.setSkinByName(skin);

    // Create an AnimationState, and set the initial animation in looping mode.
    var animationState = new spine.AnimationState(new spine.AnimationStateData(this.skeleton.data));
    animationState.setAnimation(0, initialAnimation, true);
    animationState.addListener({
      event: function (trackIndex, event) {
        // console.log("Event on track " + trackIndex + ": " + JSON.stringify(event));
      },
      complete: function (trackIndex, loopCount) {
        // console.log("Animation on track " + trackIndex + " completed, loop count: " + loopCount);
      },
      start: function (trackIndex) {
        // console.log("Animation on track " + trackIndex + " started");
      },
      end: function (trackIndex) {
        // console.log("Animation on track " + trackIndex + " ended");
      }
    })

    // Pack everything up and return to caller.
    return {
      skeleton: skeleton,
      state: animationState,
      bounds: bounds
    };
  },
  calculateBounds(skeleton) {
    var data = skeleton.data;
    skeleton.setToSetupPose();
    skeleton.updateWorldTransform();
    var offset = new spine.Vector2();
    var size = new spine.Vector2();
    skeleton.getBounds(offset, size, []);
    return {
      offset: offset,
      size: size
    };
  },
  render() {
    var now = Date.now() / 1000;
    var delta = now - lastFrameTime;
    lastFrameTime = now;

    resize();

    state.update(delta);
    state.apply(skeleton);
    skeleton.updateWorldTransform();
    skeletonRenderer.draw(skeleton);

    requestAnimationFrame(render);
  },
  resize() {
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
}

export default alien