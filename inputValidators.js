'use strict'

const telegramUserRegex = /@([A-Za-z0-9_])/


function validDuration(duration) {
    return duration >= 0
}

function validProductOwner(productOwner) {    
    return productOwner && 
    productOwner > 0 && 
    ownerPattern.test(telegramUserRegex) 
}

function validParticipants(participants) {
    participants.forEach(element => {
        if (!element.test(telegramUserRegex))
            return false
    })

    return true
}

function validRecommendedParticipants() {
    return participants >= 0
}

function validFeaturesList(featuresList) {
    return featuresList.length > 0
}