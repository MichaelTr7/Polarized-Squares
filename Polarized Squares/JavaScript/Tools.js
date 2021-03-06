
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





