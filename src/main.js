if(!window.localStorage.list)
{
  window.localStorage.list = "";
}

let content = document.querySelector(".video-shower");
let inputValue = document.querySelector(".select-input").value;

function playFromList(event){
  let songName = event.target.childNodes[0].innerHTML;
  songName.trim();
  let localStore = window.localStorage.list;
  //alert(localStore+" "+songName+"   "+localStore.indexOf(songName,0));
  localStore = localStore.substr(0,localStore.length-1);
  let newLocalStore = localStore.split(";");
  let final = "";
  let address = newLocalStore.indexOf(songName)+1;
  //alert("/"+newLocalStore[0]+"/  "+newLocalStore.indexOf(songName));
  /*alert(window.localStorage.list);
  alert(localStorage.length+" "+address);*/
  //alert(address);
  if(address <= 0)
  {
    address = localStore.indexOf(songName)+1;  
  }
  final = newLocalStore[address];
  document.querySelector(".video-shower").style.display = "block";
  document.querySelector(".fav-showing").style.display = "none";
  document.querySelector(".fav-showing").innerHTML = "";
  document.querySelector(".fav-submit").innerHTML = "My favourites list"; 
  if(final.indexOf("youtube") !== -1 && final.indexOf("embed") != -1)
  {
    content.src = final;
  }
  else if(final.indexOf("youtube") !== -1 && final.indexOf("embed") === -1)
  {
    
    final = final.replace("watch?v=","embed/");
    content.src = final;
  }
  else
  {
    content.src = final;
  }
  
}


document.querySelector(".main-load").addEventListener("click",function(){
  inputValue = document.querySelector(".select-input").value;
  if(inputValue.indexOf("&") !== -1)
  {
    inputValue = inputValue.substr(0,inputValue.indexOf("&"));
  }
  
  if(inputValue.indexOf("youtube") !== -1 && inputValue.indexOf("embed") != -1)
  {
    content.src = inputValue;
  }
  else if(inputValue.indexOf("youtube") !== -1 && inputValue.indexOf("embed") === -1)
  {
    
    inputValue = inputValue.replace("watch?v=","embed/");
    content.src = inputValue;
  }
  else
  {
    content.src = inputValue;
  }
  
});

document.querySelector(".add-submit").addEventListener("click",function(){
  let name = prompt("Enter the name of this bookmark");
  name.trim();
  while(name.length == 0)
  {
    name = prompt("Enter the name of this bookmark");
    name.trim();
  }
  inputValue = document.querySelector(".select-input").value;
  if(inputValue.length > 0)
  {
    let storeForCheck = window.localStorage.list;
    if(storeForCheck.indexOf(name) !== -1)
    {
      name = prompt("This name is already taken. Enter the name of this bookmark");
      name.trim();
      while(storeForCheck.indexOf(name) !== -1 )
      {
        name = prompt("This name is already taken. Enter the name of this bookmark");
        name.trim();
      }
      while(name.length == 0)
      {
        name = prompt("Enter the name of this bookmark");
        name.trim();
      }
    }
    window.localStorage.setItem("list", window.localStorage.list+name+";"+inputValue+";");
  }
  
});

document.querySelector(".fav-submit").addEventListener("click",function(){
  let btnContent = document.querySelector(".fav-submit").innerHTML;
  btnContent.trim();
  if(btnContent == "My favourites list")
  {
    let local = window.localStorage.list;
    local = local.substr(0,local.length-1);
    local = local.split(";");
    let final = "";
    for(var i = 0 ; i < local.length-1; i+=2)
    {
      final+="<div class = 'fav-row'><span class = 'fav-name'>"
      +local[i]+
      "</span></div>";
      //<button class = 'select-submit row-submit' type = 'submit'>Load video</button>
    }
    document.querySelector(".video-shower").style.display = "none";
    document.querySelector(".fav-showing").style.display = "block";
    document.querySelector(".fav-showing").innerHTML = final;
    document.querySelector(".fav-submit").innerHTML = "Hide favourites list";
    let rowList = document.getElementsByClassName("fav-row");
    for(let i = 0 ; i < rowList.length; i++)
    {
      rowList[i].addEventListener("click",function(event){
        playFromList(event);
      });
    }
    
  }
  else
  {
    document.querySelector(".video-shower").style.display = "block";
    document.querySelector(".fav-showing").style.display = "none";
    document.querySelector(".fav-showing").innerHTML = "";
    document.querySelector(".fav-submit").innerHTML = "My favourites list";  
  }
});