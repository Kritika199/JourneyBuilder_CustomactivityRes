document.addEventListener('DOMContentLoaded', function() {
    var steps = ['step1', 'step2', 'step3', 'step4'];
    var currentStepIndex = 0; // Start with the first step

    function showStep(index) {
        steps.forEach(function(stepId, i) {
            var stepElement = document.getElementById(stepId);
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
