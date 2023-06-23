class Trainer {

    constructor() {
        // 100 denotes not selected, 99 denotes random 
        this.selectedPosture = 100;
        this.selectedActivity = 100;

        // default section is 0 which shows entire posture
        this.selectedSection = 0;

        // for specific activities
        this.incrementIndex = 0;

        // for strategies, 100 denotes not selected 
        this.selectedStrategy = 100;
    };

    setSelectedPosture(postureIndex) {
        const selectedPosture = postureIndex != 99 ? postureIndex : Math.floor(Math.random() * 31);
        this.selectedPosture = selectedPosture;
    };

    setSelectedActivity(activityIndex) {
        // come back and update this random later
        const selectedActivity = activityIndex != 99 ? activityIndex : Math.floor(Math.random() * 2);
        this.selectedActivity = selectedActivity;
    };

    setSelectedSection(sectionIndex) {
        this.selectedSection = sectionIndex;
    };

    // for specific activities 
    increment() {
        this.incrementIndex += 1;
    };
    refresh() {
        this.incrementIndex = 0;
    };

};

// initialize trainer
//
const trainer = new Trainer();

// select posture, activity, or strategy 
//
function selectPosture(postureIndex) {
    trainer.setSelectedPosture(postureIndex);
    renderPractice();
};
function selectActivity(activityIndex) {
    trainer.setSelectedActivity(activityIndex);
    renderPractice();
};
function selectSection(sectionIndex) {
    trainer.setSelectedSection(sectionIndex);
    renderPractice();
};

// for specific activities 
function incrementClick() {
    // if you ever store selected posture num lines (or calculate it) can do check here 
    trainer.increment();
    renderPractice();
};
function refreshClick() {
    trainer.refresh();
    renderPractice();
};


// text that describes what posture and activity are selected
//
function generateSelectionText() {
    const activity = activityMap[trainer.selectedActivity]["name"];
    const posture = content[trainer.selectedPosture]["posturePrintName"]
    const section = sectionMap[trainer.selectedSection];
    
    const styleStringOpen = "<span style='text-transform:uppercase;font-weight:bold'>";
    const styleStringClose = "</span>";
    const divider = "<br><br>";
    
    const selectionText = styleStringOpen + "ACTIVITY: " + activity + "; &nbsp;POSTURE: " + posture + "; &nbsp;SECTION: " + section + styleStringClose + divider;
    
    document.getElementById("selection-text").innerHTML = selectionText; 
};


function clearPractice() {
    // clears practice section
    document.getElementById("show-dialogue-container").innerHTML = ""; 
    document.getElementById("increment-container").innerHTML = ""; 
};


// render activity based on selected posture and activity
//
function renderPractice() {
    clearPractice();
    generateSelectionText();
    
    if (trainer.selectedPosture != 100) {
        if (trainer.selectedActivity == 0) {
            showDialogue(trainer.selectedPosture);
        } else if (trainer.selectedActivity == 1) {
            increment(trainer.selectedPosture);
        }
    };
};

// for Activity 0, Show Dialogue
//
function showDialogue(postureIndex) {
    const startIndex = content[postureIndex]["postureSections"][trainer.selectedSection][0];
    const endIndex = content[postureIndex]["postureSections"][trainer.selectedSection][1];
    let dialogue = "";
    for (let i = startIndex; i < endIndex + 1; i++) {
        dialogue += "<b>" + (i < 9 ? "&nbsp;" : "") + (i + 1).toString() + ".&nbsp;&nbsp;</b>" + content[postureIndex]["postureContent"]["lines"][i] + "<br>";
    }
    document.getElementById("show-dialogue-container").innerHTML = "<p>" + dialogue + "</p>";    
};

// for Activity 1, Increment
//
// if you click away to another activity and come back, you'll still be on your current increment
function increment(postureIndex) {
    let dialogue = "";
    let endIndex = trainer.incrementIndex;
    let incrementButtonsContainer = `
    <div
        id="increment-buttons-container"
        style="
            display: flex;
            background-color: #D8E6AC;
            margin: 10px;
            border-radius: 15px;
            height: 64px;
            width: 200px;
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 6px;"
    >
        <div 
            onclick="incrementClick()"
            id="increment-button"
            style="height: 20px;
                border-radius: 16px;
                margin: 10px 5px;
                padding: 8px 10px;
                width: 80px;
                border: 2px solid;
                background-color: #ABC84A;
            "
        >
            <p style="margin:-2px; font-size:16px;">Increment</p>
        </div>
        <div 
            onclick="refreshClick()"
            id="increment-button"
            style="height: 20px;
                border-radius: 16px;
                margin: 10px 5px;
                padding: 8px 10px;
                width: 60px;
                border: 2px solid;
                background-color: #ABC84A;
            "
        >
            <p style="margin:-2px; font-size:16px;">Refresh</p>
        </div>
    </div>
    `;
    for (let i = 0; i < Math.min(endIndex + 1, content[postureIndex]["postureNumLines"]); i++) {
        dialogue += "<b>" + (i < 9 ? "&nbsp;" : "") + (i + 1).toString() + ".&nbsp;&nbsp;</b>" + content[postureIndex]["postureContent"]["lines"][i] + "<br>";
    }
    document.getElementById("increment-container").innerHTML = 
        incrementButtonsContainer + "<p>" + dialogue + "</p>";    
};




