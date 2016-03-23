var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function() {
        this._super();
        var size = cc.winSize;

        this.sprite = new cc.Sprite(res.bg);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        this.addLayer();

        return true;
    },

    addLayer: function() {
        console.log('addLayer(=============');
        // var arr = ['ScrollViewLayer','UIScrollViewLayer','UIPageViewLayer', 'BtnLayer'];
        // for (var i = 0; i < arr.length; i++) {
        //     var label = new cc.LabelTTF(arr[i],'Arial', 24);
        //     this.addChild(label);

        //     // var btn = new Ltc.btn();
        // }
        var layer = new ScrollViewLayer2();
        this.addChild(layer);
    }
});


var ScrollViewLayer = cc.Layer.extend({
    sprite: null,
    scrollView: null,
    ctor: function() {
        this._super();
        this.initStat();
    },
    initStat: function() {
        console.log('------- ScrollViewLayer --------');
        var size = cc.winSize;

        // var scrollLayer = this.scrollLayer = new cc.LayerColor(cc.color.RED);
        var scrollLayer = this.scrollLayer = new cc.Layer();
        scrollLayer.height = size.height * 2;
        scrollLayer.width = size.width * 9;

        var newSize = cc.size(size.width * 2, size.height * 2)

        // 创建scrollview
        var scrollView = this.scrollView = new cc.ScrollView(newSize, scrollLayer);
        // 设定方向
        scrollView.direction = cc.SCROLLVIEW_DIRECTION_HORIZONTAL;
        scrollView.bounceable = false;
        // 设置旋转
        scrollView.setRotation(-45);
        scrollView.setAnchorPoint(0, 0);
        scrollView.y = -size.width * 3 / 4;
    
        this.addChild(scrollView);

        // 设置监听 
        scrollView.setDelegate(this);
        console.log(scrollView);

       
        //创建星球
        for (var i = 1; i < 12; i++) {
            var planet = new cc.Sprite("res/" + i + ".png");
            planet.x = (i - 1) * this.len + this.mid;
            planet.y = size.height / 2;
            planet.rotation = 45;
            scrollLayer.addChild(planet);
        }
        this.checkPos(0);

    },
    scrollViewDidScroll: function(view) {
        console.log("--------- scrollViewDidScroll --------------");
        var offsetPosX = view.getContentOffset().x; //获得scrollLayer的偏移x坐标
        this.checkPos(offsetPosX);
    },
    scrollViewDidZoom: function(view) {
        console.log("---------- scrollViewDidScroll ------------");
    },

    checkPos: function(offsetPosX) {
        // 获取scrollLayer上面的所有节点
        var arr = this.scrollLayer.getChildren();
        for (var i = 0; i < arr.length; i++) {
            var endPosX = arr[i].x + offsetPosX;
            console.log("endPosX = " + endPosX);
            
            if (endPosX <= this.mid && endPosX > (this.mid - this.area)) {
                var s1 = Math.abs(endPosX) / this.mid;
                console.log("s1 =  " + s1);
                var scale = s1 > 0.8 ? s1 : s1 / 2;
                arr[i].scale = scale;
            } else if (endPosX > this.mid && endPosX < (this.mid + this.area)) {
                var s2 = Math.abs(endPosX) / this.mid;
                console.log("s2 = " + s2);
                // arr[i].scale = 0.1;
                var scale = (2 - s2) > 0.8 ? (2 - s2) : (2 - s2) / 2;
                arr[i].scale = scale;
            } else {
                var s3 = endPosX / (this.mid - this.area);
                console.log("s3 = " + s3);
                arr[i].scale = 0.3;
            }




            // console.log('arr[i].x = ' + arr[i].x, " | endPosX = " + endPosX );
            // console.log("endPosX / (this.mid - this.area) == " + endPosX / (this.mid - this.area));
            // if (endPosX > (this.mid - this.area) && endPosX <= this.mid) { // + 640
            //     var s1 = Math.abs(endPosX) / this.mid;
            //     console.log("s1 = " + s1);
            //     console.log(Math.abs(endPosX) / (this.mid - this.area), this.mid - this.area);
            //     arr[i].setScale(0.2);
            // } else if (endPosX < (this.mid + this.area) && endPosX > this.mid) {
            //     var s2 = Math.abs(2 * this.area - endPosX) / this.mid;
            //     console.log("s2 = " + s2);
            //     console.log(Math.abs(endPosX) / (this.mid + this.area), this.mid + this.area);
            //     arr[i].setScale(s2);
            // } else {
            //     arr[i].setScale(0.2);
            // }
        }
    }
});

