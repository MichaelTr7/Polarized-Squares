
window.onload = function(){
  
  // Setting canvas height 
  var Screen_Height = String(window.screen.height);
  var Screen_Width = String(window.screen.width);
  var Canvas = document.getElementById('Canvas');
  Canvas.style.height = Screen_Height + "px";
  Canvas.style.width = Screen_Width + "px";
  
  document.getElementById('Canvas_Colour_Button').addEventListener("click",Pick_Background_Colour);
  document.getElementById('Add_Button').addEventListener("click",Add_New_Picture);
  window.addEventListener("resize",Window_Is_Resized);
  
}

