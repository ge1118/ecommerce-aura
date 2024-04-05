from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER
from base.serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Q
from django.db import IntegrityError



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data
    

class RegisterUserAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data

        try:
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password']),
            )
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except:
            message = {'detail': 'User with this email already exist'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        try:
            if 'email' in data:
                if user.email != data['email'] and User.objects.filter(email=data['email']).exists():
                    return Response({'detail': 'This email is already in use.'}, status=400)

            user.first_name = data['name']
            user.username = data['email']
            user.email = data['email']

            if data['password'] != '':
                user.password = make_password(data['password'])

            user.save()
            
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except IntegrityError as e:
            return Response({'detail': 'An unexpected error occurred. Please try again later.'}, status=500)   


class GetUserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


class GetUsersAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get('keyword') or ''
        page = request.query_params.get('page') or 1
        order_by = request.query_params.get('order') or 'id'

        users = User.objects.all().order_by(order_by)
 
        if query: 
            users = users.filter(
                Q(first_name__icontains=query) |
                Q(email__icontains=query)
            )

        message = 'No User Found' if not users.exists() else ''

        paginator = Paginator(users, 24)
        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            users = paginator.page(1)
        except EmptyPage:
            users = paginator.page(paginator.num_pages)

        if page is None:
            page = 1

        serializer = UserSerializer(users, many=True)
        return Response({'users': serializer.data, 'page': page, 'pages': paginator.num_pages, 'message': message})


class GetUserByIdAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(id=pk)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        except:            
            message = {'detail': 'An error has been occured. Please try again.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, *args, **kwargs):
        user = User.objects.get(id=pk)

        data = request.data
        user.first_name = data['name']
        user.username = data['email']
        user.email = data['email']
        user.is_staff = data['isAdmin']

        user.save()
        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)


class DeleteUserAPIView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk, *args, **kwargs):
        userForDeletion = User.objects.get(id=pk)
        userForDeletion.delete()
        return Response('User has been successfully removed')


class SendEmailAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.data.get('user', {})
        firstname = user.get('firstname')
        lastname = user.get('lastname')
        email = user.get('email')

        subject = 'Your Subscription Confirmation'
        email_body = """
        Dear {firstname} {lastname},

        Thank you for subscribing to our newsletter. We're excited to have you on board!

        Best regards,
        AURA
        """.format(firstname=firstname, lastname=lastname)
        
        send_mail(
            subject,
            email_body,
            EMAIL_HOST_USER, 
            [email],
            fail_silently=True,
        )

        message = "You have been successfully subscribed!"
        return Response(message)