var ScrollViewLayer2 = cc.Layer.extend({
    sprite: null,
    scrollView: null,
    ctor: function() {
        this._super();
        this.initStat();
    },
    initStat: function() {
        console.log('------- ScrollViewLayer --------');
        var size = cc.winSize;

        // var scrollLayer = this.scrollLayer = new cc.LayerColor(cc.color.RED);
        var scrollLayer = this.scrollLayer = new cc.Layer();
        scrollLayer.height = size.height * 2;
        scrollLayer.width = size.width * 11;

        var newSize = cc.size(size.width * 3, size.height);

        // 创建scrollview
        var scrollView = this.scrollView = new cc.ScrollView(newSize, scrollLayer);
        // 设定方向
        scrollView.direction = cc.SCROLLVIEW_DIRECTION_HORIZONTAL;
        scrollView.bounceable = false;
        // 设置旋转
        scrollView.setRotation(-45);
        scrollView.setAnchorPoint(0, 0);
        scrollView.y = -size.width * 3 / 4;
    
        this.addChild(scrollView);

        // 设置监听 
        scrollView.setDelegate(this);
        console.log(scrollView);

       
        // 设置
        this.mid = 1000;
        this.len = 500;
        this.area = 400;

        //创建星球
        for (var i = 1; i < 12; i++) {
            var planet = new cc.Sprite("res/" + i + ".png");
            planet.x = (i - 1) * this.len + this.mid;
            planet.y = size.height / 2;
            planet.rotation = 45;
            scrollLayer.addChild(planet);
        }
        this.checkPos(0);

    },
    scrollViewDidScroll: function(view) {
        console.log("--------- scrollViewDidScroll --------------");
        var offsetPosX = view.getContentOffset().x; //获得scrollLayer的偏移x坐标
        this.checkPos(offsetPosX);
    },
    scrollViewDidZoom: function(view) {
        console.log("---------- scrollViewDidScroll ------------");
    },

    checkPos: function(offsetPosX) {
        // 获取scrollLayer上面的所有节点
        var arr = this.scrollLayer.getChildren();
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            var endPosX = arr[i].x + offsetPosX;
            console.log("endPosX = " + endPosX);
            
            if (endPosX <= this.mid && endPosX > (this.mid - this.area)) {
                var s1 = Math.abs(endPosX) / this.mid;
                console.log("s1 =  " + s1);
                var scale = s1 > 0.8 ? s1 : s1 / 2;
                arr[i].scale = scale;
            } else if (endPosX > this.mid && endPosX < (this.mid + this.area)) {
                var s2 = Math.abs(endPosX) / this.mid;
                console.log("s2 = " + s2);
                // arr[i].scale = 0.1;
                var scale = (2 - s2) > 0.8 ? (2 - s2) : (2 - s2) / 2;
                arr[i].scale = scale;
            } else {
                var s3 = endPosX / (this.mid - this.area);
                console.log("s3 = " + s3);
                arr[i].scale = 0.3;
            }




            // console.log('arr[i].x = ' + arr[i].x, " | endPosX = " + endPosX );
            // console.log("endPosX / (this.mid - this.area) == " + endPosX / (this.mid - this.area));
            // if (endPosX > (this.mid - this.area) && endPosX <= this.mid) { // + 640
            //     var s1 = Math.abs(endPosX) / this.mid;
            //     console.log("s1 = " + s1);
            //     console.log(Math.abs(endPosX) / (this.mid - this.area), this.mid - this.area);
            //     arr[i].setScale(0.2);
            // } else if (endPosX < (this.mid + this.area) && endPosX > this.mid) {
            //     var s2 = Math.abs(2 * this.area - endPosX) / this.mid;
            //     console.log("s2 = " + s2);
            //     console.log(Math.abs(endPosX) / (this.mid + this.area), this.mid + this.area);
            //     arr[i].setScale(s2);
            // } else {
            //     arr[i].setScale(0.2);
            // }
        }
    }
});


