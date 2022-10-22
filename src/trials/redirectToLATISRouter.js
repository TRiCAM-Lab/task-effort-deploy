import { jsPsych } from "jspsych-react";

const redirectToLATISRouter = (duration) => {
  //   console.log(`${completion_url}`);
  // let url = `${completion_url}`;
  
  // const currWindowURL = window.location.href;
  // console.log(currWindowURL); // url

  // function to parse URL and only get value of desired variables
  function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  // const task_id = getQueryVariable("PID");
  const run_id = getQueryVariable("run_id");
  const return_to = getQueryVariable("return_to");
  const task_id = getQueryVariable("task_id");
  const status = "COMPLETED"
  const url = `${return_to}`;
  // const sessionId = getQueryVariable("SESSION_ID");
  // const studyId = getQueryVariable("STUDY_ID");

  //console.log(prolificId);
  //const uniqueId = `${prolificId}`;
  //console.log(uniqueId);

  fetch('https://router.tricam.psych.umn.edu/cntracs/task/' + task_id, {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({"status": status, "payload": {"run_id": run_id}}),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-API-TOKEN": "xihmuvoo06b4zwp"
    }
   }).then(response => {
    console.log(response.status)
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
   }
  })


  function redirect(url) {
    setTimeout(() => {
      window.location.replace(url);
    }, duration);
  }

  return {
    type: "html_keyboard_response",
    choices: jsPsych.NO_KEYS,
    stimulus: "",
    response_ends_trial: false,
    trial_duration: duration,
    on_finish: () => {
      redirect(url, duration);
    },
  };
};

export default redirectToLATISRouter;