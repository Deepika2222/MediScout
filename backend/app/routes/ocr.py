from flask import Blueprint, jsonify, request

ocr_bp = Blueprint('ocr', __name__, url_prefix='/scan-ocr')

@ocr_bp.route('/', methods=['POST'])
def scan_medicine():
    # TODO: Implement Google Vision OCR integration
    return jsonify({"message": "OCR endpoint"})
