import functions_framework
import base64
import PyPDF2

@functions_framework.http
def extract_pdf_text(request):
    """HTTP Cloud Function to extract text from a PDF using its base64-encoded content."""

    try:
        if request.method == 'POST':
            pdf_base64 = request.get_json()  # Get base64-encoded PDF data
            if "data" in pdf_base64:
                pdf_bytes = base64.b64decode(pdf_base64["data"])  # Decode base64 to bytes

                with open('temp.pdf', 'wb') as f:  # Write bytes to a temporary file
                    f.write(pdf_bytes)

                with open('temp.pdf', 'rb') as pdf_file:  # Open the temporary file
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    text = ""
                    for page_num in range(len(pdf_reader.pages)):
                        page = pdf_reader.pages[page_num]
                        text += page.extract_text()

                return text, 200  # Return the extracted text
            else:
                return 'Missing PDF data in request', 400
        else:
            return 'Invalid request method', 405

    except Exception as e:
        return f"Unexpected error: {e}", 500
