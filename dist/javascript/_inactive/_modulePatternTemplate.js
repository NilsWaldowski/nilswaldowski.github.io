define(["jquery"],function(){"use strict";var n,o;return n={init:function(){this._cache(),this._bind(),o.doSomething()},_cache:function(){this.$container=$("body"),this.container=document.body},_bind:function(){this.$container.on("click",o.doSomethingElse),this.container.addEventListener("click",o.doSomethingElse,!1)}},o={_config:{},doSomething:function(){console.log("modulePatternTemplate loaded!")},doSomethingElse:function(){console.log("document.body was clicked!")}},n});