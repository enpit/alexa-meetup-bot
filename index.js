'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "de-DE": {
        "translation": {
            "SKILL_NAME" : "Meetups in Deutschland",
            "GET_MEETUPS_MESSAGE" : "Hier sind die nächsten Treffen: ",
            "HELP_MESSAGE" : "Du kannst sagen, „sag mir die nächsten Veranstaltungen“ oder „welche Treffen kann ich besuchen“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?",
            "HELP_REPROMPT" : "Wie kann ich dir helfen?",
            "STOP_MESSAGE" : "Auf Wiedersehen!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetMeetups');
    },
    'GetMeetupsIntent': function () {
        this.emit('GetMeetups');
    },
    'GetMeetups': function () {
        // TODO: Query the meetups API for the coming meetups
        var meetup = "DOAG Konferenz im November in Nürnberg";
        // Create speech output
        var speechOutput = this.t("GET_MEETUPS_MESSAGE") + meetup;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), meetup)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
