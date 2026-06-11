from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'milestones', views.MilestoneViewSet, basename='milestone')

urlpatterns = [
    path('profile/', views.get_profile, name='profile'),
    path('contact/', views.submit_contact, name='contact'),
    path('', include(router.urls)),
]
