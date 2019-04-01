from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
# Create your views here.
from .models import Question


def index(request):
    question_list = Question.objects.order_by('id')[:5]
    context = {
        'question_list': question_list
    }

    return render(request, 'polls/index.html', context)


def details(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/details.html', {'question': question})


def vote(request, question_id):
    return HttpResponse('You are Voting on Question: {0}'.format(question_id))
