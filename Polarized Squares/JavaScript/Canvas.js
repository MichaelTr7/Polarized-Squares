
window.onload = function(){
  
  // Setting canvas height 
  var Screen_Height = String(window.screen.height);
  var Screen_Width = String(window.screen.width);
  var Canvas = document.getElementById('Canvas');
  Canvas.style.height = Screen_Height + "px";
  Canvas.style.width = Screen_Width + "px";
  
  Canvas.style.height = "100%";
  Canvas.style.width = "100%";
  
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
  // document.getElementsByClassName('Polarized_Square')[0].addEventListener("click",Toggle_Controls);


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

function Add_Picture(){
  console.log("Add Picture");
  
  let Canvas = document.getElementById('Canvas');
  let New_Picture_Film = document.createElement('div');
  New_Picture_Film.classList.add('Polarized_Square');
  Canvas.appendChild(New_Picture_Film);

  let New_Picture = document.createElement('div');
  New_Picture.classList.add('Picture_Square');
  New_Picture_Film.appendChild(New_Picture);

  let Drop_Label = document.createElement('div');
  Drop_Label.classList.add('Add_Picture_Prompt');
  Drop_Label.innerHTML = "Drag and Drop Picture<br>Here to Add";
  New_Picture.appendChild(Drop_Label);

  let Move_Handle = document.createElement('div');
  Move_Handle.classList.add('Move_Handle');
  Move_Handle.classList.add('Modify_Handles');
  let Rotate_Handle = document.createElement('div');
  Rotate_Handle.classList.add('Rotate_Handle');
  Rotate_Handle.classList.add('Modify_Handles');
  let Resize_Handle = document.createElement('div');
  Resize_Handle.classList.add('Size_Handle');
  Resize_Handle.classList.add('Modify_Handles');
  let Trash_Handle = document.createElement('div');
  Trash_Handle.classList.add('Trash_Handle');
  Trash_Handle.classList.add('Modify_Handles');
  Trash_Handle.addEventListener("click",Delete_Picture);
  Move_Handle.addEventListener("mousedown",Start_Moving_Picture);
  document.addEventListener("mousemove",Move_Picture);
  Resize_Handle.addEventListener("mousedown",Start_Resizing_Picture);
  document.addEventListener("mousemove",Resizing_Picture);
  
  New_Picture_Film.appendChild(Move_Handle);
  New_Picture_Film.appendChild(Rotate_Handle);
  New_Picture_Film.appendChild(Resize_Handle);
  New_Picture_Film.appendChild(Trash_Handle);

  New_Picture_Film.addEventListener("click",Toggle_Controls);
  let Number_Of_Pictures = document.getElementsByClassName('Polarized_Square').length;
  New_Picture_Film.id = "Picture_Number_" + String(Number_Of_Pictures);
}


function Add_Text_Box(){
  console.log("Add Text Box");
}


function Screenshot_Canvas(){
  console.log("Screenshot Canvas");
}



function Toggle_Controls(){  
  let Toggle_Controls = this.children;
  Focussed_Picture = this.id;
  let All_Pictures = document.getElementsByClassName('Polarized_Square');
  for(Picture_Index = 0; Picture_Index < All_Pictures.length; Picture_Index++){
   let Picture_ID = String(All_Pictures[Picture_Index].id);
    if(Picture_ID != Focussed_Picture){
    var Nodes = All_Pictures[Picture_Index].children;
    for(Index = 1; Index < Nodes.length; Index++){
      Nodes[Index].style.display = "none";      
    }
    }
  }
  for(Index = 1; Index < Toggle_Controls.length; Index++){
  let State = String(window.getComputedStyle(Toggle_Controls[Index]).getPropertyValue('display'));
  if(State == "none"){
    Toggle_Controls[Index].style.display = "block";
  }else{
    Toggle_Controls[Index].style.display = "none";
  }
  }
}

var Picture_Is_Moving = false;
var Focussed_Picture = "";

function Start_Moving_Picture(){
  Picture_Is_Moving = true;
}

function Stop_Moving_Picture(){
  Picture_Is_Moving = false;
}

function Move_Picture(){
  if(Picture_Is_Moving == true){    
    let Mouse_Position_X = event.clientX; 
    let Mouse_Position_Y = event.clientY;
    let Picture = document.getElementById(Focussed_Picture);
    Picture.style.left = Mouse_Position_X + "px";
    Picture.style.top = Mouse_Position_Y + "px";
    let Picture_Bounds = Picture.getBoundingClientRect();
    let Picture_Top = Picture_Bounds.top;
    let Picture_Bottom = Picture_Bounds.bottom;
    let Picture_Left = Picture_Bounds.left;
    let Picture_Right = Picture_Bounds.right;
    let Picture_Height = Math.abs(Picture_Top - Picture_Bottom);
    let Picture_Width = Math.abs(Picture_Right - Picture_Left);
    let Window_Width = window.innerWidth;
    let Window_Height = window.innerHeight;
    if(Picture_Left <= 0){
      Picture.style.left = 0 + "px";
    }    
    if(Picture_Right >= Window_Width){
      Picture.style.left = Window_Width - Picture_Width + "px";
    }
    let Navigation_Bar_Bounds = document.getElementById('Navigation_Bar').getBoundingClientRect();
    let Navigation_Bar_Bottom = Navigation_Bar_Bounds.bottom;
    if(Picture_Top <= Navigation_Bar_Bottom){
      Picture.style.top = Navigation_Bar_Bottom + "px";
    }
    if(Picture_Bottom >= Window_Height){
      Picture.style.top = Window_Height - Picture_Height + "px";
    }
  }  
}

function Delete_Picture(){
  document.getElementById(Focussed_Picture).remove();
}

var Picture_Is_Resizing = false;

function Start_Resizing_Picture(){
  Picture_Is_Resizing = true;
}

function Stop_Resizing_Picture(){
  Picture_Is_Resizing = false;
}

function Resizing_Picture(){
  if(Picture_Is_Resizing == true){
  console.log("Resizing picture");  
    
    
    
    
  }
}

















