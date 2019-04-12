from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

from .utils import timer as my_timer


def index(request):
    return HttpResponse('index Page. today is: ' + str(my_timer.get_date()))
