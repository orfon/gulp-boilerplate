import $ from "jquery";
import Marionette from "backbone.marionette";

// Use precompiled templates
Marionette.Renderer.render = function(template, data){
   // Hint: nunjucks-slim only works with precompiled templates
   return nunjucks.render(template, data);
};