// maps
//
const sectionMap = {
    0: "All",
    1: "Setup",
    2: "Execute",
    3: "Alignment",
    4: "Exit",
};
const activityMap = {
    0: {
        "name": "Show Dialogue",
        "description": "See the entire dialogue for the given posture. \
            Good for reviewing.",
    },
    1: {
        "name": "Increment",
        "description": "Sometimes it's easier to break things down and take the postures one line at a time. \
            Press the Increment button to add a new line. \
            Press Refresh to clear all lines but the first one.",
    },
    2: {
        "name": "Unscramble",
        "description": "You will be shown all the lines of the posture in a scrambled order. \
            You will also be given the number of lines in the posture. \
            <br><br> Next to each line is a box, fill in the box with a number from 1 to the number of lines in the posture \
            indicating its correct order. \
            <br><br>For example, 1 would be the first line, 2 would be the second, 3 would be the third, etc. \
            The numbers should be consecutive, and the largest number should indicate the last line.",
    },
    3: {
        "name": "Fill in the blanks",
        "description": "Here is the dialogue for the posture with some words missing. \
        The missing words are indicated by blanks. \
        <br><br> Fill in the blanks by typing in the correct word in each blank. \
        <br><br>(You can click the 'tab' key on your keyboard to quickly move from one blank to the next.) \
        <br><br> Spelling matters.  However, punctuation (including apostrophes) and capitalization do not matter.",
    },
    4: {
        "name": "Give me a random line",
        "description": "You will be given a line from the posture that is randomly selected. \
        <br><br>Starting from that line (including that line), type the words of the posture, \
        all the way through the end of the posture. \
        <br><br> Spelling matters. \
        However, punctuation (including apostrophes), capitalization, and spacing do not matter \
        (so you can write your answer as a single paragraph or many lines).",
    },
    5: {
        "name": "Test me on the whole thing",
        "description": "In the space below, type out the words of the entire posture. \
        <br><br> Spelling matters. \
        However, punctuation (including apostrophes), capitalization, and spacing do not matter \
        (so you can write your answer as a single paragraph or many lines).",
    },
    6: {
        "name": "Play Round Robin with me",
        "description": "The computer will provide the first line of the posture. \
        <br><br> When it is your turn, repeat the computer's last line and provide the next line, typing both lines in the text box. \
        <br><br> On the computer's turn, it will do the same - repeat your last line and provide the next line. \
        <br><br> Click the computer turn button to have the computer take its turn. \
        and click the Submit My Lines button to take your turn and submit your lines. \
        <br><br> Spelling matters.  However, punctuation (including apostrophes) and capitalization do not matter.",
    },
    99: {
        "name": "Choose for me at random!",
        "description": "",
    },
    100: {
        "name": "Unselected",
        "description": "",
    },
};