var UIScrollViewLayer = cc.Layer.extend({
    sprite: null,
    ctor: function() {
        this._super();
        this.initStat();
        return true;
    },
    initStat: function() {
        console.log('------- UIScrollViewLayer --------');
        var self = this;
        var size = cc.winSize;
        this.bg = new cc.Sprite();
        // 创建scrollview
        var scrollView = this.scrollView = new ccui.ScrollView();

        console.log(size.width);
        var newSize = cc.size(size.width * 2, size.height * 2);
        scrollView.setContentSize(newSize);
        scrollView.setDirection(ccui.ScrollView.DIR_BOTH);
        scrollView.setBounceEnabled(false);

        console.log(scrollView);
        scrollView.setRotation(-45);

        // 设定内部容器的尺寸
        var innerWidth = size.width * 7;
        var innerHeight = size.height;
        scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

        this.addChild(scrollView);

        // 创建layer
        var scrollLayer = this.scrollLayer = new cc.LayerColor(cc.color.BLUE);
        scrollView.addChild(scrollLayer);

        // scrollView.addEventListener(this.scrollCallback);

        scrollView.addEventListenerScrollView(this.scrollViewCallback, this);

        // 创建星球
        for (var i = 1; i < 12; i++) {
            var planet = new cc.Sprite("res/" + i + ".png");
            planet.x = (i - 1) * 380 + 320;
            planet.y = 450;
            scrollLayer.addChild(planet);
        }
        this.checkPos(0);


    },

    scrollViewCallback: function(view){
        console.log('-------- scrollViewCallback ------------');
        console.log(view);
        // var offsetPosX = view.getContentOffset().x; //获得scrollLayer的偏移x坐标
        var offsetPosX = 0

        // var bb = this.scrollLayer.x;
        var bb = this. scrollView.x;
        console.log("== bb ===== " + bb);
        this.checkPos(offsetPosX);
    },
    scrollCallback: function(view){
        var self = this;
        console.log('-------- scrollCallback ------------');
        console.log(view);
        var offsetPosX = view.getContentOffset().x; //获得scrollLayer的偏移x坐标
        this.checkPos(offsetPosX);
    },

    scrollViewDidScroll: function(view) {
        console.log("--------- scrollViewDidScroll --------------");       
        var offsetPosX = view.getContentOffset().x; //获得scrollLayer的偏移x坐标
        this.checkPos(offsetPosX);
    },
    scrollViewDidZoom: function(view) {
        console.log("---------- scrollViewDidScroll ------------");
    },

    checkPos: function(offsetPosX) {
        // 获取scrollLayer上面的所有节点
        var arr = this.scrollLayer.getChildren();

        for (var i = 0; i < arr.length; i++) {
            console.log('----- arr[i].x -----' + arr[i].x);
            var endPosX = arr[i].x + offsetPosX;
            if (endPosX > 100 && endPosX <= 320) {
                var s1 = Math.abs(endPosX) / 320;
                // console.log("s1 = " + s1);
                arr[i].setScale(s1);
            } else if (endPosX > 320 && endPosX < 540) {
                var s2 = Math.abs(640 - endPosX) / 320;
                // console.log("s2 = " + s2);
                arr[i].setScale(s2);
            } else {
                arr[i].setScale(0.3);
            }
        }
    }
});

var UIPageViewLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.initStat();
    },
    initStat: function() {
        console.log('------- UIPageViewLayer --------');
        var size = cc.winSize;

       // Create the page view
        var pageView = this.pageView =  new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(450, 460));
        pageView.anchorX = 0.5;
        pageView.anchorY = 0.5;
        pageView.x = cc.winSize.width / 2;
        pageView.y = cc.winSize.height / 2;

        for (var i = 1; i < 12; ++i) {
            var layout = new ccui.Layout();
            layout.setContentSize(cc.size(300, 460));
            var layoutRect = layout.getContentSize();
            var layer = new cc.LayerColor((i % 2 === 0) ? cc.color.RED : cc.color.BLUE);
            layout.addChild(layer);

            var planet = new cc.Sprite("res/" + i + '.png');
            planet.x = layoutRect.width / 2;
            planet.y = layoutRect.height / 2;
            planet.scale = 0.3;
            console.log(i, planet)
            layout.addChild(planet);

            var label = new cc.LabelTTF('page '+ i ,'Arial', 30);
            label.attr({
                x: layoutRect.width / 2, 
                y: layoutRect.height - 80
            });
            layout.addChild(label)
            pageView.addPage(layout);
        }
        this.addChild(pageView);
        pageView.addEventListener(this.pageViewEvent, this);
    },
    // 页面切换时间监听
    pageViewEvent: function(pageView, type) {
        var self = this;
        switch (type) {
            case ccui.PageView.EVENT_TURNING:
                var idx = pageView.getCurPageIndex();
                var curPage = pageView.getPage(idx);
                var idx2 = (idx + 1) % 2;
                var otherPage = pageView.getPage(idx2);
                break;
            default:
                break;
        }
    },
    scrollViewDidScroll: function(view) {
        console.log("--------- scrollViewDidScroll --------------");
        var offsetPosX = view.getContentOffset().x; //获得scrollLayer的偏移x坐标
        this.checkPos(offsetPosX);
    },
    scrollViewDidZoom: function(view) {
        console.log("---------- scrollViewDidScroll ------------");
    },

    checkPos: function(offsetPosX) {
        // 获取scrollLayer上面的所有节点
        var arr = this.scrollLayer.getChildren();
        for (var i = 0; i < arr.length; i++) {
            var endPosX = arr[i].x + offsetPosX;
            if (endPosX > 100 && endPosX <= 320) {
                var s1 = Math.abs(endPosX) / 320;
                // console.log("s1 = " + s1);
                arr[i].setScale(s1);
            } else if (endPosX > 320 && endPosX < 540) {
                var s2 = Math.abs(640 - endPosX) / 320;
                // console.log("s2 = " + s2);
                arr[i].setScale(s2);
            } else {
                arr[i].setScale(0.3);
            }
        }
    }
});

var UIPageViewLayer2 = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.initStat();
    },
    initStat: function() {
        console.log('------- UIPageViewLayer --------');
        var size = cc.winSize;

       // Create the page view
        var pageView = this.pageView =  new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(450, 460));
        pageView.anchorX = 0.5;
        pageView.anchorY = 0.5;
        pageView.x = cc.winSize.width / 2;
        pageView.y = cc.winSize.height / 2;

        for (var i = 1; i < 12; ++i) {
            var layout = new ccui.Layout();
            layout.setContentSize(cc.size(300, 460));
            var layoutRect = layout.getContentSize();
            var layer = new cc.LayerColor((i % 2 === 0) ? cc.color.RED : cc.color.BLUE);
            layout.addChild(layer);

            var planet = new cc.Sprite("res/" + i + '.png');
            planet.x = layoutRect.width / 2;
            planet.y = layoutRect.height / 2;
            planet.scale = 0.3;
            console.log(i, planet)
            layout.addChild(planet);

            var label = new cc.LabelTTF('page '+ i ,'Arial', 30);
            label.attr({
                x: layoutRect.width / 2, 
                y: layoutRect.height - 80
            });
            layout.addChild(label)
            pageView.addPage(layout);
        }
        this.addChild(pageView);
        pageView.addEventListener(this.pageViewEvent, this);
    },
    // 页面切换时间监听
    pageViewEvent: function(pageView, type) {
        var self = this;
        switch (type) {
            case ccui.PageView.EVENT_TURNING:
                var idx = pageView.getCurPageIndex();
                var curPage = pageView.getPage(idx);
                var idx2 = (idx + 1) % 2;
                var otherPage = pageView.getPage(idx2);
                break;
            default:
                break;
        }
    },
    scrollViewDidScroll: function(view) {
        console.log("--------- scrollViewDidScroll --------------");
        var offsetPosX = view.getContentOffset().x; //获得scrollLayer的偏移x坐标
        this.checkPos(offsetPosX);
    },
    scrollViewDidZoom: function(view) {
        console.log("---------- scrollViewDidScroll ------------");
    },

    checkPos: function(offsetPosX) {
        // 获取scrollLayer上面的所有节点
        var arr = this.scrollLayer.getChildren();
        for (var i = 0; i < arr.length; i++) {
            var endPosX = arr[i].x + offsetPosX;
            if (endPosX > 100 && endPosX <= 320) {
                var s1 = Math.abs(endPosX) / 320;
                // console.log("s1 = " + s1);
                arr[i].setScale(s1);
            } else if (endPosX > 320 && endPosX < 540) {
                var s2 = Math.abs(640 - endPosX) / 320;
                // console.log("s2 = " + s2);
                arr[i].setScale(s2);
            } else {
                arr[i].setScale(0.3);
            }
        }
    }
});

var BtnLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.initStat();
    },
    initStat: function() {
        var type = 0;
        var btn1 = Ltc.twoSideBtn("res/btn/beerMall_btn_selected.png", "res/btn/beerMall_btn_unselected.png", function() {
            console.log('-------- btn1 -------');
            if (type == 0) {
                return;
            }
            btn1.changeTexture();
            btn2.changeTexture();
            type = 0;
        });

        btn1.x = 160;
        btn1.y = cc.winSize.height / 2;
        // btn1.scale = 0.3;
        btn1.anchorY = 0;
        this.addChild(btn1);

        var btn2 = Ltc.twoSideBtn("res/btn/coinMall_btn_unselected.png", "res/btn/coinMall_btn_selected.png", function() {
            console.log('---------- btn2 --------');
            if (type == 1) {
                return;
            }
            btn1.changeTexture();
            btn2.changeTexture();
            type = 1;
        });

        btn2.x = cc.winSize.width - 160;
        btn2.y = cc.winSize.height / 2;
        // btn2.scale = 0.3;
        btn2.anchorY = 0;
        this.addChild(btn2);
    },
});

var testViewLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.initStat();
    },
    initStat: function(){
        //能量环背景
        var power_bg = this.power_bg = new cc.Sprite(res.power_bg);
        power_bg.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2
        });
        this.addChild(power_bg);

        //能量环前景, 进度条
        var power_bar = this.power_bar = new cc.ProgressTimer(new cc.Sprite(res.power_pro));
        power_bar.type = cc.ProgressTimer.TYPE_BAR;
        power_bar.midPoint = cc.p(0, 0);
        power_bar.barChangeRate = cc.p(1, 0);

        power_bar.scale = 0.8;

        power_bar.x = power_bg.x;
        power_bar.y = power_bg.y;
        power_bar.percentage = 100;
        this.addChild(power_bar);

        var power_bar2 = this.power_bar2 = new cc.ProgressTimer(new cc.Sprite(res.power_pro));
        power_bar2.type = cc.ProgressTimer.TYPE_BAR;
        power_bar2.midPoint = cc.p(0, 0);
        power_bar2.barChangeRate = cc.p(1, 0);

        power_bar2.x = power_bg.x;
        power_bar2.y = power_bg.y - 10;
        power_bar2.percentage = 100;
        this.addChild(power_bar2);


        //能量环光标
        var power_cursor = this.power_cursor = new cc.Sprite(res.power_cursor);
        power_cursor.attr({
            x: 0 +(power_bar.width * power_bar.percentage / 100),
            y: 0
        });
        power_bar.addChild(power_cursor);
        
        // if (power_bar.percentage == 0 || power_bar.percentage > 100){
        //     power_cursor.setVisible(false);
        // }
        // this.setPowerEffect(0);

        var btn = new Ltc.Btn(res.beerMall_btn_unselected);
        btn.x = cc.winSize.width / 2;
        btn.y = cc.winSize.height / 4;
        this.addChild(btn);
        btn.addClickEventListener(function() {
            console.log('------- click btn --------');
            // this.setPowerEffect()
        }, this);
    },

    setPowerEffect: function(){
        console.log('-------- setPowerEffect per = ' + per);
        // 能量槽光标的动画
        if (this.power.Slot.percentage >= 100) {
            this.power.cursor.setVisible(false);
            this.power.Slot.percentage = 100;
            this.power.cursor.x = this.startX;
        } else if(this.power.Slot.percentage == 0) {
            this.power.cursor.setVisible(false);
            this.power.cursor.x = this.startX;
        } else {
            // this.power.cursor.x = this.startX + this.power.Slot.percentage * this.barLen / 100;
            this.power.cursor.setVisible(true);
            var move = cc.moveBy(per / 100, (per * this.barLen) / 100, 0);
            this.power.cursor.runAction(cc.sequence(move));
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});



