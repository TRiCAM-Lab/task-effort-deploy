import buildCountdown from "../trials/countdown";
import preamble from "./preamble";
import experimentStart from "../trials/experimentStart";
import qualtrics from "../trials/qualtrics";
import experimentEnd from "../trials/experimentEnd";
import taskBlock from "./taskBlock";
import showPayment from "../trials/showPayment";
import userId from "../trials/userId";
import recordNow from "../trials/recordNow";
import { ONLINE, lang } from "../config/main";
import {
  practiceBlock1,
  practiceBlock2,
  practiceBlock3,
} from "../config/practice";
import { exptBlock1 } from "../config/experiment";
import {
  bluePracticeInstructions,
  greenPracticeInstructions,
  realPracticeInstructions,
  postPracticeInstructions,
  qualtricsIntro,
} from "../trials/instructions";
import quizTimeline from "../trials/quizTrials";

const inLabTimeline = [
  experimentStart(),
  userId(),
  preamble,
  bluePracticeInstructions(),
  buildCountdown(lang.countdown.practice1, 3),
  taskBlock(practiceBlock1),
  greenPracticeInstructions(),
  buildCountdown(lang.countdown.practice2, 3),
  taskBlock(practiceBlock2),
  realPracticeInstructions(),
  buildCountdown(lang.countdown.practice3, 3),
  taskBlock(practiceBlock3),
  quizTimeline(practiceBlock3),
  recordNow(),
  postPracticeInstructions(),
  buildCountdown(lang.countdown.expt1, 3),
  taskBlock(exptBlock1),
  qualtrics(),
  showPayment(5000, exptBlock1),
  experimentEnd(5000),
];

const onlineTimeline = [
  experimentStart(),
  userId(),
  // preamble,
  // bluePracticeInstructions(),
  // buildCountdown(lang.countdown.practice1, 3),
  // taskBlock(practiceBlock1),
  // greenPracticeInstructions(),
  // buildCountdown(lang.countdown.practice2, 3),
  // taskBlock(practiceBlock2),
  // realPracticeInstructions(),
  // buildCountdown(lang.countdown.practice3, 3),
  // taskBlock(practiceBlock3),
  quizTimeline(practiceBlock3),
  postPracticeInstructions(),
  buildCountdown(lang.countdown.expt1, 3),
  taskBlock(exptBlock1),
  showPayment(5000, exptBlock1),
  qualtricsIntro(),
  qualtrics(),
  // experimentEnd(5000),
];

export const tl = ONLINE ? onlineTimeline : inLabTimeline;
