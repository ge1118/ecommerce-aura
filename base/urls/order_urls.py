from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.GetOrders.as_view(), name='orders'),
    path('add/', views.AddOrderItems.as_view(), name='orders-add'),
    path('myorders/', views.GetMyOrders.as_view(), name='myorders'),
    path('<str:pk>/', views.GetOrderById.as_view(), name='user-order'),
    path('<str:pk>/pay/', views.UpdateOrderToPaid.as_view(), name='pay'),
    path('<str:pk>/deliver/', views.UpdateOrderToDelivered.as_view(), name='deliver'),
]
