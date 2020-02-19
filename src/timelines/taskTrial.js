// import trials
import fixation from '../trials/fixation'
import rewardProbability from '../trials/rewardProbability'
import frameSpike from '../trials/frameSpike'
import choice from '../trials/choice'
import costBenefits from '../trials/costBenefits'
import pressBalloon from '../trials/pressBalloon'
import rewardFeedback from '../trials/rewardFeedback'
import cumulativeReward from '../trials/cumulativeReward'
import trialEnd from '../trials/trialEnd'

const taskTrial = (blockSettings, blockDetails, opts) => {
  // initialize trial details
  let trialDetails = {
    trial_earnings: 0,
    trial_cumulative_earnings: 0,
    value: [],
    effort: [],
    high_effort: [],
    probability: [],
    start_time: Date.now()
  }

  // timeline
  let timeline = [
    // show condition
    fixation(300), // need ITI of ~500 btwn trials
    rewardProbability(1000, blockSettings, opts, trialDetails),
    frameSpike(700, blockSettings, opts, trialDetails),
    costBenefits(1500, blockSettings, opts, trialDetails),
    choice(5000, blockSettings, opts),
    fixation(200),
    pressBalloon(25000, blockSettings),
    fixation(500),
    rewardFeedback(800, blockSettings, opts, trialDetails),
    fixation(500),
    cumulativeReward(800, blockSettings, blockDetails, opts, trialDetails),
    // end the trial
    trialEnd(trialDetails, 500)
  ]
    return {
  		type: 'html_keyboard_response',
  		timeline: timeline
  	}
}

export default taskTrial
