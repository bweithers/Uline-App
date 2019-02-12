from django.shortcuts import render

# Create your views here.
def rider(request):
    return render(templates/rider.html)

def driver(request):
    return render(templates/driver.html)
