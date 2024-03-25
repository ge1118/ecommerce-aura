from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.GetProductsAPIView.as_view(), name='products'),
    path('create/', views.CreateProductAPIView.as_view(), name='product-create'),
    path('upload/', views.UploadImageAPIView.as_view(), name='image-upload'),
    path('top/', views.GetTopProductsAPIView.as_view(), name='top-products'),

    path('<str:pk>/reviews/', views.CreateProductReviewAPIView.as_view(), name='create-review'),
    path('<str:product_pk>/reviews/delete/<str:review_pk>/', views.DeleteReviewAPIView.as_view(), name='delete-review'),
    
    path('<str:pk>/', views.GetProductAPIView.as_view(), name='product'),
    path('update/<str:pk>/', views.UpdateProductAPIView.as_view(), name='product-update'),
    path('delete/<str:pk>/', views.DeleteProductAPIView.as_view(), name='product-delete'),
]
