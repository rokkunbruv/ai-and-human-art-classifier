import json

from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt

from .api import process_image_to_model
from .models import ModelFeedback


def index(request):
    """returns a welcome message"""
    return HttpResponse("Welcome to rostcherno's AI and Human Art Classifier API! 🤖")

# the csrf_exempt decorator is used so that the user can upload an image
# without having the need to authenticate
@csrf_exempt
def process_image(request):
    """receives an image in base64 format and returns the prediction results of the model"""
    if request.method != 'POST':
        # invoke status 405 (Method Not Allowed)
        return JsonResponse({ 'success': False, 'error': 'Invalid request method' }, status=405)
    
    try:
        body = json.loads(request.body)

        b64_image = body.get('image')

        if not b64_image:
            return JsonResponse({ 'success': False, 'error': 'No image provided' }, status=400)
        
        predicted_label, confidence_level = process_image_to_model(b64_image)

        return JsonResponse(
            { 
                'success': True, 
                'message': 'Image uploaded successfully',
                'results': {
                    'predicted_label': predicted_label,
                    'confidence_level': confidence_level,
                },
            }, 
            status=200
        )
    except json.JSONDecodeError:
        return JsonResponse({ 'success': False, 'error': 'Invalid JSON' }, status=400)
    except Exception as e:
        return JsonResponse({ 'success': False, 'error': str(e) }, status=500)
    
@csrf_exempt
def submit_feedback(request):
    """receives user feedback of the model and stores it in the database"""
    if request.method != 'POST':
        # invoke status 405
        return JsonResponse({ 'success': False, 'error': 'Invalid request method' }, status=405)

    try:
        body = json.loads(request.body)

        user_feedback = body.get('feedback')

        if not user_feedback:
            return JsonResponse({ 'success': False, 'error': 'No feedback provided' }, status=400)
        
        feedback, created = ModelFeedback.objects.get_or_create(id=1)

        if user_feedback == 'yes':
            feedback.increment_positive_count()
        elif user_feedback == 'no':
            feedback.increment_negative_count()
        else:
            return JsonResponse({ 'success': False, 'error': 'Unexpected feedback provided' }, status=400)
        
        return JsonResponse(
            { 
                'success': True, 
                'message': 'Feedback submitted successfully',
            }, 
            status=200
        )
    except json.JSONDecodeError:
        return JsonResponse({ 'success': False, 'error': 'Invalid JSON' }, status=400)
    except Exception as e:
        return JsonResponse({ 'success': False, 'error': str(e) }, status=500)

@csrf_exempt
def fetch_feedback(request):
    """sends users' feedback to client"""
    if request.method != 'GET':
        # invoke status 405
        return JsonResponse({ 'success': False, 'error': 'Invalid request method' }, status=405)
    
    try:
        feedback = ModelFeedback.objects.first()

        if not feedback:
            return JsonResponse({ 'success': False, 'error': 'Database is empty' }, status=400)

        positive_responses = feedback.positive_count
        total_responses = feedback.positive_count + feedback.negative_count

        model_accuracy_feedback_percentage = positive_responses / total_responses
        
        return JsonResponse(
            {
                'success': True,
                'message': 'Feedback sent successfuly',
                'feedback': model_accuracy_feedback_percentage,
            },
            status=200
        )
    except Exception as e:
        return JsonResponse({ 'success': False, 'error': str(e) }, status=500)
    
@csrf_exempt
def fetch_health(request):
    """sends server status to client"""
    if request.method != 'GET':
        return HttpResponseBadRequest()
    try:
        return HttpResponse()
    except Exception as e:
        return HttpResponseServerError()

    
    
    