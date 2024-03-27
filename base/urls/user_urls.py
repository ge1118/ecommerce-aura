from django.urls import path
from base.views import user_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.RegisterUserAPIView.as_view(), name='register'),
    path('send-email/', views.SendEmailAPIView.as_view(), name='send-email'),

    path('profile/', views.GetUserProfileAPIView.as_view(), name='profile'),
    path('profile/update/', views.UpdateUserProfileAPIView.as_view(), name='profile-update'),

    path('', views.GetUsersAPIView.as_view(), name='users'),    
    path('<str:pk>/', views.GetUserByIdAPIView.as_view(), name='user'),
    path('update/<str:pk>/', views.UpdateUserAPIView.as_view(), name='user-update'),
    path('delete/<str:pk>/', views.DeleteUserAPIView.as_view(), name='user-delete'),
]
