import io, base64
from PIL import Image
from pathlib import Path

from django.test import TestCase

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

    def test_empty_image_for_process_image(self):
        """tests the process_image view when no image is passed"""
        response = self.client.post('/core/process-image/', { 'image': '' }, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'No image provided')

    def test_invalid_request_method_for_process_image(self):
        """tests the process_image view when an invalid request method is used"""
        b64_image = convert_img_to_b64(Path('ai_art_detector_core/test_data/test.jpg'))
        response = self.client.get('/core/process-image/', { 'image': b64_image }, content_type='application/json')

        self.assertEqual(response.status_code, 405)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid request method')

    def test_malformed_json_for_process_image(self):
        """tests the process_image when a malformed JSON is sent"""
        b64_image = convert_img_to_b64(Path('ai_art_detector_core/test_data/test.jpg'))
        response = self.client.post('/core/process-image/', '{ "image": %s ' % b64_image, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

    def test_non_json_for_process_image(self):
        """tests the process_image when a non-JSON type is sent"""
        b64_image = convert_img_to_b64(Path('ai_art_detector_core/test_data/test.jpg'))
        response = self.client.post('/core/process-image/', b64_image, content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

    def test_empty_json_for_process_image(self):
        """tests the process_image when an empty JSON is sent"""
        response = self.client.post('/core/process-image/', '', content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
        self.assertEqual(response.json()['error'], 'Invalid JSON')

class TestSubmitFeedbackView(TestCase):
    pass

class TestFetchFeedbackView(TestCase):
    pass

class TestFetchHealthView(TestCase):
    pass