var Ltc = Ltc || {};
Ltc.twoSideBtn = function(normalImg, activeImg, cb) {
    var btn = new Ltc.Btn(normalImg);
    btn._touchZoom = false;
    btn.startFile = normalImg;
    btn.changeTexture = function() {
        if (btn.startFile === normalImg) {
            // if (btn.startsWith(btn.startFile, '#')) {
            //     btn.setSheetTexture(activeImg);
            // } else {
                btn.setTexture(activeImg);
            // }
            btn.startFile = activeImg;
        } else {
            // if (btn.startsWith(btn.startFile, '#')) {
            //     btn.setSheetTexture(normalImg);
            // } else {
                btn.setTexture(normalImg);
            // }
            btn.startFile = normalImg;
        }
    }
    btn.addClickEventListener(cb);
    return btn;
}


/**
 * 为了方便且安全的扩展特性, 建议在创建Sprite时都默认使用cc.Sprite, 若有特殊需要可以使用该方法
 * var sp = new Ltc.Sprite( ... );
 * 特性如下:
 *  changeTexture: 改变Sprite的texture
 */
Ltc.Sprite = cc.Sprite.extend({
  /*
   * @param {String} textureName 如"aa.png", 或者"#aa_png"之类
   */
  changeTexture: function(textureName) {
    if (!textureName) {
      console.log("Ltc.Sprite -> changeTexture 无效的TextureName : " + textureName);
      return;
    }
    if (textureName.charAt(0) == '#') {
      var sp = cc.spriteFrameCache.getSpriteFrame(textureName.replace('#', ''));
      this.setSpriteFrame(sp);
    } else {
      var t = cc.textureCache.getTextureForKey(textureName);
      this.setTexture(t);
    }
  }
});

/*
 * 快速创建按钮Sprite
 * 特性如下:
 *  addClickEventListener: 添加点击事件的回调函数
 *  addTouchBeganEventListener: 添加开始触摸的回调函数
 *  addTouchEndedEventListener: 添加触摸结束的回调函数
 */
