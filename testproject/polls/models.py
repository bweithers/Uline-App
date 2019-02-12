from django.db import models
<<<<<<< HEAD

# Create your models here.
=======
import datetime as dt
# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__ (self):
        return self.question_text    
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - dt.timedelta(days=1)

    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text

>>>>>>> 3bbc8e634e9c46f3e684f843e541ab9496f21945
