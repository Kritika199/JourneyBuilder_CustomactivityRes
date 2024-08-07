document.addEventListener('DOMContentLoaded', function() {
    // Define the steps with labels and keys
    var steps = [
        { label: "Connect your PostGrid account", key: "firstForm" },
        { label: "Message Type", key: "secondForm" },
        { label: "HTML", key: "thirdForm" }
    ];
    var currentStepIndex = 0; // Start with the first step

    function showStep(index) {
        // Get the current step key
        var currentStepKey = steps[index].key;

        // Iterate through all steps
        steps.forEach(function(step, i) {
            var stepElement = document.getElementById(step.key);
            // Show or hide step elements based on the current index
            if (i === index) {
                stepElement.style.display = 'block';
            } else {
                stepElement.style.display = 'none';
            }
        });
    }

    // Show the first step on page load
    showStep(currentStepIndex);

    // Handle step navigation
    document.addEventListener('nextStep', function() {
        if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            showStep(currentStepIndex);
        }
    });

    document.addEventListener('prevStep', function() {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            showStep(currentStepIndex);
        }
    });
});
