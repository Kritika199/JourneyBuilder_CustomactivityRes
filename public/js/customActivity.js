define(['postmonger'], function(Postmonger) {
    "use strict";

    var connection = new Postmonger.Session();
    var payload = {};
    var steps = [
        { label: "Step 1", key: "step1" },
        { label: "Step 2", key: "step2" },
        { label: "Step 3", key: "step3" },
        { label: "Step 4", key: "step4" }
    ];
    var currentStep = steps[1].key; // Start with the first step

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    $(onRender);

    function onRender() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }
        showStep(currentStep); // Show the initial step
    }

    function onGetTokens(tokens) {
        // Handle received tokens if needed
    }

    function onGetEndpoints(endpoints) {
        // Handle received endpoints if needed
    }

    function onClickedNext() {
        var currentIndex = steps.findIndex(step => step.key === currentStep);
        if (currentIndex < steps.length - 1) {
            currentStep = steps[currentIndex + 1].key;
            showStep(currentStep);
        } else {
            save(); // Save data when on the last step
        }
    }

    function onClickedBack() {
        var currentIndex = steps.findIndex(step => step.key === currentStep);
        if (currentIndex > 0) {
            currentStep = steps[currentIndex - 1].key;
            showStep(currentStep);
        }
    }

    function onGotoStep(step) {
        showStep(step); // Show the specified step
    }

    function showStep(step) {
        $(".modal").hide(); // Hide all steps
        $("#" + step).show(); // Show the current step

        // Update buttons according to the current step
        if (step === "step1") {
            connection.trigger("updateButton", { button: "next", enabled: true });
            connection.trigger("updateButton", { button: "back", visible: false });
        } else {
            connection.trigger("updateButton", { button: "back", visible: true });
            connection.trigger("updateButton", { button: "next", visible: true });
            if (step === "step4") {
                connection.trigger("updateButton", { button: "next", text: "Done" });
            }
        }
    }

    function save() {
        // Prepare data to save
        payload.arguments.execute.inArguments = [
            { message: "This is the payload message" }
        ];
        payload.metaData.isConfigured = true;

        connection.trigger("updateActivity", payload); // Update activity with saved data
    }
});
