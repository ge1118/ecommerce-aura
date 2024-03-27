from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.GetOrdersAPIView.as_view(), name='orders'),
    path('add/', views.AddOrderItemsAPIView.as_view(), name='orders-add'),
    path('myorders/', views.GetMyOrdersAPIView.as_view(), name='myorders'),
    path('<str:pk>/', views.GetOrderByIdAPIView.as_view(), name='user-order'),
    path('<str:pk>/pay/', views.UpdateOrderToPaidAPIView.as_view(), name='pay'),
    path('<str:pk>/deliver/', views.UpdateOrderToDeliveredAPIView.as_view(), name='deliver'),
]
