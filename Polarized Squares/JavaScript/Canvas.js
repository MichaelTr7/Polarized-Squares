
window.onload = function(){
  
  // Setting canvas height 
  var Screen_Height = String(window.screen.height);
  var Screen_Width = String(window.screen.width);
  var Canvas = document.getElementById('Canvas');
  Canvas.style.height = Screen_Height + "px";
  Canvas.style.width = Screen_Width + "px";
  
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
  Initial_Positions();
  
  let Sample_Colour_Buttons = document.getElementsByClassName('Sample_Colours');
  for(Index = 0; Index < Sample_Colour_Buttons.length; Index++){
    Sample_Colour_Buttons[Index].addEventListener("click",Sample_Colour_Chosen);
  }
}


function Animate_Left_Tools(){
  let Left_Tools_Span = document.getElementsByClassName('Left_Tools');
  for(Index = 0; Index < Left_Tools_Span.length; Index++){
    Left_Tools_Span[Index].classList.toggle('Toggle_Left_Tools');
  }  
}

function Animate_Right_Tools(){
  let Left_Tools_Span = document.getElementsByClassName('Right_Tools');
  for(Index = 0; Index < Left_Tools_Span.length; Index++){
    Left_Tools_Span[Index].classList.toggle('Toggle_Right_Tools');
  }  
}

function Sample_Colour_Chosen(){
    let Colour_Button = this;
    let Chosen_Colour = String(window.getComputedStyle(Colour_Button).getPropertyValue('background-color'));
    let Canvas = document.getElementById('Canvas');
    Canvas.style.backgroundColor = Chosen_Colour;
    
    
}













