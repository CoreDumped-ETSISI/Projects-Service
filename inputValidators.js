'use strict'

const telegramUserRegex = /@([A-Za-z0-9_])/
const productNameRegex = /([A-Za-z0-9_])/


function validDuration(duration) {
    return duration >= 0
}

function validProductOwner(productOwner) {    
    return telegramUserRegex.test(productOwner)
}

function validParticipants(participants) {
    participants.forEach(element => {
        if (!telegramUserRegex.test(element))
            return false
    })

    return true
}

function validRecommendedParticipants(recommendedParticipants) {
    return recommendedParticipants >= 1
}

function validFeaturesList(featuresList) {
    return featuresList.length > 0
}

function validProjectName(projectName) {
    return productNameRegex.test(projectName)
}

module.exports = {
    validDuration,
    validFeaturesList,
    validParticipants,
    validProductOwner,
    validProjectName,
    validRecommendedParticipants
}