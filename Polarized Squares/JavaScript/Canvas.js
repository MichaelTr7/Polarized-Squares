
window.onload = function(){
  
  // Setting canvas height 
  var Screen_Height = String(window.screen.height);
  var Screen_Width = String(window.screen.width);
  var Canvas = document.getElementById('Canvas');
  Canvas.style.height = Screen_Height + "px";
  Canvas.style.width = Screen_Width + "px";
  
  Canvas.style.height = "100vh";
  Canvas.style.width = "100vw";
  
  // All event listeners
  document.getElementById('Canvas_Colour_Button').addEventListener("click",Pick_Background_Colour);
  document.getElementById('Canvas_Colour_Button').addEventListener("click",Animate_Left_Tools);
  document.getElementById('Add_Button').addEventListener("click",Add_New_Picture);
  document.getElementById('Add_Button').addEventListener("click",Animate_Right_Tools);
  document.addEventListener("mousemove",Moving_Hue_Target);
  document.getElementById('Slider_Handle').addEventListener("mousedown",Start_Moving_Hue_Selector);
  document.addEventListener("mouseup",Stop_Moving_Hue_Selector);
  document.getElementById('Saturation_Value_Selector').addEventListener("mousedown",Start_Moving_Saturation_Value_Selector);
  document.addEventListener("mouseup",Stop_Moving_Saturation_Value_Selector);
  document.addEventListener("mousemove",Moving_Saturation_Value_Selector);
  window.addEventListener("resize",Window_Is_Resized);
  document.addEventListener("mouseup",Stop_Moving_Picture);
  document.addEventListener("mouseup",Stop_Resizing_Picture);
  Initial_Positions();
  let Sample_Colour_Buttons = document.getElementsByClassName('Sample_Colours');
  for(Index = 0; Index < Sample_Colour_Buttons.length; Index++){
    Sample_Colour_Buttons[Index].addEventListener("click",Sample_Colour_Chosen);
  }
  
  document.getElementById('Add_Square_Button').addEventListener("click",Add_Picture);
  document.getElementById('Add_Text_Button').addEventListener("click",Add_Text_Box);
  document.getElementById('Screenshot_Button').addEventListener("click",Screenshot_Canvas);  
  document.addEventListener("mousemove",Resizing_Picture);
  document.addEventListener("mousemove",Move_Picture);
  document.addEventListener("mouseup",End_Rotating);
  document.addEventListener("mousemove",Rotating_Picture);
  document.getElementById('Canvas').addEventListener("click",Close_Modifier_Handles);
  document.body.addEventListener("dblclick",Show_Tools);
}

function Close_Modifier_Handles(){
  var Modifier_Handles = document.getElementsByClassName('Modify_Handles');
  for(Index = 0; Index < Modifier_Handles.length; Index++){
    Modifier_Handles[Index].style.display = "none";  
  }
}

function Show_Tools(){
  let Left_Tools = document.getElementsByClassName('Canvas_Colour_Panel')[0];
  let Right_Tools = document.getElementsByClassName('Add_Panel')[0];
  let Navigation_Bar = document.getElementById('Navigation_Bar');
  Left_Tools.style.display = "block";
  Right_Tools.style.display = "block";
  Navigation_Bar.style.display = "block";
}












