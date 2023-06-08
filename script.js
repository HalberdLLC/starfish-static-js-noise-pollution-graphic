// Audio sources for each button
const audioSources = {
    "75db": "sounds/140dB.mp3",
    "80db": "sounds/140dB.mp3",
    "88db": "sounds/140dB.mp3",
    "90db": "sounds/140dB.mp3",
    "100db": "sounds/140dB.mp3",
    "105db": "sounds/140dB.mp3",
    "110db": "sounds/140dB.mp3",
    "120db": "sounds/140dB.mp3",
    "130db": "sounds/140dB.mp3",
    "140db": "sounds/140dB.mp3"
};

// Map to store the state of each button
const buttonStates = {};

// Add click event listener to each button
const buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    buttonStates[button.id] = {
        isPlaying: false,
        audioElement: new Audio(audioSources[button.id]),
        imgElement: button.getElementsByTagName("img")[0], // Get the img element within the button
    };
    button.addEventListener("click", toggleSound);
}

function toggleSound() {
    const button = this;
    const buttonState = buttonStates[button.id];

    // Check if the clicked button is already playing
    const isSameButton = buttonState.isPlaying;

    // Stop all sounds
    stopAllSounds();

    if (!isSameButton) {
        // Play sound
        buttonState.audioElement.play();

        // Change src attribute of the image to include "-play"
        const imgSrc = buttonState.imgElement.src;
        const imgSrcPlay = imgSrc.replace(".svg", "-play.svg");
        buttonState.imgElement.src = imgSrcPlay;

        // Update button state to true
        buttonState.isPlaying = true;
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