// data for all the dialogue for all the postures 
//
const content = {    
    0: {
    "postureName": "halfMoonSidebend",
    "posturePrintName": "Half Moon Sidebend",
    "postureNumLines": 26,
    "postureSections": [[0,25], [0,14], [15,20], [21,24], [25,25]],
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
        "posturePrintName": "Half Moon Backbend",
        "postureNumLines": 13,
        "postureSections": [[0,12], [0,2], [3,7], [8,10], [11,12]],
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
    2: {
        "postureName": "handsToFeet",
        "posturePrintName": "Hands to Feet",
        "postureNumLines": 22,
        "postureSections": [[0,21], [0,6], [7,14], [15,19], [20,21]],
        "postureContent": {
            "lines": {
                0: "Bend your knees, Place your hands on the floor in front of you",
                1: "Move your hips side to side, Right and left and right and left",
                2: "You just did a u-turn from backward bending to forward bending",
                3: "Your spine is not warmed up yet",
                
                4: "Bend your knees, Grab your heels from behind, Underneath your heels",
                5: "Step on all five fingers of each hand, Pinkies touch side by side",
                6: "Elbows behind your legs on the calf muscles, Nice and tight grip, Don’t lose the grip",
                
                7: "Pull on your heels as hard as possible",
                8: "Stretch your body down from the lower spine towards the floor", 
                9: "Touch your stomach on your thighs, Chest on your knees, Face on the legs below your knees",
                10: "From the side, You look like a Japanese ham sandwich, No gap anywhere",
                
                11: "Slowly push your knees back, Try to lock your knees", 
                12: "You are trying to create a tremendous stretching feeling, Pain sensation, All over, Underneath your legs, Inside out, Bones to skin, Coccyx to the toes, Coccyx to the forehead",
                13: "One day the top of your head will touch your feet",
                14: "Continuously keep pulling, Pulling is how you stretch more",
                
                15: "Pull on your heels, Push your knees back, Lock your knees",
                16: "Exhale breathing through your nose, Lock your knees",
                17: "Roll forward toward your toes, Lock your knees",
                18: "Eyes open, Touch your face to your legs",
                19: "Lock your knees, Lock your knees, Lock your knees",
                
                20: "Inhale breathing, Come back up, Stop in the middle",
                21: "Arms down by your sides",
            },
        },
    },
    3: {
        "postureName": "awkwardPart1",
        "posturePrintName": "Awkward Part 1",
        "postureNumLines": 20,
        "postureSections": [[0,19], [0,6], [7,13], [14,17], [18,19]],
        "postureContent": {
            "lines": {
                0: "Right foot step to the right, six inches apart, heels invisible behind the toes.", 
                1: "Six inches gap between toes and heels",
                2: "Don’t change your feet throughout the entire posture.",
                
                3: "Arms up parallel to the floor.",
                4: "Keep your five fingers together, touching each other.",
                5: "Elbows locked, triceps muscles nice and tight, contraction.",
                6: "Stretch your arms forward toward the mirror, you’re trying to touch the mirror.",
                
                7: "Exhale breathing.",
                8: "Suck your stomach in, hold it in.",
                9: "Sit down, feet flat position, until your hips touch the chair, spine straight to begin with, one hundred percent body weight on the heels.",
                
                10: "Lift your chest up and bend your total spine, backward bending, bring your upper body back.",
                11: "Suck your stomach in, compression of the abdominal wall, contraction of the abdominal muscles.",
                12: "Suck it in, tightening up, and hold it.",
                13: "Rib cage visible in the mirror.",
                
                14: "Open your knees, keep six inches between your toes, heels, knees, and hands.", 
                15: "Chest up. Chin up.",
                16: "Lean back. Fall back. Way back.",
                17: "You’re trying to fall down backwards.",
                
                18: "Inhale breathing and come up.",
                19: "Keep your arms there.",
            },
        },
    },
    4: {
        "postureName": "awkwardPart2",
        "posturePrintName": "Awkward Part 2",
        "postureNumLines": 12,
        "postureSections": [[0,11], [0,5], [6,7], [8,10], [11,11]],
        "postureContent": {
            "lines": {
                0: "Concentrate and meditate",
                1: "Stand up on your toes maximum like a ballet dancer.", 
                2: "Tremendous concentration, focus one point in the mirror.", 
                3: "If you blink your eyes, you might lose the balance.", 
                4: "Stretch your spine, chest, head, whole upper body, up toward the ceiling like natural human traction.", 
                5: "Imagine I am pulling your hair towards the ceiling.",
                
                6: "Sit down, on the top of the toes, spine straight position.", 
                7: "Start to finish throughout the posture, you should feel your hips and head touching the wall.",
                
                8: "Sit down halfway, until your hips touch the chair, knees up, chest up, upper body leaning back, spine straight.",
                9: "Come up higher on the toes, knees up toward the ceiling.",
                10: "Hips should not go down below the chair, you are sitting on the chair.",
                
                11: "Inhale breathing and come up, spine straight position, keep your arms there.",
            },
        },
    },
    5: {
        "postureName": "awkwardPart3",
        "posturePrintName": "Awkward Part 3",
        "postureSections": [[0,9], [0,2], [3,4], [5,7], [8,9]],
        "postureNumLines": 10,
        "postureContent": {
            "lines": {
                0: "Come up a little bit on your toes.",
                1: "Bring your knees together.",
                2: "Exhale breathing, suck your stomach in, spine straight.",
                3: "Sit down, as slow as possible, at least ten counts, all the way down, all the way down.", 
                4: "Leaning against the wall.",
                
                5: "Continuously stretch your spine towards the ceiling, half inch gap between the hips and heels.",
                6: "You’re leaning against the wall, hips and head touching the wall, no gap anywhere.", 
                7: "Keep your knees together and forward toward the mirror, thighs parallel to the floor, arms parallel to the legs, spine perfectly straight, ninety degree angle, so from the side your body looks like a box.",
                
                8: "Take a deep breath, knees together, spine straight, slowly come up.", 
                
                9: "Feet together, arms down side, and relax, don’t move.",
            },
        },
    },
    6: {
        "postureName": "eagle",
        "posturePrintName": "Eagle",
        "postureNumLines": 20,
        "postureSections": [[0,19], [0,5], [6,10], [11,18], [19,19]],
        "postureContent": {
            "lines": {
                0: "Feet together nicely, Arms over your head sideways.",
                1: "Bring your right arm under your left arm, Cross your arms at the elbows and then at the wrists.", 
                2: "Hands-palms together, Thumbs towards your face, Pinkies towards the mirror.",
                3: "If you can’t bring your palms together yet, Interlace your fingers.",
                4: "Pull your elbows down, Fingertips go below the nose.",
                5: "Fingertips should not be higher than your nose.",
                
                6: "Exhale breathing, Suck your stomach in,",
                7: "Sit down until your hips touch the chair, Upper body back, Stay down there.",
                8: "Lift your right leg up and over your left leg, as high as possible.",
                9: "Cross your legs, Twist like ropes.",
                10: "Get your right foot underneath your left calf muscle, All five toes visible in the mirror",
                
                11: "Sit down more, Twist like ropes, Upper body back,",
                12: "No gap between your ankle and calf muscle.",
                13: "Bring your knees to the right, Upper body to the left.",
                14: "Line up your feet, knees, elbows, wrists and hands, everything in one line in the mirror.",
                
                15: "If your foot comes out, Sit down more.",
                16: "If you’re losing your balance, Upper body back more.", 
                17: "Suck your stomach in, Sit down more, Elbows down more.", 
                18: "Upper body back at the end.",
                
                19: "Change. Other side.",
            },
        },
    },
    7: {
        "postureName": "standingHeadToKnee",
        "posturePrintName": "Standing Head to Knee",
        "postureNumLines": 20,
        "postureSections": [[0,19], [0,7], [8,13], [14,17], [18,19]],
        "postureContent": {
            "lines": {
                0: "Pick up your left foot, same position. Please don’t lose the grip.",
                
                1: "Focus one point on your right Knee in the mirror.",
                2: "Don’t change your Eyes, don’t blink your Eyes.",
                3: "Think very deeply about your Standing Knee.",
                4: "Your right Knee is LOCKED, NO KNEE!!!",
                5: "Distribute the weight all over the right Foot, equally, the same. Don’t bring it to the side.", 
                6: "Standing Leg - Thigh Muscle is contracted, nice and tight. Nothing loose, nothing hanging.", 
                7: "Stomach in.",
                
                8: "Inhale, slowly, gently, left Leg lift up and stretch forward, Right Knee locked.",
                9: "Deep breath, kick your left Heel forward toward the mirror, until your both Knees lock.",
                10: "Continuously keep Kicking without stopping, without intermission.",
                11: "Kick the Heel out, turn the Toes in. You have to learn how to FLEX your Foot, to stretch your Achilles Tendon just above the Heel.",
                12: "All the five Toes toward your Face, eventually beyond perpendicular.", 
                13: "You should feel tremendous stretching underneath your legs, create a cramp on top of the thigh.",
                
                14: "If both Knees are locked (No Knee!), your both Legs like a perfect Upside-down “L” like Linda, then slowly start bending your Elbows down toward the floor, until your Elbows are touching the Calf Muscle.",
                15: "Elbows should go down below the Calf Muscle.",
                16: "Still, if you can balance there with both Knees locked, with your smiling, happy Face, slowly bring your Body down, Chest down, Head down.", 
                17: "Touch your Chin to your Chest, look at your Stomach, touch your Forehead to your Knee.",
                
                18: "Change.",
                19: "Do the back bending one second.",
            },      
        },
    },
    8: {
        "postureName": "standingBow",
        "posturePrintName": "Standing Bow",
        "postureNumLines": 27,
        "postureSections": [[0,26], [0,8], [9,15], [16,24], [25,26]],
        "postureContent": {
            "lines": {
                0: "Bring your right hand out, palm facing up, elbow touching your body.",
                1: "Bring your hand out to the right. Don’t turn your hand.",
                2: "Grab your right foot behind you, palm facing up.",
                3: "Hold from the inside, at the ankle, five fingers together.",
                4: "Nice and tight grip, don’t lose the grip.",
                
                5: "Left arm up in front of you, chin close to the shoulder.", 
                6: "Concentrate one point on your left knee in the mirror.", 
                7: "Left leg locked throughout the posture.",
                8: "Bring your knees together to start.",
                
                9: "Inhale breathing,",
                10: "Charge your body forward toward the mirror, try to touch the mirror.", 
                11: "Simultaneously, kick your right leg back and up toward the ceiling.", 
                12: "Bring your body down from the lower spine, until your abdomen and chest are parallel to the floor.", 
                13: "Continuously keep kicking your right leg up as hard as possible.", 
                14: "Your foot should be coming up over the top of your head in the mirror.", 
                15: "Both feet should be in one line from the side.",
                
                16: "Kick back, so your right shoulder is behind your left shoulder, invisible in the mirror.",
                17: "Stretch your left fingertips toward the mirror, trying to touch the mirror.", 
                18: "Try to touch your shoulder to your chin, shoulder blade, scapula coming out of the body.",
                19: "In other words, your two shoulders should be in one line, from front to back.",
                
                20: "Kicking and stretching should be equal and simultaneous, fifty fifty.", 
                21: "If you lose the balance, you’re not kicking hard enough.",

                22: "Body down more.",
                23: "Stretch forward more, try to touch the mirror.",
                24: "Kick back more. Kick harder. The harder you kick, you can balance forever. Body down and kick up one more time.",
                
                25: "Change. Come up.", 
                26: "Other side.",
            }, 
        },
    },
    9: {
        "postureName": "balancingStick",
        "posturePrintName": "Balancing Stick",
        "postureNumLines": 28,
        "postureSections": [[0,27], [0,9], [10,13], [14,24], [25,27]],
        "postureContent": {
            "lines": {
                0: "This posture is only ten seconds,",
                1: "So the moment you hear my clap, You step forward.",
                2: "You have to make up your mind to use one hundred percent strength in half a second.", 
                3: "If you’re late, It’s over.",

                4: "Feet together nicely, Toes and heels together.",
                5: "Arms over your head sideways.",
                6: "Palms together. Interlock your fingers, Release your index finger, Thumbs crossed.",
                
                7: "Stretch your arms up to the ceiling like you’re trying to touch the ceiling, To make sure your elbows are locked, Arms always touching with your ears, Throughout the Posture.",
                8: "No gap between your arms and head.", 
                9: "Chin up. Body back a couple of inches.",
                
                10: "Inhale breathing, Right leg step forward, A Big step.", 
                11: "Lock both knees. Arms and head together: Come down until your whole body, Arms, Head, Leg, Everything is parallel to the floor.",
                12: "From the side, Your body looks like a 'T' as in Tom. (not a broken umbrella!) Charge your body forward like you’re trying to touch the mirror.",
                13: "Get your left leg up, Pointed toes, Knee locked.",
                
                14: "Continuously stretch your body forward, Try to touch the mirror.",
                15: "Chin forward, Focus one point on your right foot in the mirror. Neck is straight.", 
                16: "Whole body is stretching in opposite directions, Like a natural human tug-of-war.", 
                17: "Scapulae coming out of the body, Shoulders are supposed to hurt.",
                
                18: "Body down, Leg up, Come down, Leg up.",
                19: "Every muscle contracted.",
                20: "Get your leg up, Pointed toes, Leg up, Leg up, Leg up.", 
                21: "Chest down, Leg up, Come down, Leg up.",

                22: "Stretch forward more.",
                23: "Go and touch the mirror!",
                24: "Stretch and stretch and stretch and stretch, And stretch, Stretch, Stretch, Stretch!",
                
                25: "Inhale breathing, Come up, Arms and head together.", 
                26: "Keep your arms over your head.",
                
                27: "Left side.",
            }, 
        },
    },
    10: {
        "postureName": "standingSeparateLegStretching",
        "posturePrintName": "Standing Separate Leg Stretching",
        "postureNumLines": 22,
        "postureSections": [[0,21], [0,3], [4,8], [9,19], [20,21]],
        "postureContent": {
            "lines": {      
                0: "Feet together nicely. Arms over the head sideways.", 
                1: "Right Leg step to the right, Four feet minimum.",
                2: "At the same time, Arms down parallel to the floor.", 
                3: "Heels in one line, Feet slightly pigeon toed.",

                4: "Suck your stomach in, And slowly bend your upper body down from the Lower Spine toward the floor.",
                5: "Keep your chin forward and your knees locked.", 
                6: "Grab your Heels from the outside, Five fingers together, Thumbs touching with the index finger.", 
                7: "If you can’t grab your heels yet, Grab the outside of your feet.",
                8: "Pull on your heels as hard as possible, Stretching your body down from the lower spine toward the floor.",

                9: "Make sure your knees are locked throughout the posture.", 
                10: "Roll forward like a wheel, Body weight on the Toes.",
                11: "Try to touch your Forehead to the floor.",
                12: "If you cannot touch your forehead to the floor, Open your legs more, And more, And more, And more.",
                13: "Chin up, Look forward, Roll forward. Keep pulling.",
                14: "Eventually your Spine should be perfectly straight from the coccyx to the neck, Forehead touching the floor between the Feet.",

                15: "First your Legs stretching, The Hips stretching, Then Lower Spine stretching, Then whole Spine stretching.",
                16: "Eventually the whole Body is stretching, 360 degree angle, Inside out, From bones to the skin, Coccyx to the toes, Coccyx to the forehead.",

                17: "Pull harder, Keep pulling.",
                18: "Chin forward. Roll forward.", 
                19: "Touch your forehead to the floor.",

                20: "Inhale breathing, Slowly come up.",
                21: "Right Leg back to the place.",
            },
        },
    },
    11: {
        "postureName": "triangle",
        "posturePrintName": "Triangle",
        "postureNumLines": 28,
        "postureSections": [[0,27], [0,13], [14,17], [18,24], [25,27]],
        "postureContent": {
            "lines": {
                0: "Feet together. Arms over the head sideways.",
                1: "Right leg step to the right - BIG STEP - Four feet minimum.", 
                2: "Immediately arms down parallel to the floor, Palms facing down.",

                3: "Look straight ahead.",
                4: "Push your hips forward, Upper body leaning back.",

                5: "Turn your right foot out to the right - all the way.",
                6: "Turn it a half inch more, Until the foot is parallel to the front; Two heels in one line.", 
                7: "Inhale breathing, Bend the right knee and sit down.",
                8: "Bounce a couple of times, To make sure you’re sitting down low enough.",
                9: "Your right thigh should be parallel to the floor.",
                10: "Your right leg should look like a perfect upside-down “L” like Linda.",
                11: "Make sure your hips don’t go up anymore. STAY DOWN THERE.", 
                12: "Again, Hips forward, Arms back, Body back, Lean back, Open your chest.", 
                13: "Spine straight in the center.",

                14: "Inhale breathing - Move both arms at the same time, Right elbow in front of the right knee.",
                15: "Bring your right hand down and put your fingertips between the big toe and 2nd toe,", 
                16: "Don’t touch the floor, No pressure on the fingertips against the floor.",
                17: "Look up toward the ceiling - Touch your chin to the left shoulder, So the profile of your face is exactly visible.",

                18: "Take a deep breath, Continuously stretch your left arm up to the ceiling, You’re trying to touch the ceiling.",
                19: "Right arm stretch down, Left arm stretch up.",
                20: "In other words, Both arms - Shoulders should be stretching each other, Up and down, In opposite directions, Like natural human traction.",
                
                21: "Push your left hip forward.",
                22: "At the same time, Push your right knee back with the help of your right elbow. TOUCH THE TOES.",
                23: "Upper body turn, Or twist backward (like the Spine Twisting Posture).",
                
                24: "Keep your left knee locked, And left foot flat on the floor.",
                
                25: "Inhale breathing; Come back up, stop in the middle.",
                26: "Right foot back turn back to center. Keep your arms there.",
                27: "Left side.",
            },
        },
    },
    12: {
        "postureName": "standingSeparateLegHeadToKnee",
        "posturePrintName": "Standing Separate Leg Head to Knee",
        "postureNumLines": 20,
        "postureSections": [[0,19], [0,7], [8,11], [12,16], [17,19]],
        "postureContent": {
            "lines": {
                0: "Feet together nicely.",
                1: "Arms over the head sideways. Hands/Palms together, Thumbs crossed.",
                2: "Stretch your arms toward the ceiling.",
                3: "Throughout the posture, Elbows locked, So arms always touching with the ears.",

                4: "Right leg step to the right, A big step, 3 feet distance (36 inches) between the feet.",
                5: "Turn to the right, 180 degree angle.",
                6: "Turn your hips, 1, 2, 3, 4, 5 times, Beyond your flexibility, To bring your HIPS exactly in one line from the side.",
                7: "Two heels in one line, Backside foot should be 45 degree angle.",

                8: "Exhale breathing, And you go down, Arms and head together.", 
                9: "Tuck your chin to your chest, Look at your stomach, Touch your forehead on the knee.",
                10: "Forehead should touch the knee.",
                11: "If you can’t touch your forehead, Bend your right knee a little bit, But you have to touch your forehead to the knee.",

                12: "Stretch your hands forward, Beyond the toes. Keep your elbows straight.",
                13: "Push your hands against the floor, To get your knee locked.",
                14: "Exhale breathing, Suck your stomach in, Throat choked, Eyes open, Breathing normal.", 
                15: "Bring maximum body weight on the front leg, So your right side hip is sticking up toward the ceiling, To get your two hips in one line.",
                16: "Lock the knee very quickly a couple of times.",
                17: "Inhale breathing, Very gently come up, Arms and head together.",
                18: "Stop in the middle.",
                19: "Arms down, right leg back to the place.",
            },
        },
    },
    13: {
        "postureName": "tree",
        "posturePrintName": "Tree",
        "postureNumLines": 20,
        "postureSections": [[0,19], [0,4], [5,9], [10,17], [18,19]],
        "postureContent": {
            "lines": {
                0: "Everybody go back to where you started.",
                1: "Feet together nicely.",
                2: "Focus on one spot in the mirror.",
                3: "Grab your right foot from underneath, With your left hand.",
                4: "Right leg lifts all the way up, Until your heel is touching high on your thigh, Sole of the foot is facing the ceiling.",

                5: "Be careful of the right knee.",
                6: "Slowly, Gently, Let your right knee come down.",
                7: "Push your hips forward toward the mirror, And gently push your right knee back.", 
                8: "Try to get your two knees in one line from the side, To open up your pelvis. Same principle like in triangle pose.", 
                9: "Upper body lean back a couple of inches.",

                10: "Stretch your spine up to the ceiling, And suck your stomach in.", 
                11: "Two hips in one line, Two shoulders in one line.",
                12: "Bring your right hand up to the center of your chest.",
                13: "If you can balance there, Bring your left hand up, Palms together.",
                14: "If your foot slips at all, Continue to hold the foot with your left hand.", 

                15: "Left leg locked, Thigh contracted.",
                16: "Spine straight, Stomach in.",

                17: "Focus one point, Eyes open, Breathing normal. Stay there.",

                18: "Change.", 
                19: "Left leg.",
            },
        },
    },
    14: {
        "postureName": "toeStand",
        "posturePrintName": "Toe Stand",
        "postureNumLines": 18,
        "postureSections": [[0,17], [0,3], [4,6], [7,15], [16,17]],
        "postureContent": {
            "lines": {
                0: "Feet together.",
                1: "Focus one point on the floor, Four feet in front of you. Don’t move your eyes, Don’t blink your eyes.", 
                2: "Bring your right foot up onto the middle of your thigh, Or wherever you feel comfortable.", 
                3: "Hands palms together in front of your chest.",

                4: "Bend your body down from the lower spine toward the floor.", 
                5: "Touch your both hands, 10 fingers, On the floor.",
                6: "Slowly bend the knee, Bring your hips down, And sit on your heel.",

                7: "Bring your hands to both sides on the floor.",
                8: "Stretch your spine up to the ceiling, Hips up, Balancing on your fingertips.",

                9: "Both knees should be in one line, Parallel to the floor.",
                10: "Keep focusing one point on the floor, Four feet in front of you.",

                11: "Slowly bring your left hand up in front of your chest.", 
                12: "If you can still balance there, Without moving, Then bring your right hand up, Palms together (namaskar.)", 
                13: "Stretch your spine up to the ceiling, Like natural human traction.", 
                14: "Suck your stomach in.",

                15: "Balance there.",

                16: "Change.",
                17: "Come up exactly the opposite way you went down.",
            },
        },
    },
    15: {
        "postureName": "windRemoving",
        "posturePrintName": "Wind Removing",
        "postureNumLines": 20,
        "postureSections": [[0,19], [0,4], [5,10], [11,16], [17,19]],
        "postureContent": {
            "lines": {
                0: "Right leg lift up, Hold the right leg exactly 2 inches below the knee, Interlocked fingers, Nice and tight grip.",
                1: "Pull your right knee down, All the way, Toward your right shoulder, Completely avoiding the rib cage.",
                2: "Make sure the left leg is straight, So the calf muscle is touching the floor. If the calf muscle is not touching, Then flex the left foot.",
                3: "Chin down toward the chest, To get your neck flat on the floor, No gap underneath. Bring your elbows close to the body. Shoulders relaxed, Touching the floor.",
                4: "Pull down harder, And absolutely freeze there.",
                5: "Eyes open, Breathing normal.",
                6: "Freeze. Don’t move. You can’t even blink your eyes.",
                7: "You have to pull a little harder.",
                8: "Maximum pressure in the lower abdomen.",
                9: "Change.",
                10: "Arms and legs on the floor.",
                11: "Left leg up...(repeat for the other side.)",
                12: "Immediately, Both legs up.",
                13: "Grab the elbows, Over the legs, A couple of inches below the knees (if possible.) Nice and tight grip, Compact.",
                14: "Feet together side-by-side, Relaxed position.",
                15: "Chin down. Neck flat on the floor.",
                16: "Shoulders relaxed, Eyes open, And breathing normal.",
                17: "Freeze there.",
                18: "Eventually, In the future, When you improve the skeletal system (the bone joints) enough, Then only, Your total spine is going to be flat on the floor.",
                19: "Change. Legs down, Arms down.",
            },
        },
    },
    16: {
        "postureName": "cobra",
        "posturePrintName": "Cobra",
        "postureNumLines": 22,
        "postureSections": [[0,21], [0,11], [12,15], [16,19], [20,21]],
        "postureContent": {
            "lines": {
                0: "Lie down on your stomach.",
                1: "Chin on the floor.",
                2: "Get your hands under the shoulders, Very close to your chest.",
                3: "Make sure throughout the Posture, Five fingers together, So your hands palms are flat on the floor.",
                4: "Fingertips in line with the tops of your shoulders, Baby fingers in line with the deltoids.",
                5: "Glue it down.",
                6: "Distribute the body weight, All over the hands palms, Equally, The same.",
                7: "Please don’t move your hands.",
                8: "Start to finish, Keep your feet and heels together, Legs locked, And feet flat on the floor.",
                9: "Leg muscles nice and tight, Hip muscles solid, Concrete, One piece.",
                10: "Elbows touching the body, Drop your shoulders down.",
                11: "You have only one leg, Like a cobra tail. Don’t open it.",
                12: "Look up toward the ceiling.",
                13: "Inhale breathing, Come up please. Lift your upper body up, Using one hundred percent back strength.",
                14: "Come up halfway only, Until only your belly button is touching the floor. The rest of your upper body is in the air.",
                15: "At the same time, From the side, Your elbows should be L, ninety degree angle, Like a rectangle.",
                16: "Stretch your elbows down toward the hips, Arms and elbows always touching the body, To bring your shoulders down, Trapezius muscles visible in the front mirror.",
                17: "Now chest up more, Everybody go up, Come up a couple of inches.",
                18: "Shoulders down, Chest up, Look up, Come up, Go up, More up, Come up a little more.",
                19: "Hold it there, Freeze.",
                20: "And gently come down.",
                21: "Left ear on the towel, Arms by your side, And relax.",
            },
        },
    },
    17: {
        "postureName": "locust",
        "posturePrintName": "Locust",
        "postureNumLines": 24,
        "postureSections": [[0,23], [0,6], [7,12], [13,21], [22,23]],
        "postureContent": {
            "lines": {
                0: "Lie on your stomach.",
                1: "Arms straight position, Get your arms underneath your body.",
                2: "Hands palms facing the floor.",
                3: "Elbows completely underneath your stomach, Invisible.",
                4: "Fingers completely apart. Grab the floor with your fingertips. Two little baby fingers touching side by side.",
                5: "Chin on the floor.",
                6: "Left leg relaxed. Right leg solid, concrete, one piece, pointed toes.",
                7: "Inhale breathing.",
                8: "Slowly, Gently, Right leg lift up from the floor, Minimum forty-five degrees, Half of ninety.",
                9: "Go up, Much higher everybody.",
                10: "Leg up more, Lift up more, A couple of inches.",
                11: "Lock the knee, Pointed toes, More up.",
                12: "And change. Slowly, Right leg down.",
                13: "Left leg up... (repeat for the left leg.)",
                14: "Turn your head in, Mouth on the floor.",
                15: "Readjust your hands / palms. Elbows closer together underneath the body.",
                16: "Open your fingers, Grab the floor with your fingertips.",
                17: "Full lungs, Take a deep breath, And",
                18: "Without bending your knees, Both legs up.",
                19: "Come up please. Everybody go up, Come up, Everybody come up.",
                20: "Lock the knees, Feet together.",
                21: "Come up. Take a deep breath, Come up more.",
                22: "And slowly, Both legs down.",
                23: "Relax please. Arms by your side, Turn your head to the side.",
            },
        },
    },
    18: {
        "postureName": "fullLocust",
        "posturePrintName": "Full Locust",
        "postureNumLines": 20,
        "postureSections": [[0,19], [0,6], [7,9], [10,15], [16,19]],
        "postureContent": {
            "lines": {
                0: "Arms out to the side like airplane wings.",
                1: "Palms down and fingers together.",
                2: "Chin on the floor.",
                3: "Legs and feet together.",
                4: "Hips and leg muscles tight, Solid, Concrete, One piece.",
                5: "Knees locked, Pointed toes.",
                6: "Make sure you only have one leg.",
                7: "Look up to the ceiling, Take a deep breath.",
                8: "Arms, Body, Head, Legs, Everything lift up.",
                9: "747 taking off.",
                10: "Go up, Everybody look up, Chest up, Arms up, Arms back.",
                11: "Fingertips should be same level as the head.",
                12: "Only your hip bones should be touching the floor, Rest of the body in the air.",
                13: "Chest up, Chest up, Chest up.",
                14: "Look up, Body up, Chest up, Come up, More up, Go up.",
                15: "Exhale breathing, Come up one more time.",
                16: "Slowly come down. Relax.",
                17: "Arms on the towel.",
                18: "Turn your head sideways.",
                19: "Completely relax.",
            },
        },
    },
    19: {
        "postureName": "bow",
        "posturePrintName": "Bow",
        "postureNumLines": 21,
        "postureSections": [[0,20], [0,6], [7,9], [10,18], [19, 20]],
        "postureContent": {
            "lines": {
                0: "Chin on the floor.",
                1: "Hold your feet from the outside, Exactly 2 inches below the toes.",
                2: "Five fingers together – Make sure thumbs touching with the index fingers.",
                3: "Please don’t lose the grip.",
                4: "Six inches apart between the knees and the toes.",
                5: "Wrists straight, Pointed toes.",
                6: "Arms and legs should look like 2 wheels in one base.",
                7: "Take a deep breath, And gently both legs kick up toward the ceiling.",
                8: "Look up and kick up.",
                9: "Kick your legs back.",
                10: "Continuously keep kicking, Don’t stop kicking.",
                11: "Roll forward, Until your toes are in the center from the side.",
                12: "Kick back more, Harder.",
                13: "Head up more.",
                14: "Kick your legs behind you.",
                15: "Wrists straight more.",
                16: "Keep your knees in, Pointed toes.",
                17: "Kick back more.",
                18: "Kick harder.",
                19: "Slowly lower down, And you Relax.",
                20: "Completely Relax.",
            },
        },
    },
    20: {
        "postureName": "fixedFirm",
        "posturePrintName": "Fixed Firm",
        "postureNumLines": 19,
        "postureSections": [[0,18], [0,4], [5,11], [12,16], [17,18]],
        "postureContent": {
            "lines": {
                0: "Come to the top of the towel.",
                1: "Sit down, Kneeling position.",
                2: "Separate your feet and sit down between the heels, Hips touching the floor.",
                3: "Heels touching the hips. Make sure the heels are touching the hips the whole time.",
                4: "If your knees or feet hurt, You can open your knees.",
                5: "Put your hands-palms on your toes, Thumbs inside, Fingers outside.",
                6: "Touch your right elbow on the floor, Then the left, One by one.",
                7: "Touch your head on the floor, Then the back of your head.",
                8: "Your shoulders should touch the floor.",
                9: "Whole upper body relaxed on the floor.",
                10: "Bring your arms over the head.",
                11: "Grab your elbows, Over the head.",
                12: "Pull your elbows down toward the floor.",
                13: "Chin down toward the chest, Neck flat on the floor.",
                14: "Lift your chest and stomach up toward the ceiling, Create a perfect human bridge.",
                15: "Eventually, Bring your knees together, Touching each other. Make sure knees never come off the floor.",
                16: "Eyes open, Breathing is normal.",
                17: "Put your hands on your feet, With the help of your elbows, Carefully come up.",
                18: "Turn around and relax on your back.",
            },
        },
    },
    21: {
        "postureName": "halfTortoise",
        "posturePrintName": "Half Tortoise",
        "postureNumLines": 16,
        "postureSections": [[0,15], [0,5], [6,8], [9,12], [13,15]],
        "postureContent": {
            "lines": {
                0: "Come to the middle of the towel.",
                1: "Sit down, Kneeling position. Feet flat on the floor, No gap underneath the ankles.",
                2: "Arms over the head sideways, Hands-palms together, Only cross your thumbs.",
                3: "Stretch your arms toward the ceiling.",
                4: "Elbows locked, Arms touching the ears, Chin up.",
                5: "Keep your hips touching the heels, Throughout the posture.",
                6: "Stomach in, Exhale breathing, And go down, Arms and head together.",
                7: "Touch your forehead on the floor.",
                8: "Little fingers touching the floor, The rest of your arms in the air, Elbows locked.",
                9: "Stretch your arms more forward.",
                10: "Make sure your shoulders/scapulae coming out of the body, Chin away from your chest.",
                11: "Stretch forward more, Chin forward, Heels touching the hips.",
                12: "Eyes open, Breathing is always normal.",
                13: "Inhale breathing, And gently come up.",
                14: "Arms and head together.",
                15: "Arms down side, Turn around, Lie down on your back, And relax.",
            },
        },
    },
    22: {
        "postureName": "camel",
        "posturePrintName": "Camel",
        "postureNumLines": 19,
        "postureSections": [[0,18], [0,3], [4,9], [10,15], [16,18]],
        "postureContent": {
            "lines": {
                0: "Come to the top of the towel.",
                1: "Stand up on your knees.",
                2: "Six inches apart, Inside the legs, Between the knees and the feet.",
                3: "Get your hand on your hips, Fingers toward the floor, Thumbs outside.",
                4: "Take a deep breath and push your hips forward toward the mirror.",
                5: "Drop your head back, As far as it goes.",
                6: "Go back half way, And stop in the middle.",
                7: "First, Only right hand down, Grab the right heel, Thumb outside, Fingers inside.",
                8: "Then left hand down, Grab the left heel, Thumb outside, Fingers inside.",
                9: "Full grip with your hands palms. PLEASE don’t lose the grip.",
                10: "Take a deep breath, Eyes open, Exhale breathing, And Stomach, Legs, Hips, Everything push forward, As far as possible.",
                11: "Continuously keep pushing.",
                12: "Everybody push, Push more, Everybody push harder.",
                13: "Create 360 degree angle backward bending.",
                14: "Put your hands on your hips,",
                15: "Chest up, Spine straight, Push more forward,",
                16: "Inhale breathing, And come up.",
                17: "Stop in the middle.",
                18: "Turn around, Lie down and relax in savasana.",
            },
        },
    },
    23: {
        "postureName": "rabbit",
        "posturePrintName": "Rabbit",
        "postureNumLines": 15,
        "postureSections": [[0,14], [0,3], [4,7], [8,13], [14,14]],
        "postureContent": {
            "lines": {
                0: "Come to the middle of the towel, Sit down kneeling position, Knees and feet together.",
                1: "Put the towel on your feet, Grab the heels over the towel, Thumbs outside, Fingers inside.",
                2: "Nice, Tight grip.",
                3: "PLEASE DON’T LOSE THE GRIP!!",
                4: "Pull your heels as hard as possible.",
                5: "Tuck your chin to your chest, Look at your stomach.",
                6: "Exhale breathing, Slowly go down front side, Touch your forehead on the knees.",
                7: "Automatically, The top of your head touching the floor.",
                8: "Exhale breathing, Eyes open, And lift your hips up, All the way, As high as possible.",
                9: "Roll forward like a wheel until your arms elbows are straight.",
                10: "If there’s a gap between your knees and forehead, Walk your knees one by one, Until your knees touching the forehead.",
                11: "Make sure your total spine is stretching top to bottom.",
                12: "Throat choked, Eyes open, Breathing is normal.",
                13: "Pull harder, Hips up more.",
                14: "Come up, Turn around, Relax on your back.",
            },
        },
    },
    24: {
        "postureName": "headToKnee",
        "posturePrintName": "Head To Knee",
        "postureNumLines": 22,
        "postureSections": [[0,21], [0,4], [5,10], [11,20], [21,21]],
        "postureContent": {
            "lines": {
                0: "Turn around, And sit facing the mirror.",
                1: "Right leg out corner wise, Bend your left leg.",
                2: "Put your left foot high on your inner thigh, So your heel touches your shorts.",
                3: "Create pressure with the left foot sole, Against the right leg biceps of the thigh muscle.",
                4: "Your two legs should be 90 degree angle, Like “L.”",
                5: "Arms over the head, Turn to the Right.",
                6: "Grab your right foot, Two inches below the toes, Ten fingers interlocked position.",
                7: "Pull your toes as hard as possible.",
                8: "Flex your foot, So your heel comes off the floor, In the air.",
                9: "Just like Rabbit Pose, Touch your chin to your chest, Look at your stomach.",
                10: "Touch your forehead on the knee. Forehead should touch the knee.",
                11: "If you can’t touch your forehead, Bend the knee up a little bit.",
                12: "You’ve got to touch your forehead.",
                13: "Bring your elbows down, Next to your calves.",
                14: "Suck your stomach in.",
                15: "Push your knee down, Forehead touching position.",
                16: "Left elbow down more. Left shoulder down more.",
                17: "Roll inside to the left. Left knee should stay touching the floor.",
                18: "Roll in, Roll in, Roll in.",
                19: "Get your head close with your stomach.",
                20: "Push your knee down.",
                21: "Change. Left side.",
            },
        },
    },
    25: {
        "postureName": "stretching",
        "posturePrintName": "Stretching",
        "postureNumLines": 12,
        "postureSections": [[0,11], [0,2], [3,8], [9,10], [11,11]],
        "postureContent": {
            "lines": {
                0: "Both legs forward. Lie down on your back.",
                1: "Sit up please, Immediately.",
                2: "Grab the big toes from the top, With your index and middle fingers.",
                3: "Pull your toes as hard as possible. Feet together.",
                4: "Look in the mirror, Get your head up, Please.",
                5: "Walk your hips back, Right and Left, Right and Left, Right and Left, 10-15 times, Until your both knees lock. No knees!",
                6: "Flex your feet. Heels should come off the floor, In the air.",
                7: "Then, Only, You can bend your elbows down.",
                8: "Look forward, Your head up, Chin up.",
                9: "Inhale breathing, Stretch your body forward, From the lower spine. Pull your toes back.",
                10: "Your goal is to touch the head to the feet.",
                11: "Come up, Turn around, Relax on your back. Complete relax, Please.",
            },
        },
    },
    26: {
        "postureName": "spineTwist",
        "posturePrintName": "Spine Twist",
        "postureNumLines": 22,
        "postureSections": [[0,21], [0,5], [6,13], [14,20], [21,21]],
        "postureContent": {
            "lines": {
                0: "Turn around and sit facing the left side of the room.",
                1: "Bend your left knee on the floor, Left knee facing the left side wall (mirror.)",
                2: "Put your right foot exactly over the left knee corner.",
                3: "H-E-E-L, Your heel should touch the knee. Foot flat on the floor.",
                4: "Both hips should touch the floor comfortably, To keep your spine perfectly straight, Perpendicular, ninety degree angle.",
                5: "Hip touching the left heel. Point your left toes.",
                6: "Bring your left arm over the right knee, Elbow exactly against the knee.",
                7: "Push your knee back, With the help of your left elbow.",
                8: "Turn your wrist, And grab the left knee with your left hand.",
                9: "Now, Look down. Make sure your knee, Hand, And the heel, All 3 things are touching each other, At the same spot, On the floor.",
                10: "Keep the knee on the floor.",
                11: "Stretch your spine up toward the ceiling.",
                12: "Right arm on your back, Palm facing out.",
                13: "Try to grab the thigh behind you with your right hand fingertips.",
                14: "If your spine is rounding, Put your hand on the floor behind you, Fingers facing out, And push against the floor, To get your spine straight.",
                15: "Chest up, Spine up, Rib cage open.",
                16: "Look back behind you, Look over the right shoulder, Way, Way, Way back, Chin over the shoulder.",
                17: "Twist your body right side, All the way.",
                18: "Total spine is supposed to twist, Top to bottom.",
                19: "Coccyx to the neck, Joints of each and every vertebra and cartilage Supposed to twist like a Pearl Necklace.",
                20: "Twist, And twist, And twist, The last chance Twist.",
                21: "Change. Other side.",
            },
        },
    },
    27: {
        "postureName": "pranayamaBreathing",
        "posturePrintName": "Pranayama Breathing",
        "postureNumLines": 1,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {
                0: "Coming soon!"
            },
        },
    },
    28: {
        "postureName": "savasana",
        "posturePrintName": "Savasana",
        "postureNumLines": 1,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {
                0: "Coming soon!"
            },
        },
    },
    29: {
        "postureName": "sitUp",
        "posturePrintName": "Sit-Up",
        "postureNumLines": 1,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {
                0: "Coming soon!"
            },
        },
    },
    30: {
        "postureName": "blowingInFirm",
        "posturePrintName": "Blowing In Firm",
        "postureNumLines": 1,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {
                0: "Coming soon!"
            },
        },
    },
    99: {
        "postureName": "chooseRandom",
        "posturePrintName": "Choose for me at random!",
    },
    100: {
        "postureName": "unselected",
        "posturePrintName": "Unselected",
    },
}