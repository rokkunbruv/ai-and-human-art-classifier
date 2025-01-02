from gradio_client import Client


def process_image_to_model(b64_image: str) -> tuple[str, float]:
    """generate prediction results of the model from the image"""
    # connect to HuggingFace Spaces API to access the model
    client = Client("rostcherno/ai-and-human-art-classifier")

    # run the model and get prediction results
    result = client.predict(
        b64=b64_image,
        api_name="/predict"
    )

    # split prediction results
    result_data = result.split(',')

    # assign prediction label and confidence level from result data
    predicted_label = result_data[0]
    confidence_level = result_data[1]

    return predicted_label, confidence_level
    
    

