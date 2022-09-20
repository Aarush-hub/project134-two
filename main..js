objects=[];
status="";
song="";

function preload(){
song=loadSound("alert_alert.mp3");
}

function setup()
{
 canvas=createCanvas(380,380);
 canvas.center();
 video= createCapture(VIDEO);
 video.size(380,380);
 video.hide();
 objectDetector = ml5.objectDetector('cocossd',modelLoaded);
 document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
  console.log("ModelLoaded");
  status=true;
}


function gotResult(error,results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects=results;
    }


function draw()
{     
  image(video,0,0,380,380);

  if (status !="")
  {
  objectDetector.detect( video, gotResult);
  for(i=0; i<objects.length; i++)
  {
   document.getElementById("status").innerHTML="Status: Object Detected";
   document.getElementById("babyfoundnot").innerHTML="Baby found";
   fill("#FF0000")
   percent= floor(objects[i].confidence*100);
   text(objects[i].label + "" +  percent +"%",objects[i].x+15,objects[i].y+15);
   noFill();
   stroke("#FF0000");
   rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
   if(objects[i].label=="person"){
  document.getElementById("babyfoundnot").innerHTML="Baby found";
  console.log("stop");
  song.stop();
   }
  else{
  
  document.getElementById("babyfoundnot").innerHTML="Baby not found";
  song.play();
  }
}
}
 if(objects.length==0){
document.getElementById("babyfoundnot").innerHTML="Baby not found";
console.log("play");
song.play();
}
} 

