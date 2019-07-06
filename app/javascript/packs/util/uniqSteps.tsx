import {Step} from '~/store'

export function uniqSteps(steps: Step[]) {
  // https://stackoverflow.com/a/9229821/25192
  const seen = new Set();
  return steps.filter(steps => {
    return seen.has(steps.command) ? false : seen.add(steps.command);
  });
}

