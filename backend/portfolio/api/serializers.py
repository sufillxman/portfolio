from rest_framework import serializers
from ..models import Profile, Project, Milestone, ContactMessage


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'alias', 'current_status', 'goal', 'tech_stack',
                  'email', 'github', 'linkedin', 'instagram', 'bio']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'category', 'description', 'tech',
                  'status', 'role', 'link', 'order']


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ['id', 'year', 'title', 'description', 'badge', 'order']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']

    def create(self, validated_data):
        return ContactMessage.objects.create(**validated_data)