Ltc.Btn = Ltc.Sprite.extend({
  clickEventCB: null,
  clickEventEnable: true,
  clickEventDelay: 1.5,
  touchBeganEventCB: null,
  touchEndedEventCB: null,
  _touchSwallow: true, // 是否吞噬触摸
  _touchZoom: false,  // 是否点击放大
  _touchEnabled: true, // 是否可点击
  _priority: 0, // 触摸优先级
  _scale: 1, // 保存按钮被点击前的缩放比例
  _touchBeginWorldPos: null, // 记录按钮开始被点击时的世界坐标
  touchListener: null,
  _timeOut: null,

  onEnter: function() {
    this._super();
    this.setTouchEnabled(this._touchEnabled);
  },
  onExit: function() {
    this.setTouchEnabled(false);
    this._super();
  },
  mAbs: function(a, b) {
    return Math.abs(a - b);
  },
  // appendLabel: function(str, size, color){
  //     if( this.txtLabel ){
  //         this.txtLabel.setString(str); 
  //     }
  //     else{
  //         size = size || this.height*0.5;
  //         var label = this.txtLabel = new cc.LabelTTF(str, "Arial", size);
  //         label.x = this.width/2;
  //         label.y = this.height/2;
  //         this.addChild(label);
  //         if( color ){
  //             label.fillStyle = color;
  //         }
  //     }
  // },
  bindEvent: function() {
    var self = this;
    var tmp = null;
    var maxOffset = 25;
    this.removeEvent();
    this.touchListener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: self._touchSwallow,
      onTouchBegan: function(touch, event) {
        var self = event.getCurrentTarget();
        var pos = touch.getLocation();
        if (self.isTouchInside(touch)) {
          tmp = pos;
          self._touchBeginWorldPos = self.getParent().convertToWorldSpace(pos);

          // 如果开启放大功能则放大
          if (self._touchZoom) {
            self._scale = self.scale;
            self.scale = 1.15 * self.scale;
          }

          self.touchBeganEventCB && self.touchBeganEventCB(self);
          return true;
        } else {
          return false;
        }
      },
      onTouchMoved: function(touch, event) {
        var self = event.getCurrentTarget();
        if (!self.isTouchInside(touch) || !self.isNotMoveOut(touch)) {
          if (self._touchZoom) {
            self.scale = self._scale;
          }
          return;
        }
      },
      onTouchEnded: function(touch, event) {
        var self = event.getCurrentTarget();
        if (self._touchZoom) {
          self.scale = self._scale;
        }
        if (!self.isTouchInside(touch) || !self.isNotMoveOut(touch)) {
          return;
        }
        var pos = touch.getLocation();
        var ox = self.mAbs(pos.x, tmp.x);
        var oy = self.mAbs(pos.y, tmp.y);
        self.touchEndedEventCB && self.touchEndedEventCB(self);
        if (self.clickEventEnable && ox <= maxOffset && oy <= maxOffset) {
          self.clickEventEnable = false;
          self.clickEventCB && self.clickEventCB(self);
          this._timeOut = setTimeout(function() {
            self.clickEventEnable = true;
          }, self.clickEventDelay * 1000);
          self.clickEventEnable = true;
        } else {
          //TODO
        }
      },
      onTouchCancelled: function(touch, event) {

      }
    });
    if (this._priority !== 0) {
      cc.eventManager.addListener(this.touchListener, this._priority);
    } else {
      cc.eventManager.addListener(this.touchListener, this);
    }
  },
  removeEvent: function() {
    if (this.touchListener) {
      cc.eventManager.removeListener(this.touchListener);
      this.touchListener = null;
    }
  },
  addClickEventListener: function(cb, delay) {
    this.clickEventCB = cb;
    if (delay !== undefined) {
      this.clickEventDelay = delay;
    }
  },
  addTouchBeganEventListener: function(cb) {
    this.touchBeganEventCB = cb;
  },
  addTouchEndedEventListener: function(cb) {
    this.touchEndedEventCB = cb;
  },

  setTouchEnabled: function(bvar) {
    if (bvar) {
      this.bindEvent();
    } else {
      this.removeEvent();
    }
    this._touchEnabled = bvar;

    return this;
  },

  setPriority: function(priority) {
    if (this._priority != priority) {
      this._priority = priority;

      if (this._touchEnabled) {
        this.bindEvent();
      }
    }
    return this;
  },

  setTouchSwallow: function(bvar) {
    if (this._touchSwallow != bvar) {
      this._touchSwallow = bvar;

      if (this._touchEnabled) {
        this.bindEvent();
      }
    }
    return this;
  },

  setTouchZoom: function(bvar) {
    this._touchZoom = bvar;
    return this;
  },

  // 用于判断是否点击在按钮区域
  isTouchInside: function(touch) {
    var touchLocation = touch.getLocation();
    touchLocation = this.getParent().convertToNodeSpace(touchLocation);
    return cc.rectContainsPoint(this.getBoundingBox(), touchLocation);
  },

  // 按钮在屏幕上被移动一定的位置后点击失效
  isNotMoveOut: function(touch) {
    var touchLocation = this.getParent().convertToWorldSpace(touch.getLocation());
    var rect = cc.rect(this._touchBeginWorldPos.x - 25, this._touchBeginWorldPos.y - 25, 50, 50);
    return cc.rectContainsPoint(rect, touchLocation);
  },

  clearTimeOut: function(){
    clearTimeout(this._timeOut);
  }
});