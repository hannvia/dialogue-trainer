class Trainer {

    constructor() {
        // 100 denotes not selected, 99 denotes random 
        this.selectedPosture = 100;
    };

    setSelectedPosture(postureIndex) {
        // come back and update this random later
        const selectedPosture = postureIndex != 99 ? postureIndex : Math.floor(Math.random() * 3);
        this.selectedPosture = selectedPosture;
    };

};

// initialize trainer
//
const trainer = new Trainer();

// select posture, activity, or stress 
//
function selectPosture(postureIndex) {
    trainer.setSelectedPosture(postureIndex);
    renderPractice();
};

// render activity based on selected posture and activity
//
function renderPractice() {
    if (trainer.selectedPosture != 100) {
        showDialogue(trainer.selectedPosture);
    };
};

// for Activity 0, Show Dialogue
//
function showDialogue(postureIndex) {
    let dialogue = "";
    for (let i = 0; i < content[postureIndex]["postureNumLines"]; i++) {
        dialogue += "<b>" + (i < 9 ? "&nbsp;" : "") + (i + 1).toString() + ".&nbsp;&nbsp;</b>" + content[postureIndex]["postureContent"]["lines"][i] + "<br>";
    }
    document.getElementById("show-dialogue-container").innerHTML = "<p>" + dialogue + "</p>";    
};



// data for all the dialogue for all the postures 
//
const content = {
    0: {
        "postureName": "halfMoonSidebend",
        "postureNumLines": 26,
        "postureSections": [[0,25], [0,8], [9,20], [21,25]],
        "postureContent": {
            "lines": {
                0: "Everybody together. Feet together, heels and toes touching each other.",
                1: "Arms over your head sideways, Palms together",
                2: "Interlock your fingers, Release your index fingers, Thumbs crossed",
                3: "Keep a nice and tight grip, Don't lose the grip",
                4: "Hands palms touch each other like glue, Up to the wrists, Throughout the entire posture",
                
                5: "Stretch up to the ceiling, Right and left several times, Right and left and right and left",
                6: "You should feel stretching down both sides of the body, All the way up to the fingertips",
                7: "In other words, You are trying to touch the ceiling.",
                8: "When you can’t stretch anymore, Stop in the middle",
                
                9: "Elbows locked, Arms always touching the ears, No gap between biceps-arms and ears",
                10: "Push your hips forward, A little bit towards the mirror, Opening up your hips and pelvis",
                11: "Lean your upper body back a couple of inches, Opening up your chest and ribcage",
                12: "Throughout the posture, Keep maximum weight on the heels",
                13: "Arms and head back, Chin up",
                14: "Concentrate one point in the mirror, Don’t even blink your eyes",
                
                15: "Inhale breathing, Full lungs, Hold the breathing",
                16: "Stretch up out of your waist one more time, Try to touch the ceiling",
                17: "In an absolutely straight line, Slowly bend your body to the right, Without bending your elbows or your knees",
                18: "Continuously push your hips to the left, Beyond your flexibility",
                19: "You are trying to create a tremendous stretching feeling, Along the left side of your body",
                20: "All over, Inside out, Bones to skin, Fingertips to your toes",
                
                21: "Hips more forward, Upper body back more, Weight in the heels",
                22: "Push your left hip forward, Get your two hips in one line",
                23: "Right shoulder forward more, Opening up your chest like a flower petal blooming",
                
                24: "Come down and push, And push, And push",
                25: "Inhale breathing, Come back up, Stop in the middle"
                },
            },
        },
    1: {
        "postureName": "halfMoonBackbend",
        "postureNumLines": 13,
        "postureSections": [[0,12], [0,2], [3,7], [8,12]],
        "postureContent": {
            "lines": {
                0: "Next is backward bending",
                1: "Take a deep breath, Full lungs",
                2: "Drop your head back as far as it goes, Look at the floor behind you",
                
                3: "Arms back immediately, Try to touch the wall behind you",
                4: "Bend your spine backwards, Coccyx to the neck",
                5: "Lower back, Middle back, Upper back, Total spine backward bending",
                6: "Push your upper body back, Try to fall down backwards",
                7: "Maximum body weight in the heels",
                
                8: "Inhale breathing, Push your stomach, Legs, Hips, Thighs", 
                9: "Everything forward toward the mirror",
                10: "Arms back, Look back, Fall back, Way back, Go back, More back",
                
                11: "Inhale breathing, Come back up, Stop in the middle", 
                12: "Keep your arms there",
            },
        },
    },
};
