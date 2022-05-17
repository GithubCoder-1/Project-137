status1 = "";
inputed_object_name = [];
objects = [];

function preload()
{

}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    inputed_object_name = document.getElementById("object_name_input").value;

}

function modelLoaded()
{
    console.log("Model Loaded");
    status1 = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }   
    
    console.log(results)

    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status1 != "")
    {
        objectDetector.detect(video, gotResult)

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Detecting Objects ..."
            
            fill("#FF0000");
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            percentage = floor(objects[i].confidence*100);
            text(objects[i].label + "  " + percentage + " % " + objects[i].x, objects[i].y);

            
        if(objects[i].label == inputed_object_name)
        {
            document.getElementById("status").innerHTML = "Inputed Object Is Found!";
            video.stop();
        }
        else
        {
            document.getElementById("status").innerHTML = " Inputed Object Is Not Found";
        }

        }

    }

}