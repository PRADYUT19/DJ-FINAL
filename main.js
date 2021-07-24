song = "";
function preload() {

    song = loadSound("music.mp3");

}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function setup() {

    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();


    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);

}

function modelLoaded() {

    console.log("poseNet Is Initialized")

}

function gotposes(results) {

    if (results.length > 0) {

        // console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        // console.log("scoreLeftWrist = " + scoreLeftWrist)
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    }

}

function draw() {

    image(video, 0, 0, 600, 500);
    fill("#ffff00");
    stroke("#000000");
    if (scoreRightWrist > 0.2) {

        circle(rightWristX, rightWristY, 30);
        if (rightWristY > 0 && rightWristY <= 100) {

            document.getElementById("speed").innerHTML = "Speed = 0.5x";

            song.rate(0.5);

        }

        else if (rightWristX > 100 && rightWristY <= 200) {

            document.getElementById("speed").innerHTML = "speed = 1x"

            song.rate(1);

        }

        else if (rightWristX > 200 && rightWristY <= 300) {

            document.getElementById("speed").innerHTML = "speed = 1.5x"

            song.rate(1.5);

        }

        else if (rightWristX > 300 && rightWristY <= 400) {

            document.getElementById("speed").innerHTML = "speed = 2x"

            song.rate(2);

        }

        else if (rightWristX > 400 && rightWristY <= 500) {

            document.getElementById("speed").innerHTML = "speed = 2.5x"

            song.rate(2.5);

        }
        
        else if (rightWristX > 500 ) {

            document.getElementById("speed").innerHTML = "speed = 3x"

            song.rate(3);

        }

    }
    if (leftWristY > 0.2) {
        circle(leftWristX, leftWristY, 30);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }

}

function play() {

    song.play();
    song.setVolume(1);
    song.rate(1);


}

