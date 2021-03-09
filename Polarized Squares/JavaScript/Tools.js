var Hue_Selector_Is_Moving = false;
var Saturation_Value_Selector_Is_Moving = false;

let Hue_Input = 349/360;
let Saturation_Input = 0.24;
let Value_Input = 1;

var Hue_Slider_Container_Start_Tolerance = 1;
var Hue_Slider_Container_Height = 203;

function Initial_Positions(){  
  let Initial_Hue = 349/360;
  let Initial_Saturation = 0.24;
  let Initial_Value = 1;
  let RGB_Coordinates = HSV_To_RGB(Initial_Hue,100,100);
  let RGB_String = "rgb(" + String(RGB_Coordinates.r) + "," + String(RGB_Coordinates.g) + "," + String(RGB_Coordinates.b) + ")";
  let Canvas = document.getElementById('Canvas');
  Canvas.style.backgroundColor = 'pink';
  let Root = document.querySelector(':root');
  Root.style.setProperty('--Hue_Colour',RGB_String);
  let Saturation_Value_Selector_Plane = document.getElementById('Colour_Picker');
  let Plane_Width = parseFloat(window.getComputedStyle(Saturation_Value_Selector_Plane).getPropertyValue('width'));
  
  let Hue_Slider_Position = Initial_Hue*Hue_Slider_Container_Height - Hue_Slider_Container_Start_Tolerance;  
  let Hue_Slider = document.getElementById('Slider_Handle');
  Hue_Slider.style.top = Hue_Slider_Position + "px";
  
  let Saturation_Position_X = Initial_Saturation*Plane_Width;
  let Saturation_Value_Selector = document.getElementById('Saturation_Value_Selector');
  Saturation_Value_Selector.style.left = Saturation_Position_X + "px";
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

function Pick_Background_Colour(){
  var Panel = document.getElementsByClassName('Canvas_Colour_Panel')[0];  
  Panel.classList.remove('Expand_Animation_1');
  void Panel.offsetWidth;
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Colour_Panel_Animation_Direction'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Colour_Panel_Animation_Direction','reverse');
    Panel.classList.add('Expand_Animation_1');
  }
  else{
    Root.style.setProperty('--Colour_Panel_Animation_Direction','forwards');
    Panel.classList.add('Expand_Animation_1');
  }
}

function Add_New_Picture(){
  var Panel = document.getElementsByClassName('Add_Panel')[0];  
  Panel.classList.remove('Expand_Animation_2');
  void Panel.offsetWidth;
  var Root = document.querySelector(':root');
  var Direction = String(getComputedStyle(Root).getPropertyValue('--Add_Panel_Animation_Direction'));
  if(Direction == "forwards"){
    Root.style.setProperty('--Add_Panel_Animation_Direction','reverse');
    Panel.classList.add('Expand_Animation_2');
  }
  else{
    Root.style.setProperty('--Add_Panel_Animation_Direction','forwards');
    Panel.classList.add('Expand_Animation_2');
  }
}


function Window_Is_Resized(){
  var Height = parseInt(document.documentElement.clientHeight);
  if(Height < 390){
    var Root = document.querySelector(':root');
    var Direction_1 = String(getComputedStyle(Root).getPropertyValue('--Colour_Panel_Animation_Direction'));
    var Direction_2 = String(getComputedStyle(Root).getPropertyValue('--Add_Panel_Animation_Direction'));
    if(Direction_1 == "forwards"){
      document.getElementById('Canvas_Colour_Button').click();
    }
    if(Direction_2 == "forwards"){
      document.getElementById('Add_Button').click();
    }
  }
}

function Start_Moving_Hue_Selector(){
  Hue_Selector_Is_Moving = true;
}

function Stop_Moving_Hue_Selector(){
  Hue_Selector_Is_Moving = false;
}

function Moving_Hue_Target(){
  if(Hue_Selector_Is_Moving == true){
    let Mouse_Height = event.clientY; 
    let Hue_Picker = document.getElementById('Slider_Handle');
    let Hue_Picker_Bounds = Hue_Picker.getBoundingClientRect()
    let Selector_Top = Hue_Picker_Bounds.top;
    let Selector_Bottom = Hue_Picker_Bounds.bottom;
    let Selector_Height = parseInt(window.getComputedStyle(Hue_Picker).getPropertyValue('height'));
    let Hue_Container = document.getElementById('Hue_Colour_Bar');
    let Container_Bounds = Hue_Container.getBoundingClientRect();
    let Container_Top = Container_Bounds.top;
    let Container_Bottom = Container_Bounds.bottom;
    let Container_Height = parseInt(window.getComputedStyle(Hue_Container).getPropertyValue('height'));
    let Relative_Top_Position = Mouse_Height-Container_Top;
    let Resultant_Position = Relative_Top_Position - Selector_Height*2
    if(Resultant_Position < -Hue_Slider_Container_Start_Tolerance){
      Resultant_Position = -Hue_Slider_Container_Start_Tolerance;
    }
    if(Resultant_Position >= Hue_Slider_Container_Height-Hue_Slider_Container_Start_Tolerance){
      Resultant_Position = Hue_Slider_Container_Height-Hue_Slider_Container_Start_Tolerance;
    }
    Hue_Picker.style.top = Resultant_Position + "px";
  
  let Hue_Value = Resultant_Position + 1;
  let Hue_Percentage = (Hue_Value/Hue_Slider_Container_Height);
  Colour_Tile_Colour(Hue_Percentage)
}
}

