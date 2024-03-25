from django.urls import path
from base.views import user_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('send-email/', views.SendEmail.as_view(), name='send-email'),

    path('profile/', views.GetUserProfile.as_view(), name='profile'),
    path('profile/update/', views.UpdateUserProfile.as_view(), name='profile-update'),

    path('', views.GetUsers.as_view(), name='users'),    
    path('<str:pk>/', views.GetUserById.as_view(), name='user'),
    path('update/<str:pk>/', views.UpdateUser.as_view(), name='user-update'),
    path('delete/<str:pk>/', views.DeleteUser.as_view(), name='user-delete'),
]
