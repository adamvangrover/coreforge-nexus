from flask import Flask, jsonify, request
from flask_cors import CORS
import sympy
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint for Docker."""
    return jsonify({"status": "healthy"}), 200

@app.route('/api/generate-problem', methods=['GET'])
def generate_problem():
    """
    Generates a random problem based on the topic.
    Currently supports linear algebra problems.
    """
    topic = request.args.get('topic', 'algebra-basics')

    # This can be expanded with different logic for different topics
    if topic == 'algebra-basics':
        try:
            x = sympy.Symbol('x')
            a = random.randint(2, 10) * random.choice([-1, 1])
            b = random.randint(-10, 10)
            solution = random.randint(-5, 5)
            c = a * solution + b

            # Ensure problem isn't trivial
            if b == 0: b = random.randint(1,5)
            if a == 1: a = 2

            expression_left = f"{a}*x + {b}" if b > 0 else f"{a}*x - {abs(b)}"
            question_str = f"Solve for x: {expression_left} = {c}"

            b_op = "subtract" if b > 0 else "add"
            hint = f"First, {b_op} {abs(b)} from both sides of the equation. Then, divide by the coefficient of x."

            problem = {
                'id': f'gen-alg-{random.randint(1000, 9999)}',
                'type': 'input',
                'question': question_str,
                'answer': str(solution),
                'hint': hint
            }
            return jsonify(problem)

        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        # Placeholder for other topics
        return jsonify({
            'id': f'gen-mock-{random.randint(1000,9999)}',
            'type': 'mcq',
            'question': f'What is a fundamental concept in {topic.replace("-", " ")}?',
            'options': ['Option A', 'Option B', 'Option C'],
            'answer': 'Option A',
            'hint': 'This is a mock question.'
        })

if __name__ == '__main__':
    # Use Gunicorn as a production-ready WSGI server
    # The command would be `gunicorn --bind 0.0.0.0:5001 agent:app`
    # For simple development, Flask's built-in server is fine.
    app.run(host='0.0.0.0', port=5001, debug=True)