function Colour_Tile_Colour(Hue_Percentage){
  let Normalization_Factor = 100;
  let H = parseFloat(Hue_Percentage);
  let S = parseFloat(100/Normalization_Factor);
  let V = parseFloat(100/Normalization_Factor);
  let RGB_Coordinates = HSV_To_RGB(H,S,V);
  let RGB_String = "rgb(" + String(RGB_Coordinates.r) + "," + String(RGB_Coordinates.g) + "," + String(RGB_Coordinates.b) + ")";
  var Brightness_Tile = document.getElementById('Colour_Picker');
  Brightness_Tile.style.backgroundColor = RGB_String;
  var Root = document.querySelector(':root');
  Root.style.setProperty('--Hue_Colour',RGB_String);
  Hue_Input = H;
  Push_Selected_Colour_To_Background(Hue_Input,Saturation_Input,Value_Input);
}

function Start_Moving_Saturation_Value_Selector(){
  Saturation_Value_Selector_Is_Moving = true;
}

function Stop_Moving_Saturation_Value_Selector(){
  Saturation_Value_Selector_Is_Moving = false;
}

function Moving_Saturation_Value_Selector(){
  if(Saturation_Value_Selector_Is_Moving == true){    
    let Selector_Plane = document.getElementById('Colour_Picker');
    let Selector_Plane_Height = parseFloat(window.getComputedStyle(Selector_Plane).getPropertyValue('height'));
    let Selector_Plane_Width = parseFloat(window.getComputedStyle(Selector_Plane).getPropertyValue('width'));
    let Selector_Bounds = Selector_Plane.getBoundingClientRect();
    let Bounds_Top = Selector_Bounds.top;
    let Bounds_Bottom = Selector_Bounds.bottom;
    let Bounds_Left = Selector_Bounds.left;
    let Bounds_Right = Selector_Bounds.right;
    let Selector = document.getElementById('Saturation_Value_Selector');
    let Selector_Height = parseFloat(window.getComputedStyle(Selector).getPropertyValue('height'));
    let Mouse_Position_X = event.clientX;
    let Mouse_Position_Y = event.clientY;     
    let Top_Position = Mouse_Position_Y - Bounds_Top;
    let Left_Position = Mouse_Position_X - Bounds_Left;
    let Plane_Position_Y = Top_Position - Selector_Height;
    let Plane_Position_X = Left_Position - Selector_Height;  
    let Top_Limit = 0, Bottom_Limit = Selector_Plane_Height - Selector_Height, Left_Limit = 0, Right_Limit = Selector_Plane_Width - Selector_Height;
    if(Plane_Position_Y <= Top_Limit){
      Plane_Position_Y = Top_Limit;
    }
    if(Plane_Position_Y >= Bottom_Limit){
      Plane_Position_Y = Bottom_Limit;
    }
    if(Plane_Position_X <= Left_Limit){
      Plane_Position_X = Left_Limit;
    }            
    if(Plane_Position_X >= Right_Limit){
      Plane_Position_X = Right_Limit;
    }
    Selector.style.top = Plane_Position_Y + "px";
    Selector.style.left = Plane_Position_X + "px";  
    var Saturation_Percentage = Plane_Position_X/Right_Limit;
    var Value_Percentage = 1 - (Plane_Position_Y/Bottom_Limit);
    Saturation_Input = Saturation_Percentage;
    Value_Input = Value_Percentage;  
    Push_Selected_Colour_To_Background(Hue_Input,Saturation_Input,Value_Input);
  }
}

function Push_Selected_Colour_To_Background(H,S,V){
  let HSV_String = "HSV(" + String(parseInt(H*100)/100) + "," + String(parseInt(S*100)/100) + "," + String(parseInt(V*100)/100) + ")";  
  RGB_Coordinates = HSV_To_RGB(H,S,V);
  let RGB_String = "rgb(" + String(RGB_Coordinates.r) + "," + String(RGB_Coordinates.g) + "," + String(RGB_Coordinates.b) + ")";
  var Canvas = document.getElementById('Canvas');
  Canvas.style.backgroundColor = RGB_String;
  document.body.style.backgroundColor = RGB_String;
}



























