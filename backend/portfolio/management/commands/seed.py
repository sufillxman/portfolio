from django.core.management.base import BaseCommand
from portfolio.models import Profile, Project, Milestone


class Command(BaseCommand):
    help = 'Seed database with initial portfolio data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        if not Profile.objects.exists():
            Profile.objects.create(
                full_name="Manknojiya Sufiyan Bhai Aiyub Bhai",
                alias="Sufill X Man",
                current_status="Pursuing BCA & Freelance Web Developer",
                goal="To become a top-tier AI, Web, and API Full-Stack Developer by 2026",
                tech_stack={
                    "backend": ["Python", "Django", "DRF", "MySQL", "PostgreSQL"],
                    "frontend": ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
                    "tools": ["Git", "GitHub Education", "Google Dev Console", "CapacitorJS", "Vite"]
                },
                bio="A Backend Specialist and Frontend Creator shaping high-performance APIs, database architectures, and next-generation full-stack systems."
            )
            self.stdout.write(self.style.SUCCESS('Profile created'))

        if not Project.objects.exists():
            projects = [
                Project(
                    title="NMP ERP",
                    category="Enterprise Automation",
                    description="A custom billing automation and ERP system integrating Tally. Built to streamline financial tracking, invoice generation, and account reconciliation with high accuracy.",
                    tech=["Python", "Django", "MySQL", "Tally API", "React"],
                    status="Production Ready",
                    role="Lead Backend & Integration Developer",
                    order=0
                ),
                Project(
                    title="AI & Drone Automation Research",
                    category="Experimental Research",
                    description="Experimental automation scripts utilizing Large Language Models (LLMs) and drone autopilot protocols. Focuses on combining vision systems with LLM-based decision agents.",
                    tech=["Python", "OpenCV", "LLMs", "DroneKit", "API Integration"],
                    status="R&D Active",
                    role="Independent Researcher",
                    order=1
                ),
                Project(
                    title="K-Mart Business Analysis",
                    category="Internship Project",
                    description="Bridging retail commerce logic with state-of-the-art technical architecture. Documented business workflows, identified operational bottlenecks, and drafted system blueprints.",
                    tech=["Business Analysis", "Database Design", "System Architecture", "UML"],
                    status="Completed",
                    role="Technical Analyst Intern",
                    order=2
                ),
            ]
            Project.objects.bulk_create(projects)
            self.stdout.write(self.style.SUCCESS(f'{len(projects)} projects created'))

        if not Milestone.objects.exists():
            milestones = [
                Milestone(
                    year="2026",
                    title="Goal: Top-Tier Full-Stack AI Developer",
                    description="Scaling up expertise in LLM fine-tuning, retrieval-augmented generation (RAG), and deploying high-performance distributed backend systems.",
                    badge="Vision 2026",
                    order=0
                ),
                Milestone(
                    year="2025",
                    title="Active Google Developer Profile",
                    description="Developing and optimizing web applications, API integrations, and earning developer badges for cloud and automation technologies.",
                    badge="Google Developers",
                    order=1
                ),
                Milestone(
                    year="2024",
                    title="Approved GitHub Student Pack & Education",
                    description="Granted access to premium developer tools, industry-grade APIs, and cloud services, boosting productivity and research output.",
                    badge="GitHub Partner",
                    order=2
                ),
                Milestone(
                    year="2023",
                    title="Freelance Web Developer Launch",
                    description="Initiated freelance agency operations delivering production-ready landing pages, databases, and custom API systems for local enterprises.",
                    badge="Freelance",
                    order=3
                ),
            ]
            Milestone.objects.bulk_create(milestones)
            self.stdout.write(self.style.SUCCESS(f'{len(milestones)} milestones created'))

        self.stdout.write(self.style.SUCCESS('Database seeding complete!'))
