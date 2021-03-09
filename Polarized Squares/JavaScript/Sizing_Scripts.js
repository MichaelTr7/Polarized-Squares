
var Picture_Is_Moving = false;
var Picture_Is_Resizing = false;
var Picture_Is_Rotating = false;
var Focussed_Picture = "";

function Sample_Colour_Chosen(){
    let Colour_Button = this;
    let Chosen_Colour = String(window.getComputedStyle(Colour_Button).getPropertyValue('background-color'));
    let Canvas = document.getElementById('Canvas');
    Canvas.style.backgroundColor = Chosen_Colour;
}

function Add_Picture(){
  let Canvas = document.getElementById('Canvas');
  let New_Picture_Film = document.createElement('div');
  New_Picture_Film.classList.add('Polarized_Square');
  document.body.appendChild(New_Picture_Film);
  let New_Picture = document.createElement('div');
  New_Picture.classList.add('Picture_Square');
  New_Picture_Film.appendChild(New_Picture);
  let Drop_Label = document.createElement('div');
  Drop_Label.classList.add('Add_Picture_Prompt');
  Drop_Label.innerHTML = "Drag and Drop Image<br>Into to Frame";
  New_Picture.appendChild(Drop_Label);

  let New_Drop_Zone = document.createElement('div');
  New_Drop_Zone.classList.add('Drop_Zone');
  New_Picture.appendChild(New_Drop_Zone);
  New_Drop_Zone.addEventListener("dragenter",Entered_Drop_Zone);
  New_Drop_Zone.addEventListener("dragleave",Left_Drop_Zone);
  New_Drop_Zone.addEventListener("drop",Dropped_Image_File);
  
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
  Resize_Handle.addEventListener("mousedown",Start_Resizing_Picture);
  Rotate_Handle.addEventListener("mousedown",Start_Rotating);
  New_Picture_Film.appendChild(Move_Handle);
  // New_Picture_Film.appendChild(Rotate_Handle);
  New_Picture_Film.appendChild(Resize_Handle);
  New_Picture_Film.appendChild(Trash_Handle);
  New_Picture_Film.addEventListener("dblclick",Toggle_Controls);
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

function Start_Resizing_Picture(){
  Picture_Is_Resizing = true;
}

function Stop_Resizing_Picture(){
  Picture_Is_Resizing = false;
}

function Resizing_Picture(){
  if(Picture_Is_Resizing == true){    
  let Picture = document.getElementById(Focussed_Picture);
  let Picture_Bounds = Picture.getBoundingClientRect();
  let Picture_Top = Picture_Bounds.top;
  let Picture_Bottom = Picture_Bounds.bottom;
  let Picture_Left = Picture_Bounds.left;
  let Picture_Right = Picture_Bounds.right;  
  let Picture_Width = Picture_Bounds.width;
  let Picture_Height = Picture_Bounds.height;
  let Centre_Picture_X = Picture_Left + Picture_Width/2;
  let Centre_Picture_Y = Picture_Top + Picture_Height/2;
  let Mouse_Position_X = event.clientX;
  let Mouse_Position_Y = event.clientY;
  let Reference_Magnitude = Math.sqrt(Math.pow(Picture_Width/2,2) + Math.pow(Picture_Height/2,2));
  let X_Displacement = Math.abs(Mouse_Position_X - Centre_Picture_X);
  let Y_Displacement = Math.abs(Centre_Picture_Y - Centre_Picture_Y);
  let New_Magnitude = Math.sqrt(Math.pow(X_Displacement,2) + Math.pow(Y_Displacement,2));
  let Scaling_Factor = New_Magnitude/Reference_Magnitude;
  let New_Width = Mouse_Position_X - Picture_Left;
  let Scaling_Factor_2 = New_Width/Picture_Width;
  let New_Height = Scaling_Factor_2*Picture_Height;
  if(New_Width >= 160 && New_Width <= 400){
    Picture.style.height = New_Height + "px";
    Picture.style.width = New_Width + "px";
  }
  }
}

function Start_Rotating(){
  Picture_Is_Rotating = true;
}

function End_Rotating(){
  Picture_Is_Rotating = false;
}

function Rotating_Picture(){
  if(Picture_Is_Rotating == true){
    let Mouse_Position_X = event.clientX;
    let Mouse_Position_Y = event.clientY;
    let Picture = document.getElementById(Focussed_Picture);
    let Picture_Bounds = Picture.getBoundingClientRect();
    let Picture_Top = Picture_Bounds.top;
    let Picture_Bottom = Picture_Bounds.bottom;
    let Picture_Left = Picture_Bounds.left;
    let Picture_Right = Picture_Bounds.right;  
    let Picture_Width = Picture_Bounds.width;
    let Picture_Height = Picture_Bounds.height;
    let Centre_Picture_X = Picture_Left + Picture_Width/2;
    let Centre_Picture_Y = Picture_Top + Picture_Height/2;
    let X_Displacement = Mouse_Position_X - Centre_Picture_X;
    let Y_Displacement = Centre_Picture_Y - Mouse_Position_Y;
    let Angle_In_Radians = Math.atan(Y_Displacement/X_Displacement);
    let Angle_In_Degrees = Angle_In_Radians*(180/Math.PI);
  }
}

function Entered_Drop_Zone(){
  let Canvas_Colour = window.getComputedStyle(document.getElementById('Canvas')).getPropertyValue('background-color');
  this.style.borderColor = Canvas_Colour;
}

function Left_Drop_Zone(){
  this.style.borderColor = "gray";
}





function Dropped_Image_File(){
  console.log("Dropped Image File");
  


}














