from django.shortcuts import render

# Create your views here.
def rider(request):
    return render(request, 'templates/dt/rider.html')

def driver(request):
    return render(request, 'templates/dt/driver.html')

def demo(request):
    return render(request, 'templates/dt/dot_demo.html')
