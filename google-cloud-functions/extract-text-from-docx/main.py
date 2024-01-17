import functions_framework
import io
import docx
import requests
import base64
@functions_framework.http
def extract_text_from_docx(request):
    """HTTP Cloud Function to extract text from a DOCX file."""

    try:
        if request.method == 'POST':
            # file = request.files.get('docx_file')  # Get the uploaded file
            request_json = request.get_json(silent=True)
            if "data" in request_json:
                file_content = base64.b64decode(request_json["data"])
                document = docx.Document(io.BytesIO(file_content))  # Read file contents
                text = '\n'.join([paragraph.text for paragraph in document.paragraphs])
                return text, 200
            else:
                return 'Missing file in request', 400
        else:
            return 'Invalid request method', 405

    except (IOError, docx.opc.exceptions.PackageNotFoundError) as e:
        return f"Error opening file: {e}", 500

    except Exception as e:
        return f"Unexpected error: {e}", 500
