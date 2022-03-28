Webcam.set({
    width: 350,
    height: 300,
    img_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera")

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Z22pOOnOC/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function check() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult)
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction_1;
    var UtterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(UtterThis);
}

function gotResult(error, results) {
    if (error) {
        console.log('error')
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        document.getElementById("result_emoji_name").innerHTML = prediction_1;
        speak();
        if (prediction_1 == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if (prediction_1 == "Best") {
          document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if (prediction_1 == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
    }
}