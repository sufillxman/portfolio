export const USE_LIVE_API = false;
export const API_BASE_URL = 'http://localhost:8000/api';

export const MOCK_DATA = {
  profile: {
    fullName: "Manknojiya Sufiyan Bhai Aiyub Bhai",
    alias: "Sufill X Man",
    currentStatus: "Pursuing BCA & Freelance Web Developer",
    goal: "To become a top-tier AI, Web, and API Full-Stack Developer by 2026",
    techStack: {
      backend: ["Python", "Django", "DRF", "MySQL", "PostgreSQL"],
      frontend: ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
      tools: ["Git", "GitHub Education", "Google Dev Console", "CapacitorJS", "Vite"]
    }
  },
  projects: [
    {
      id: "project-a",
      title: "NMP ERP",
      category: "Enterprise Automation",
      description: "A custom billing automation and ERP system integrating Tally. Built to streamline financial tracking, invoice generation, and account reconciliation with high accuracy.",
      tech: ["Python", "Django", "MySQL", "Tally API", "React"],
      status: "Production Ready",
      role: "Lead Backend & Integration Developer",
      link: "#"
    },
    {
      id: "project-b",
      title: "AI & Drone Automation Research",
      category: "Experimental Research",
      description: "Experimental automation scripts utilizing Large Language Models (LLMs) and drone autopilot protocols. Focuses on combining vision systems with LLM-based decision agents.",
      tech: ["Python", "OpenCV", "LLMs", "DroneKit", "API Integration"],
      status: "R&D Active",
      role: "Independent Researcher",
      link: "#"
    },
    {
      id: "project-c",
      title: "K-Mart Business Analysis",
      category: "Internship Project",
      description: "Bridging retail commerce logic with state-of-the-art technical architecture. Documented business workflows, identified operational bottlenecks, and drafted system blueprints.",
      tech: ["Business Analysis", "Database Design", "System Architecture", "UML"],
      status: "Completed",
      role: "Technical Analyst Intern",
      link: "#"
    }
  ],
  milestones: [
    {
      id: "m-1",
      year: "2026",
      title: "Goal: Top-Tier Full-Stack AI Developer",
      description: "Scaling up expertise in LLM fine-tuning, retrieval-augmented generation (RAG), and deploying high-performance distributed backend systems.",
      badge: "Vision 2026"
    },
    {
      id: "m-2",
      year: "2025",
      title: "Active Google Developer Profile",
      description: "Developing and optimizing web applications, API integrations, and earning developer badges for cloud and automation technologies.",
      badge: "Google Developers"
    },
    {
      id: "m-3",
      year: "2024",
      title: "Approved GitHub Student Pack & Education",
      description: "Granted access to premium developer tools, industry-grade APIs, and cloud services, boosting productivity and research output.",
      badge: "GitHub Partner"
    },
    {
      id: "m-4",
      year: "2023",
      title: "Freelance Web Developer Launch",
      description: "Initiated freelance agency operations delivering production-ready landing pages, databases, and custom API systems for local enterprises.",
      badge: "Freelance"
    }
  ]
};

export function getSavedMessages() {
  try {
    const data = localStorage.getItem('sfx_contact_messages');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading localStorage:", e);
    return [];
  }
}

export async function getProjects() {
  if (!USE_LIVE_API) {
    return MOCK_DATA.projects;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/projects/`);
    if (!response.ok) throw new Error("API sync error");
    return await response.json();
  } catch (error) {
    console.warn("API offline, using fallback:", error);
    return MOCK_DATA.projects;
  }
}

export async function getMilestones() {
  if (!USE_LIVE_API) {
    return MOCK_DATA.milestones;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/milestones/`);
    if (!response.ok) throw new Error("API sync error");
    return await response.json();
  } catch (error) {
    console.warn("API offline, using fallback:", error);
    return MOCK_DATA.milestones;
  }
}

export async function sendContactMessage(formData) {
  if (!USE_LIVE_API) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    try {
      const existing = getSavedMessages();
      const newMessage = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        id: Date.now(),
        timestamp: new Date().toLocaleString()
      };
      localStorage.setItem('sfx_contact_messages', JSON.stringify([newMessage, ...existing]));
    } catch (e) {
      console.error("LocalStorage write failed:", e);
    }
    return { success: true };
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error("Contact submit failed");
    return await response.json();
  } catch (error) {
    console.error("API contact error:", error);
    throw error;
  }
}
