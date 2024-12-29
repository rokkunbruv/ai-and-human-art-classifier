from PIL import Image
import numpy as np
import tensorflow as tf

from transformers import pipeline, AutoImageProcessor, TFAutoModelForImageClassification


def process_image_to_model(image: Image) -> tuple[str, float]:
    """generate prediction results of the model from the image"""

    # convert image to RGB color space if it is not in RGB
    if np.array(image).shape[2] != 3:
        image = image.convert('RGB')

    # obtain classifier model and process image
    classifier = pipeline(
        "image-classification", 
        model="rostcherno/ai-and-human-art-classifier"
    )
    classifier(image)

    image_processor = AutoImageProcessor.from_pretrained(
        "rostcherno/ai-and-human-art-classifier"
    )
    inputs = image_processor(image, return_tensors="tf")

    model = TFAutoModelForImageClassification.from_pretrained(
        "rostcherno/ai-and-human-art-classifier"
    )
    logits = model(**inputs).logits
    probabilities = tf.nn.softmax(logits, axis=-1)

    # obtain prediction label and confidence level results
    predicted_class_id = int(tf.math.argmax(logits, axis=-1)[0])
    predicted_label = model.config.id2label[predicted_class_id]

    confidence_level = round(float(tf.reduce_max(probabilities, axis=-1)[0]), 2)

    return predicted_label, confidence_level
    

