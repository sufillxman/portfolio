from django.db import models

class Profile(models.Model):
    full_name = models.CharField(max_length=200)
    alias = models.CharField(max_length=200)
    current_status = models.CharField(max_length=300)
    goal = models.TextField()
    tech_stack = models.JSONField(default=dict)
    email = models.EmailField(default='sufilldigital@gmail.com')
    github = models.URLField(default='https://github.com/sufillxman')
    linkedin = models.URLField(default='https://linkedin.com/in/sufill-x-man')
    instagram = models.URLField(default='https://instagram.com/sufilldigital')
    bio = models.TextField(blank=True, default='')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.full_name


class Project(models.Model):
    title = models.CharField(max_length=300)
    category = models.CharField(max_length=200)
    description = models.TextField()
    tech = models.JSONField(default=list)
    status = models.CharField(max_length=100, default='Active')
    role = models.CharField(max_length=200, blank=True)
    link = models.URLField(blank=True, default='#')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Milestone(models.Model):
    year = models.CharField(max_length=20)
    title = models.CharField(max_length=300)
    description = models.TextField()
    badge = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-year', 'order']

    def __str__(self):
        return f"{self.year} - {self.title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
