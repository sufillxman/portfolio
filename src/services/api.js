export const USE_LIVE_API = true;
export const API_BASE_URL = '/api';

export async function getProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/`);
    if (!response.ok) throw new Error("Failed to fetch profile");
    return await response.json();
  } catch (error) {
    console.warn("API offline, using fallback:", error);
    return null;
  }
}

const FALLBACK_PROJECTS = [
  { id: 1, title: 'NMP ERP — Billing & Enterprise Automation', category: 'ERP System', description: 'Modular enterprise automation suite integrating legacy Tally accounting formats. Automated invoice logs, ledger reconciliation queues, and dynamic tax calculation models.', tech: ['Python', 'Django', 'Tally'], status: 'Active', role: 'Full-Stack Developer', link: '#', order: 0 },
  { id: 2, title: 'AI & Drone Autopilot Research', category: 'Research', description: 'Autonomous navigation pipelines using computer vision mapping algorithms linked with LLM decision agents for heading updates.', tech: ['Python', 'LLMs', 'DroneKit'], status: 'Research', role: 'AI Developer', link: '#', order: 1 },
  { id: 3, title: 'K-Mart Business Workflows Analysis', category: 'Analysis', description: 'Analyzed enterprise billing architectures and retail logic flows. Mapped bottlenecks and designed database schema revisions.', tech: ['System Blueprinting', 'UML'], status: 'Complete', role: 'Systems Analyst', link: '#', order: 2 },
];

export async function getProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/`);
    if (!response.ok) throw new Error("Failed to fetch projects");
    const data = await response.json();
    if (!data || data.length === 0) {
      console.warn("API returned empty projects, using fallback");
      return FALLBACK_PROJECTS;
    }
    return data;
  } catch (error) {
    console.warn("API offline, using fallback:", error);
    return FALLBACK_PROJECTS;
  }
}

const FALLBACK_MILESTONES = [
  { id: 'm-1', year: '2026', title: 'AI Development Pipeline', description: 'Building autonomous AI agents with RAG pipelines and fine-tuned LLMs for next-gen automation.', badge: 'VISION', order: 0 },
  { id: 'm-2', year: '2025', title: 'Google Cloud Developer Certification', description: 'Architected cloud-native solutions with GCP, earning badges in Cloud Fundamentals, API Architecture, and Python Core.', badge: 'GCP', order: 1 },
  { id: 'm-3', year: '2024', title: 'GitHub Education Partner', description: 'Approved GitHub Education pack with Copilot access, premium SaaS integrations, and API credits.', badge: 'GH-EDU', order: 2 },
  { id: 'm-4', year: '2023', title: 'Freelance Web Development', description: 'Launched freelance career building custom web apps with Django, DRF, React, and PostgreSQL for 10+ clients.', badge: 'FREELANCE', order: 3 },
];

export async function getMilestones() {
  try {
    const response = await fetch(`${API_BASE_URL}/milestones/`);
    if (!response.ok) throw new Error("Failed to fetch milestones");
    const data = await response.json();
    if (!data || data.length === 0) {
      console.warn("API returned empty milestones, using fallback");
      return FALLBACK_MILESTONES;
    }
    return data;
  } catch (error) {
    console.warn("API offline, using fallback:", error);
    return FALLBACK_MILESTONES;
  }
}

export async function sendContactMessage(formData) {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  if (!response.ok) throw new Error("Contact submit failed");
  return await response.json();
}
