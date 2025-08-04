from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from backend.suspension.serializers import RegisterSuspensionSerializer, SuspensionHistorySerializer
from rest_framework import status
from rest_framework.views import APIView
from backend.suspension.models import UserRegisteredSuspension, SuspensionServiceHistory


class RegisterSuspension(APIView):
    permission_classes([IsAuthenticated])

    def post(self, request, *args, **kwargs):
        serializer = RegisterSuspensionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        user_registered_suspension = UserRegisteredSuspension.objects.filter(user=request.user)
        serializer = RegisterSuspensionSerializer(user_registered_suspension, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def delete(self, request):
        pass


class SuspensionHistory(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        suspension_serial_number = kwargs.get('serial_number')
        suspension = UserRegisteredSuspension.objects.get(user=request.user, serial_number=suspension_serial_number)
        serializer = SuspensionHistorySerializer(data=request.data, context={'suspension': suspension})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        suspension_serial_number = kwargs.get('serial_number')

        user_registered_suspension = UserRegisteredSuspension.objects.filter(serial_number=suspension_serial_number, user=request.user)
        suspension_history = SuspensionServiceHistory.objects.filter(suspension__in=user_registered_suspension)

        user_registered_suspension_serializer = RegisterSuspensionSerializer(user_registered_suspension, many=True)
        suspension_history_serializer = SuspensionHistorySerializer(suspension_history, many=True)

        data = {
            'suspension_info': user_registered_suspension_serializer.data,
            'suspension_history': suspension_history_serializer.data
        }

        return Response(data, status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        pass


class SuspensionSearch(APIView):
    def post(self):
        pass

    def get(self, request, *args, **kwargs):
        print(kwargs)
        product = UserRegisteredSuspension.objects.filter(
                brand=kwargs.get('brand'),
                serial_number=kwargs.get('serial_number')
            ).order_by("register_date")

        product_history = SuspensionServiceHistory.objects.filter(suspension__in=product)

        product_info = RegisterSuspensionSerializer(product, many=True)
        product_history = SuspensionHistorySerializer(product_history, many=True)
        print(product_history)
        print(product_info)
        data = {
            'suspension_info': product_info.data,
            'suspension_history': product_history.data
        }

        return Response(data, status.HTTP_200_OK)
