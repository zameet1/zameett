import "server-only";

function isValidMilestone(milestone) {
  return milestone && typeof milestone === "object" && typeof milestone.label === "string";
}

function isValidProject(project) {
  return project
    && typeof project === "object"
    && typeof project.email === "string"
    && typeof project.id === "string"
    && typeof project.title === "string"
    && Array.isArray(project.milestones)
    && project.milestones.length > 0
    && project.milestones.every(isValidMilestone);
}

function readClientProjects() {
  const raw = process.env.CLIENT_PROJECTS_JSON;
  if (!raw) return [];

  try {
    const projects = JSON.parse(raw);
    return Array.isArray(projects) ? projects.filter(isValidProject) : [];
  } catch {
    return [];
  }
}

const CLIENT_PROJECTS = readClientProjects();

function publicProject(project) {
  return { email: project.email, id: project.id, title: project.title, amount: project.amount, paymentSummary: project.paymentSummary, status: project.status, progress: project.progress, currentStage: project.currentStage, startDate: project.startDate, estimatedDelivery: project.estimatedDelivery, deliveryWindow: project.deliveryWindow, updatedAt: project.updatedAt, description: project.description, milestones: project.milestones };
}

function applyProjectUpdate(project, update) {
  if (!update || typeof update !== "object") return publicProject(project);
  const baseStageIndex = project.milestones.findIndex((milestone) => milestone.state === "current");
  const savedStageIndex = Number(update.stageIndex);
  const savedAt = Date.parse(update.updatedAt || 0);
  const baseUpdatedAt = Date.parse(`${project.updatedAt}T00:00:00Z`);
  if (savedStageIndex < baseStageIndex || (savedStageIndex === baseStageIndex && savedAt < baseUpdatedAt)) return publicProject(project);
  const stageIndex = Number(update.stageIndex);
  if (!Number.isInteger(stageIndex) || stageIndex < 0 || stageIndex >= project.milestones.length) return publicProject(project);
  const completed = stageIndex === project.milestones.length - 1;
  const milestones = project.milestones.map((milestone, index) => ({
    ...milestone,
    state: completed || index < stageIndex ? "complete" : index === stageIndex ? "current" : "upcoming",
    date: completed || index < stageIndex
      ? milestone.date === "Upcoming" || milestone.date === "In progress" ? "Complete" : milestone.date
      : index === stageIndex ? "In progress" : String(milestone.date || "").startsWith("Est.") ? milestone.date : "Upcoming",
  }));
  return { ...publicProject(project), status: completed ? "Completed" : "In progress", progress: Math.max(0, Math.min(100, Number(update.progress) || project.progress)), currentStage: project.milestones[stageIndex].label, updatedAt: typeof update.updatedAt === "string" ? update.updatedAt : project.updatedAt, milestones };
}

export function getProjectStageOptions(projectId) {
  const project = CLIENT_PROJECTS.find((item) => item.id === projectId);
  return project ? project.milestones.map((milestone, index) => ({ index, label: milestone.label })) : [];
}

export function buildProjectUpdate(projectId, stageIndex) {
  const project = CLIENT_PROJECTS.find((item) => item.id === projectId);
  const index = Number(stageIndex);
  if (!project || !Number.isInteger(index) || index < 0 || index >= project.milestones.length) return null;
  const progressSteps = [10, 30, 55, 80, 100];
  return { stageIndex: index, progress: progressSteps[index] ?? Math.round((index / Math.max(project.milestones.length - 1, 1)) * 100), updatedAt: new Date().toISOString() };
}

export function getProjectsForEmail(email, projectUpdates = {}) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  return CLIENT_PROJECTS.filter((project) => project.email.toLowerCase() === normalizedEmail).map((project) => {
    const { email: _email, ...visibleProject } = applyProjectUpdate(project, projectUpdates?.[project.id]);
    return visibleProject;
  });
}

export function getAllClientProjects(updatesByEmail = {}) {
  return CLIENT_PROJECTS.map((project) => applyProjectUpdate(project, updatesByEmail?.[project.email.toLowerCase()]?.[project.id]));
}
