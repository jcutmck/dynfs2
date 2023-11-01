{
        try {
            if (response != null) {
                var cclResponse = eval("(" + response + ")");
                var replyout = cclResponse.replyout;

                setPatientDemography(replyout);

                var userDemographics = {
                    "firstName": replyout.userFirstName
                    , "lastName": replyout.userLastName
                    , "title": replyout.userTitle + "z"
                    //, "title": replyout.userTitle
                    , "role": replyout.userRole
                    , "defaultLanguage": "en-US"
                    //, "defaultLanguage": ""
                    , "clientId": "IntegrationDev"
                    , "nocacheResponse": new Date().getTime()
                }

                apiRequestParameters.authenticationToken.patientDemography = getPatientDemography();
               
                component.setEventHandlers(componentEventHandlers);

                var samlResponseCallback = function (response) {
                    apiRequestParameters.authenticationToken.SAMLResponse = response;
                    window.debug.writeLog(atob(apiRequestParameters.authenticationToken.SAMLResponse));
                    
                    //prompt("SAML", apiRequestParameters.authenticationToken.SAMLResponse);
                    apiRequestParameters.authenticationToken.client_secret = "9801612f-fcee-4204-aa05-847c2109b6e1";//replyout.privateKey;
                    api.getAuthenticationToken(apiRequestParameters.authenticationToken, errorCallback);
                };

                var samlErrorCallback = function (status, textStatus, message) {
                    try {
                        displayMessage(responseCodes.defaultMessage, String.format("{0} ({1}): {2}", status, textStatus, message));
                    }
                    catch(ex) {
                    }
                };

                api.buildSAML(userDemographics, samlResponseCallback, samlErrorCallback);
            }
        }
        catch (ex) {
            errorCallback("", ex.stack, String.format("Unexpected error while loading the UI. Error: {0}", ex.message))
            window.debug.writeLog(+ ex.message + " " + ex.stack);
        }
    }