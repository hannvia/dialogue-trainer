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
        "posturePrintName": "Half Moon Sidebend",
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
        "posturePrintName": "Half Moon Backbend",
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
    2: {
        "postureName": "handsToFeet",
        "posturePrintName": "Hands to Feet",
        "postureNumLines": 22,
        "postureSections": [[0,21], [0,6], [7,14], [15,21]],
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
        "postureSections": [[0,19], [0,6], [7,14], [15,19]],
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
        "postureSections": [[0,11], [0,5], [6,10], [11,11]],
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
        "postureSections": [[0,9], [0,4], [5,7], [8,9]],
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
        "postureSections": [[0,19], [0,5], [6,14], [15,19]],
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
        "postureSections": [[0,19], [0,8], [9,13], [14,19]],
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
        "postureSections": [[0,26], [0,11], [12,21], [22,26]],
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
        "postureSections": [[0,27], [0,13], [14,21], [22,27]],
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
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    11: {
        "postureName": "triangle",
        "posturePrintName": "Triangle",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    12: {
        "postureName": "standingSeparateLegHeadToKnee",
        "posturePrintName": "Standing Separate Leg Head to Knee",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    13: {
        "postureName": "tree",
        "posturePrintName": "Tree",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    14: {
        "postureName": "toeStand",
        "posturePrintName": "Toe Stand",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    15: {
        "postureName": "windRemoving",
        "posturePrintName": "Wind Removing",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    16: {
        "postureName": "cobra",
        "posturePrintName": "Cobra",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    17: {
        "postureName": "locust",
        "posturePrintName": "Locust",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    18: {
        "postureName": "fullLocust",
        "posturePrintName": "Full Locust",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    19: {
        "postureName": "bow",
        "posturePrintName": "Bow",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    20: {
        "postureName": "fixedFirm",
        "posturePrintName": "Fixed Firm",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    21: {
        "postureName": "halfTortoise",
        "posturePrintName": "Half Tortoise",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    22: {
        "postureName": "camel",
        "posturePrintName": "Camel",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    23: {
        "postureName": "rabbit",
        "posturePrintName": "Rabbit",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    24: {
        "postureName": "headToKnee",
        "posturePrintName": "Head To Knee",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    25: {
        "postureName": "stretching",
        "posturePrintName": "Stretching",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    26: {
        "postureName": "spineTwist",
        "posturePrintName": "Spine Twist",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
    27: {
        "postureName": "pranayamaBreathing",
        "posturePrintName": "Pranayama Breathing",
        "postureNumLines": 0,
        "postureSections": [[0,0], [0,0], [0,0], [0,0]],
        "postureContent": {
            "lines": {},
        },
    },
};
