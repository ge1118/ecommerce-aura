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

from base.models import Product, Review
from base.serializers import ProductSerializer


class GetProductsAPIView(GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        category = request.query_params.get('category')
        subcategory = request.query_params.get('subcategory')
        query = request.query_params.get('keyword')

        products = Product.objects.all()

        if category == 'New':
            ten_days_ago = timezone.now() - timedelta(days=10)
            products = products.filter(createdAt__gte=ten_days_ago)
        elif category:
            products = products.filter(category__iexact=category)
        if subcategory:
            products = products.filter(subCategory__iexact=subcategory)
        if query:
            products = products.filter(name__icontains=query)

        page = request.query_params.get('page')
        paginator = Paginator(products.order_by('_id'), 24)
        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        serializer = self.get_serializer(products, many=True)
        return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})



class GetTopProductsAPIView(GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        products = Product.objects.filter(rating__gte=4).order_by('-rating')[:12]
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


class GetProductAPIView(GenericAPIView):
    serializer_class = ProductSerializer

    def get(self, request, pk, *args, **kwargs):
        product = Product.objects.get(_id=pk)
        serializer = self.get_serializer(product)
        return Response(serializer.data)


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
    queryset = Product.objects.all()
    permission_classes = [IsAdminUser]
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
        user_ordered_products = Product.objects.filter(
            orderitem__order__user=user
        ).distinct()

        print(user_ordered_products)

        if not user_ordered_products.filter(_id=product._id):
            content = {'detail': 'Buy this product to write a review!'}
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
