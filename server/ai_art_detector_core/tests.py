import io, base64
from PIL import Image
from pathlib import Path

from django.test import TestCase
from .models import ModelFeedback

# UTILITY FUNCTIONS

def convert_img_to_b64(image_path: Path) -> str:
    """converts an image path to base64 format"""
    image = Image.open(image_path)
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    image_data = buffered.getvalue()
    b64_image = base64.b64encode(image_data).decode('utf-8')
    return b64_image


class TestProcessImageView(TestCase):
    """contains test cases for process_image view"""
    def test_process_image(self):
        """tests the process_image view if it is working correctly"""
        b64_image = convert_img_to_b64(Path('ai_art_detector_core/test_data/test.jpg'))
        response = self.client.post('/core/process-image/', { 'image': b64_image }, content_type='application/json')

        if response.status_code != 200:
            print(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertIn('message', response.json())
        self.assertIn('results', response.json())

    def test_empty_image(self):
        """tests the process_image view when no image is passed"""
        response = self.client.post('/core/process-image/', { 'image': '' }, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'No image provided')

    def test_invalid_request_method(self):
        """tests the process_image view when an invalid request method is used"""
        b64_image = convert_img_to_b64(Path('ai_art_detector_core/test_data/test.jpg'))
        response = self.client.get('/core/process-image/', { 'image': b64_image }, content_type='application/json')

        self.assertEqual(response.status_code, 405)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid request method')

    def test_malformed_json(self):
        """tests the process_image view when a malformed JSON is sent"""
        b64_image = convert_img_to_b64(Path('ai_art_detector_core/test_data/test.jpg'))
        response = self.client.post('/core/process-image/', '{ "image": %s ' % b64_image, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

    def test_non_json(self):
        """tests the process_image view when a non-JSON type is sent"""
        b64_image = convert_img_to_b64(Path('ai_art_detector_core/test_data/test.jpg'))
        response = self.client.post('/core/process-image/', b64_image, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

    def test_empty_json(self):
        """tests the process_image view when an empty JSON is sent"""
        response = self.client.post('/core/process-image/', '', content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

class TestSubmitFeedbackView(TestCase):
    """contains test cases for submit_feedback view"""
    def test_submit_yes_feedback(self):
        """tests the submit_feedback view when a 'yes' feedback is provided"""
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Feedback submitted successfully')
        self.assertEqual(ModelFeedback.objects.get().positive_count, 1)

    def test_submit_no_feedback(self):
        """tests the submit_feedback view when a 'no' feedback is provided"""
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Feedback submitted successfully')
        self.assertEqual(ModelFeedback.objects.get().negative_count, 1)

    def test_two_same_submits_at_once(self):
        """tests the submit_feedback view when two same feedbacks are sent at once"""
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Feedback submitted successfully')
        self.assertEqual(ModelFeedback.objects.get().positive_count, 2)

    def test_two_different_submits_at_once(self):
        """tests the submit_feedback view when two different feedbacks are sent at once"""
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Feedback submitted successfully')
        self.assertEqual(ModelFeedback.objects.get().positive_count, 1)
        self.assertEqual(ModelFeedback.objects.get().negative_count, 1)

    def test_multiple_feedbacks(self):
        """tests the submit_feedback view when multiple feedbacks are sent"""
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Feedback submitted successfully')
        self.assertEqual(ModelFeedback.objects.get().positive_count, 4)
        self.assertEqual(ModelFeedback.objects.get().negative_count, 6)

    def test_invalid_request_method(self):
        """tests the submit_feedback view when an invalid request method is used"""
        response = self.client.get('/core/submit-feedback/', content_type='application/json')

        self.assertEqual(response.status_code, 405)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid request method')

    def test_empty_feedback_provided(self):
        """tests the submit_feedback view when no feedback is provided"""
        response = self.client.post('/core/submit-feedback/', { 'feedback': '' }, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'No feedback provided')

    def test_invalid_feedback_provided(self):
        """tests the submit_feedback view when an invalid feedback is provided"""
        response = self.client.post('/core/submit-feedback/', { 'feedback': 'maybe' }, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Unexpected feedback provided')

    def test_malformed_json(self):
        """tests the submit_feedback view when a malformed JSON is sent"""
        response = self.client.post('/core/submit-feedback/', '{ "feedback": "yes" ', content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

    def test_non_json(self):
        """tests the submit_feedback view when a non-JSON type is sent"""
        response = self.client.post('/core/submit-feedback/', 'yes', content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

    def test_empty_json(self):
        """tests the submit_feedback view when an empty JSON is sent"""
        response = self.client.post('/core/submit-feedback/', '', content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

class TestFetchFeedbackView(TestCase):
    """contains test cases for fetch_feedback view"""
    def test_fetch_feedback(self):
        """tests the fetch_feedback view if it is working correctly"""
        self.client.post('/core/submit-feedback/', { 'feedback': 'yes' }, content_type='application/json')
        self.client.post('/core/submit-feedback/', { 'feedback': 'no' }, content_type='application/json')

        response = self.client.get('/core/fetch-feedback/')

        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.json())
        self.assertIn('message', response.json())
        self.assertIn('feedback', response.json())

    def test_empty_database(self):
        """tests the fetch_feedback view if the database is empty"""
        response = self.client.get('/core/fetch-feedback/')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Database is empty')

    def test_invalid_request_method(self):
        """tests the fetch_feedback view when an invalid request method is used"""
        response = self.client.post('/core/fetch-feedback/')

        self.assertEqual(response.status_code, 405)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid request method')

class TestFetchHealthView(TestCase):
    """contains test cases for fetch_health view"""
    def test_fetch_health(self):
        """tests the fetch_health view if it is working correctly"""
        response = self.client.get('/core/health/')

        self.assertEqual(response.status_code, 200)

    def test_invalid_request_method(self):
        """tests the fetch_health view when an invalid request method is used"""
        response = self.client.post('/core/health/')

        self.assertEqual(response.status_code, 400)