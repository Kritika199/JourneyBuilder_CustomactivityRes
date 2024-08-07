define(['postmonger'], function(Postmonger) {
    "use strict";

    var connection = new Postmonger.Session();
    var payload = {};
    var steps = [
        { label: "Connect your PostGrid account", key: "firstForm" },
        { label: "Message Type", key: "secondForm" },
        { label: "HTML", key: "thirdForm" }
    ];
    var currentStep = steps[0].key; // Start with the first step

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    $(onRender);

    function onRender() {
        console.log("connection.trigger('ready')");
        connection.trigger('ready');
        console.log("connection.trigger('requestTokens')");
        connection.trigger('requestTokens');
        console.log("connection.trigger('requestEndpoints')");
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        console.log("function initialize");
        if (data) {
            payload = data;
        }
        showStep(currentStep); // Show the initial step
    }

    function onGetTokens(tokens) {
        console.log("function onGetTokens");
        // Handle received tokens if needed
    }

    function onGetEndpoints(endpoints) {
        console.log("function onGetEndpoints");
        // Handle received endpoints if needed
    }

    function onClickedNext() {
        console.log("function onClickedNext");
        var currentIndex = steps.findIndex(step => step.key === currentStep);
        if (currentIndex < steps.length - 1) {
            currentStep = steps[currentIndex + 1].key;
            showStep(currentStep);
        } else {
            save(); // Save data when on the last step
        }
    }

    function onClickedBack() {
        console.log("function onClickedBack");
        var currentIndex = steps.findIndex(step => step.key === currentStep);
        if (currentIndex > 0) {
            currentStep = steps[currentIndex - 1].key;
            showStep(currentStep);
        }
    }

    function onGotoStep(step) {
        console.log("function onGotoStep");
        showStep(step); // Show the specified step
    }

    function showStep(step) {
        console.log("function showStep");
        $(".modal").hide(); // Hide all steps
        $("#" + step).show(); // Show the current step

        // Update buttons according to the current step
        if (step === "firstForm") {
            connection.trigger("updateButton", { button: "next", enabled: true });
            connection.trigger("updateButton", { button: "back", visible: false });
        } else {
            connection.trigger("updateButton", { button: "back", visible: true });
            connection.trigger("updateButton", { button: "next", visible: true });
            if (step === "thirdForm") {
                connection.trigger("updateButton", { button: "next", text: "Done" });
            }
        }
    }

    function save() {
        console.log("function save");

        // Prepare data to save
        payload.arguments.execute.inArguments = [
            { message: "This is the payload message" }
        ];
        payload.metaData.isConfigured = true;

        connection.trigger("updateActivity", payload); // Update activity with saved data
    }
});
