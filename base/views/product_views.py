from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count, Q

from base.models import Product, Review
from base.serializers import ProductSerializer


class GetProductsAPIView(GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        category = request.query_params.get('category') or ''
        subcategory = request.query_params.get('subcategory') or ''
        query = request.query_params.get('keyword') or ''
        page = request.query_params.get('page') or 1
        order_by = request.query_params.get('order') or '_id'

        products = Product.objects.all().order_by(order_by)

        if category == 'New':
            ten_days_ago = timezone.now() - timedelta(days=10)
            products = products.filter(createdAt__gte=ten_days_ago)
        elif category:
            products = products.filter(category__iexact=category)
        if subcategory:
            products = products.filter(subCategory__iexact=subcategory)
        if query:
            products = products.filter(
                Q(name__icontains=query) |
                Q(category__icontains=query) |
                Q(brand__icontains=query)
            )        
        
        message = 'No Product Found' if not products.exists() else ''

        paginator = Paginator(products, 24)
        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)
        
        serializer = self.get_serializer(products, many=True)
        return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages, 'message': message})


class GetTopProductsAPIView(GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        products = Product.objects.annotate(review_count=Count('review')).filter(rating__gte=4).order_by('-rating', '-review_count')[:12]
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


class GetProductAPIView(GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, pk, *args, **kwargs):
        try:
            product = Product.objects.get(_id=pk)
            serializer = self.get_serializer(product)
            return Response(serializer.data)
        except:            
            message = {'detail': 'An error has been occured. Please try again.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class CreateProductAPIView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class UpdateProductAPIView(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated, IsAdminUser]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            self.perform_update(serializer)            
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()


class DeleteProductAPIView(DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()
    lookup_field = 'pk'


class UploadImageAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        product_id = request.data['product_id']
        product = Product.objects.get(_id=product_id)
        product.image = request.FILES.get('image')
        product.save()
        return Response({'message': 'Image has been successfully uploaded'})



class CreateProductReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        product = Product.objects.get(_id=pk)
        user = request.user
        data = request.data
        user_ordered_delivered_products = Product.objects.filter(
            orderitem__order__user=user,
            orderitem__order__isDelivered=True
        ).distinct()

        if not user_ordered_delivered_products.filter(_id=product._id).exists():
            content = {'detail': 'Buy and get this product to write a review!'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        alreadyExists = product.review_set.filter(user=user).exists()
        if alreadyExists:
            content = {'detail': 'Product already reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
        elif data['rating'] == 0:
            content = {'detail': 'Please select a rating'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            review = Review.objects.create(
                user = user,
                product = product,
                name = user.first_name, 
                rating = data['rating'],
                comment = data['comment'],
            )

            reviews = product.review_set.all()
            product.numReviews = len(reviews)

            total = 0 
            for i in reviews:
                total += i.rating
            
            product.rating = total / len(reviews)
            product.save()

            return Response('Review has been successfully added')
    

class DeleteReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_pk, review_pk, *args, **kwargs):
        review = Review.objects.get(_id=review_pk)
        review.delete()

        product = Product.objects.get(_id=product_pk)
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0 
        for i in reviews:
            total += i.rating
        
        if total != 0:
            product.rating = total / len(reviews)
        else:
            product.rating = 0
        product.save()

        return Response('Review has been successfully removed')
