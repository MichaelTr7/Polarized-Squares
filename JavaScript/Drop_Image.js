function Dropped_Image(e) {
  e.stopPropagation();
  e.preventDefault();
  this.style.border = "0 solid rgba(0,0,0,0)";
  var Image_File = e.dataTransfer.files[0]; 
  this.parentElement.style.color = "rgba(0,0,0,0)";
  if(Image_File){
  Convert_To_Base_64(Image_File).then(Base_64_Representation => {$(this)[0].src = Base_64_Representation;
  // this.parentElement.style.backgroundImage = "url('" + String(Base_64_Representation) + "')";
  // this.classList.add('Backdrop_Blur');
  this.parentElement.style.backgroundColor = "rgb(250,250,250)";
  });
  }
}

function Convert_To_Base_64(file) {
let File_Reader_Promise = new Promise(resolve => {
  var reader = new FileReader();
  reader.onload = function(e){resolve(e.target.result);};
  reader.readAsDataURL(file);
  });
  return File_Reader_Promise;
};

function Prevent_Default(e) {
  e.stopPropagation();
  e.preventDefault();
  return false;
}

function Show_Border(){
  var Root = document.querySelector(':root');
  var Canvas_Colour = String(getComputedStyle(Root).getPropertyValue('--Canvas_Colour'));
  this.style.border = "0.5rem solid" + Canvas_Colour;
}

function Hide_Border(){
  this.style.border = "0 solid rgba(0,0,0,0)";
}



