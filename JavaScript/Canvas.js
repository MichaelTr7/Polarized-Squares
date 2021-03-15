
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
  document.body.addEventListener('dragenter', Prevent_Default, false);
  document.body.addEventListener('dragexit', Prevent_Default, false);
  document.body.addEventListener('dragover', Prevent_Default, false);
  document.body.addEventListener('drop',Prevent_Default, false);
  document.addEventListener("keydown",Hot_Key_Pressed);
  
  document.getElementById('Add_Square_Button').click();  
  document.getElementById('Hot_Key_Nav_Button').addEventListener("mouseenter",Show_Hot_Key_Tutorial);
  document.getElementById('Hot_Key_Nav_Button').addEventListener("mouseleave",Hide_Hot_Key_Tutorial);
}


function Hot_Key_Pressed(e){
let Key = e.key;

// Open left tools (left arrow)
if(Key == 'ArrowLeft'){
  document.getElementsByClassName('Toggle_Buttons')[0].click();
}    
// Open right tools (right arrow)
if(Key == 'ArrowRight'){
  document.getElementsByClassName('Toggle_Buttons')[1].click();
}
// Toggle both tools (alt + t)
if(Key == '†'){
  document.getElementsByClassName('Toggle_Buttons')[1].click();
  document.getElementsByClassName('Toggle_Buttons')[0].click();
}
// Add picture (alt + p)
if(Key == 'π'){
    document.getElementById('Add_Square_Button').click();
}
// Screenshot (alt + s)
if(Key == 'ß'){
  Screenshot_Canvas();
}  

// Get out of screenshot mode (esc)
if(Key == 'Escape'){
  let Opacity = window.getComputedStyle(document.getElementsByClassName('Canvas_Colour_Panel')[0]).getPropertyValue('opacity');
  if(Opacity == 0){
    Screenshot_Canvas();
  }
  }

if(Key == 'Backspace'){
  if(document.getElementById(Focussed_Picture)){
    document.getElementById(Focussed_Picture).remove();
  }
}    
}


function Show_Hot_Key_Tutorial(){
  var Hot_Keys_Panel = document.getElementById('Hot_Keys_Panel');
  Hot_Keys_Panel.classList.remove('Fade_In');
  Hot_Keys_Panel.classList.remove('Fade_Out');
  void Hot_Keys_Panel.offsetWidth;
  document.getElementById('Hot_Keys_Panel').style.display = "grid";
  Hot_Keys_Panel.classList.add('Fade_In');
}

function Hide_Hot_Key_Tutorial(){
  var Hot_Keys_Panel = document.getElementById('Hot_Keys_Panel');
  Hot_Keys_Panel.classList.remove('Fade_In');
  Hot_Keys_Panel.classList.remove('Fade_Out');
  void Hot_Keys_Panel.offsetWidth;
  Hot_Keys_Panel.classList.add('Fade_Out');
  setTimeout(function () {
    document.getElementById('Hot_Keys_Panel').style.display = "none";
  }, 200);
}
















