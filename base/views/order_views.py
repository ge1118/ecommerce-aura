from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q

from base.models import Product, Order, OrderItem, ShippingAddress 
from base.serializers import OrderSerializer

from datetime import datetime


class AddOrderItemsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        orderItems = data['orderItems']

        if orderItems and len(orderItems) == 0:
            return Response({'detail': 'No Order Item'}, status=status.HTTP_400_BAD_REQUEST)
        else: 
            order = Order.objects.create(
                user=user,
                paymentMethod = data['paymentMethod'],
                taxPrice = data['taxPrice'],
                shippingPrice = data['shippingPrice'],
                totalPrice = data['totalPrice'],            
            )

            shipping = ShippingAddress.objects.create(
                order = order,
                address = data['shippingAddress']['address'],
                city = data['shippingAddress']['city'],
                postalCode = data['shippingAddress']['postalCode'],
                country = data['shippingAddress']['country'],
            )

            for i in orderItems:
                product = Product.objects.get(_id=i['product'])

                item = OrderItem.objects.create(
                    product = product,
                    order = order,
                    name = product.name,
                    qty = i['qty'],
                    price = i['price'],
                    image = product.image.url,
                )

                product.countInStock -= item.qty
                product.save()

            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)    


    
class GetMyOrdersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        orders = user.order_set.all()
        orders = orders.order_by('_id')

        page = request.query_params.get('page')
        paginator = Paginator(orders,5)

        try:
            orders = paginator.page(page)
        except PageNotAnInteger:
            orders = paginator.page(1)
        except EmptyPage :
            orders = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        serializer = OrderSerializer(orders, many=True)
        return Response({'orders' : serializer.data, 'page': page, 'pages': paginator.num_pages})
        

class GetOrdersAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('keyword') or ''
        page = request.query_params.get('page') or 1
        order_by = request.query_params.get('order') or '_id'
        
        orders = Order.objects.all().order_by(order_by)
        
        if query: 
            orders = orders.filter(user__first_name__icontains=query)
            
        message = 'No Order Found' if not orders.exists() else ''

        paginator = Paginator(orders, 24)
        try:
            orders = paginator.page(page)
        except PageNotAnInteger:
            orders = paginator.page(1)
        except EmptyPage :
            orders = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        serializer = OrderSerializer(orders, many=True)
        return Response({'orders' : serializer.data, 'page': page, 'pages': paginator.num_pages, 'message': message})
    

class GetOrderByIdAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        user = request.user
    
        try:
            order = Order.objects.get(_id=pk)

            if user.is_staff or order.user == user:
                serializer = OrderSerializer(order, many=False)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateOrderToPaidAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, *args, **kwargs):
        order = Order.objects.get(_id=pk)

        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response('Order has been paid')  


class UpdateOrderToDeliveredAPIView(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, pk, *args, **kwargs):
        order = Order.objects.get(_id=pk)

        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()
        return Response('Order has been delivered')  