from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Profile, Project, Milestone, ContactMessage
from .serializers import (
    ProfileSerializer, ProjectSerializer,
    MilestoneSerializer, ContactMessageSerializer
)


@api_view(['GET'])
def get_profile(request):
    profile = Profile.objects.first()
    if not profile:
        return Response({
            "full_name": "Manknojiya Sufiyan Bhai Aiyub Bhai",
            "alias": "Sufill X Man",
            "current_status": "Pursuing BCA & Freelance Web Developer",
            "goal": "To become a top-tier AI, Web, and API Full-Stack Developer by 2026",
            "tech_stack": {
                "backend": ["Python", "Django", "DRF", "MySQL", "PostgreSQL"],
                "frontend": ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
                "tools": ["Git", "GitHub Education", "Google Dev Console", "CapacitorJS", "Vite"]
            },
            "email": "sufilldigital@gmail.com",
            "github": "https://github.com/sufillxman",
            "linkedin": "https://linkedin.com/in/sufill-x-man",
            "instagram": "https://instagram.com/sufilldigital"
        })
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class MilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Milestone.objects.all()
    serializer_class = MilestoneSerializer


@api_view(['GET', 'POST'])
def submit_contact(request):
    if request.method == 'GET':
        messages = ContactMessage.objects.all()[:20]
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "message": "Message saved successfully"}, 
                        status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
