const audioSources = {
    "75db": "sounds/washing-machine.wav",
    "80db": "sounds/mower.wav",
    "88db": "sounds/city.wav",
    "90db": "sounds/blender.wav",
    "100db": "sounds/honk.wav",
    "105db": "sounds/music.wav",
    "110db": "sounds/bark.wav",
    "120db": "sounds/Siren.wav",
    "130db": "sounds/jet.wav",
    "140db": "sounds/fireworks.mp3"
};

// Map to store the state of each button
const buttonStates = {};

// Add click, mouseover, and mouseout event listeners to each button
const buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    buttonStates[button.id] = {
        isPlaying: false,
        audioElement: new Audio(audioSources[button.id]),
        imgElement: button.getElementsByTagName("img")[0] // Get the img element within the button
    };
    button.addEventListener("click", handleClick);
    button.addEventListener("mouseover", handleMouseOver);
    button.addEventListener("mouseout", handleMouseOut);
}

function handleClick() {
    const button = this;
    const buttonState = buttonStates[button.id];

    // Check if the clicked button is already playing
    const isSameButton = buttonState.isPlaying;

    // Stop all sounds
    stopAllSounds();

    if (!isSameButton) {
        // Play sound
        buttonState.audioElement.play();

        // Change src attribute of the image to include "-play" only if not already present
        const imgSrc = buttonState.imgElement.src;
        if (!imgSrc.includes("-play")) {
            const imgSrcPlay = imgSrc.replace(".svg", "-play.svg");
            buttonState.imgElement.src = imgSrcPlay;
        }

        // Update button state to true
        buttonState.isPlaying = true;

        // Listen for the "ended" event to remove "-play" when sound finishes
        buttonState.audioElement.addEventListener("ended", function () {
            buttonState.imgElement.src = buttonState.imgElement.src.replace(
                "-play.svg",
                ".svg"
            );
            buttonState.isPlaying = false;
        });
    }
}

function handleMouseOver() {
    const button = this;
    button.classList.add("hovered");

    const buttonState = buttonStates[button.id];
    const imgSrc = buttonState.imgElement.src;
    if (!imgSrc.includes("-play")) {
        const imgSrcPlay = imgSrc.replace(".svg", "-play.svg");
        buttonState.imgElement.src = imgSrcPlay;
    }
}

function handleMouseOut() {
    const button = this;
    button.classList.remove("hovered");

    const buttonState = buttonStates[button.id];
    const imgSrc = buttonState.imgElement.src;
    if (imgSrc.includes("-play") && !buttonState.isPlaying) {
        const imgSrcNormal = imgSrc.replace("-play.svg", ".svg");
        buttonState.imgElement.src = imgSrcNormal;
    }
}

function stopAllSounds() {
    for (const buttonId in buttonStates) {
        const buttonState = buttonStates[buttonId];

        if (buttonState.isPlaying) {
            // Pause sound
            buttonState.audioElement.pause();
            buttonState.audioElement.currentTime = 0; // Reset sound to the beginning

            // Change src attribute of the image to remove "-play"
            const imgSrc = buttonState.imgElement.src;
            const imgSrcNormal = imgSrc.replace("-play.svg", ".svg");
            buttonState.imgElement.src = imgSrcNormal;

            // Update button state to false
            buttonState.isPlaying = false;
        }
    }
}
