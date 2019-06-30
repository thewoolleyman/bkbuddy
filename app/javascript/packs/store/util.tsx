export function sortPipelines(pipelines) {
  return pipelines.sort((a, b) => (a.name > b.name) ? 1 : -1)
}