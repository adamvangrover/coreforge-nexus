from flask import Flask, jsonify, request
from flask_cors import CORS
import sympy
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint for Docker and other services."""
    return jsonify({"status": "healthy", "message": "Backend agent is running."}), 200

@app.route('/api/generate-problem', methods=['GET'])
def generate_problem():
    """
    Generates a random problem based on the topic.
    Currently primarily supports 'algebra-basics'.
    """
    topic = request.args.get('topic', 'algebra-basics') # Default to algebra-basics

    if topic == 'algebra-basics':
        try:
            x = sympy.Symbol('x')

            # Generate coefficients and solution for an equation of the form ax + b = c
            # Ensure 'a' is not 0
            a = random.choice([i for i in range(-10, 11) if i != 0])
            b = random.randint(-10, 10)
            solution = random.randint(-10, 10)

            # Calculate c based on a, b, and the desired solution
            c = a * solution + b

            # Construct the question string
            # Handle positive/negative b for cleaner output
            if b == 0:
                expression_left = f"{a}*x"
            elif b > 0:
                expression_left = f"{a}*x + {b}"
            else: # b < 0
                expression_left = f"{a}*x - {abs(b)}"

            question_str = f"Solve for x: {expression_left} = {c}"

            # Generate a hint
            hint_steps = []
            if b != 0:
                operation = "subtract" if b > 0 else "add"
                hint_steps.append(f"First, {operation} {abs(b)} from both sides of the equation.")

            if a != 1 and a != -1 :
                 hint_steps.append(f"Then, divide both sides by {a}.")
            elif a == -1:
                 hint_steps.append(f"Then, multiply or divide both sides by -1.")


            hint = " ".join(hint_steps)
            if not hint:
                hint = "Isolate x to find its value."


            problem = {
                'id': f'gen-alg-{random.randint(10000, 99999)}',
                'type': 'input', # Linear equations are usually input type
                'question': question_str,
                'answer': str(solution),
                'hint': hint
            }
            return jsonify(problem)

        except Exception as e:
            app.logger.error(f"Error generating algebra problem: {e}")
            return jsonify({"error": "Failed to generate algebra problem", "details": str(e)}), 500

    # Placeholder for other topics - this can be expanded significantly
    else:
        mock_questions_for_topic = {
            "geometry-intro": "What is the sum of angles in a triangle?",
            "calculus-1": "What does a derivative represent?",
            "fractions": "What is 1/2 + 1/4?",
            "trigonometry": "What is sin(90 degrees)?"
        }
        mock_answers = {
            "geometry-intro": "180 degrees",
            "calculus-1": "The rate of change",
            "fractions": "3/4",
            "trigonometry": "1"
        }
        question = mock_questions_for_topic.get(topic, f"What is a key concept in {topic.replace('-', ' ')}?")
        answer = mock_answers.get(topic, "A relevant answer")

        return jsonify({
            'id': f'gen-mock-{topic}-{random.randint(1000,9999)}',
            'type': 'input', # Defaulting to input, could be mcq
            'question': question,
            'options': ['Option A', 'Option B', 'Option C'] if topic == "default-mcq" else None, # Example
            'answer': answer,
            'hint': f'This is a placeholder hint for {topic}. Consider the fundamental definitions.'
        })

if __name__ == '__main__':
    # For development, running with debug=True is fine.
    # For production, use a WSGI server like Gunicorn.
    # Example: gunicorn --bind 0.0.0.0:5001 agent:app
    app.run(host='0.0.0.0', port=5001, debug=True)
